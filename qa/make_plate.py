import cv2, numpy as np
from PIL import Image
from pathlib import Path
p=Path(__file__).parents[1]/'src/visual'
src=cv2.imread(str(p/'approved-scene.jpg'))
hsv=cv2.cvtColor(src,cv2.COLOR_BGR2HSV); gray=cv2.cvtColor(src,cv2.COLOR_BGR2GRAY)
mask=np.zeros(gray.shape,np.uint8)
# tightly scoped, adaptive text-stroke-only removal. Master untouched.
def area(x0,y0,x1,y1,what='light',dilate=2):
    crop=src[y0:y1,x0:x1]; hsv0=hsv[y0:y1,x0:x1]; g=gray[y0:y1,x0:x1]
    if what=='light':
        # white text against the shadowed room/sea; remove gold lettering too
        pix=((g>154)&(hsv0[:,:,1]<96))|((hsv0[:,:,0]>=9)&(hsv0[:,:,0]<=34)&(hsv0[:,:,1]>82)&(hsv0[:,:,2]>133))
    elif what=='gold':
        pix=(hsv0[:,:,0]>=9)&(hsv0[:,:,0]<=35)&(hsv0[:,:,1]>65)&(hsv0[:,:,2]>122)
    elif what=='ink':pix=g<171
    elif what=='inkfine':pix=g<186
    elif what=='brightbutton':pix=(g>160)&(hsv0[:,:,1]<100)
    roi=(pix.astype('uint8')*255)
    if dilate:roi=cv2.dilate(roi,np.ones((dilate*2+1,dilate*2+1),np.uint8))
    mask[y0:y1,x0:x1]=cv2.bitwise_or(mask[y0:y1,x0:x1],roi)
# nav display text, original logo stays visible; CTA text separately
for b in [(345,31,398,60),(432,31,498,60),(524,31,581,60),(601,31,662,60),(1315,32,1375,58)]:area(*b,'light',1)
area(1118,33,1282,51,'brightbutton',1)
# hero text all visible words and small labels. Do not erase island photo outside exact ROIs.
area(196,112,378,126,'light',1)
area(196,129,710,182,'light',3)
area(196,184,503,234,'light',3)
area(493,185,981,240,'gold',3)
area(196,246,745,292,'light',1)
area(260,317,446,343,'brightbutton',1)
area(479,318,608,346,'light',1)
# paper ink is confined to the approved book page boundaries
area(295,397,550,417,'ink',1)
area(288,426,651,510,'inkfine',3)
area(277,523,727,649,'ink',1)
area(325,667,473,696,'ink',1)
area(206,690,262,710,'ink',1)
# handwritten note in the paper, only ink pixels (preserve page edge)
area(1376,421,1520,508,'ink',1)
area(1424,538,1523,565,'ink',1)
cv2.imwrite(str(p/'scene-clean-mask.png'),mask)
output=cv2.inpaint(src,mask,5,cv2.INPAINT_TELEA)
# ensure immutable outside mask
assert np.array_equal(src[mask==0],output[mask==0])
cv2.imwrite(str(p/'scene-clean-v2.jpg'),output,[cv2.IMWRITE_JPEG_QUALITY,93])
print('mask pixels',int(np.count_nonzero(mask)), 'of', mask.size)
# The ink removal above is a coarse first pass. Replace the broad paper ink block
# with a fit sampled from untouched blank paper around the type: preserves page
# luminance falloff without the high-frequency bright scars from text inpainting.
from scipy.ndimage import gaussian_filter
H,W=src.shape[:2]
YY,XX=np.mgrid[0:H,0:W]
# sample only untouched blank zones, no chars and no edges of the physical page
patches=[(305,375,715,394),(280,414,295,515),(290,512,717,523),
         (287,651,714,661),(324,664,683,671),(481,684,685,699),
         (286,425,295,646),(712,416,721,645)]
xs=[];ys=[];vals=[]
for x0,y0,x1,y1 in patches:
 for y in range(y0,y1,5):
  for x in range(x0,x1,5):
   # skip original masked areas and overly dark/page edge pixels
   if mask[y,x] or gray[y,x]<182 or gray[y,x]>254:continue
   xs.append((x-490)/220);ys.append((y-531)/171);vals.append(src[y,x].astype(float))
xs=np.array(xs);ys=np.array(ys);vals=np.array(vals)
def feats(xs,ys):return np.column_stack([np.ones_like(xs),xs,ys,xs*xs,xs*ys,ys*ys,xs**3,ys**3])
A=feats(xs,ys);reg=np.eye(A.shape[1])*.1
coef=np.linalg.solve(A.T@A+reg,A.T@vals)
X=(XX-490)/220;Y=(YY-531)/171
F=feats(X.ravel(),Y.ravel())@coef
fit=F.reshape(H,W,3).astype(np.float32)
# PAPER: blend only around printed text, maintain original top/left/bottom surfaces.
region=np.zeros((H,W),np.float32)
for x0,y0,x1,y1 in [(285,397,565,422),(282,423,672,521),(276,518,721,653),(325,669,475,695)]:
 region[y0:y1,x0:x1]=1
region=gaussian_filter(region,sigma=4)
region=np.clip(region,0,1)[:,:,None]
output=(output.astype(np.float32)*(1-region)+fit*region).astype(np.uint8)
# HERO: soften local inpainting scars under anticipated live text area, keeping
# approved background outside a tightly defined translucent typography zone.
hero=np.zeros((H,W),np.float32)
hero[124:239,190:986]=.65
hero[247:295,191:750]=.57
hero[107:125,193:381]=.7
hero[31:57,341:662]=.72
hero=gaussian_filter(hero,sigma=8)[:,:,None]
soft=cv2.GaussianBlur(output,(0,0),sigmaX=7)
output=(output.astype(np.float32)*(1-hero)+soft.astype(np.float32)*hero).astype(np.uint8)
cv2.imwrite(str(p/'scene-clean-v2.png'),output,[cv2.IMWRITE_PNG_COMPRESSION,7])
print('fit samples',len(xs))
