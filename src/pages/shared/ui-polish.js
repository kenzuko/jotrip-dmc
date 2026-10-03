const on=(el,event,handler)=>el&&el.addEventListener(event,handler);
const navigate=(href)=>{window.location.href=href;};

// Keep arrows as text glyphs on iOS instead of emoji-style blue buttons.
const arrowTargets=document.querySelectorAll('.quiet-link span,.desk-links i,.atlas-stage-copy a span,.desk-card a span,.journal-head a span,.practice a span');
arrowTargets.forEach(el=>{if(el.textContent.trim()==='↗')el.textContent='↗︎';});

// If a visual card behaves like a link, make the whole surface keyboard/touch accessible.
const makeCardLink=(el,href,label)=>{
  if(!el||!href)return;
  el.classList.add('ui-link-card');
  el.setAttribute('role','link');
  el.setAttribute('tabindex','0');
  if(label)el.setAttribute('aria-label',label);
  on(el,'click',event=>{
    if(event.target.closest('a,button,input,select,textarea'))return;
    navigate(href);
  });
  on(el,'keydown',event=>{
    if(event.key==='Enter'||event.key===' '){event.preventDefault();navigate(href);}
  });
};

makeCardLink(
  document.querySelector('.desk-card-image'),
  '/phu-quoc/',
  document.documentElement.lang==='vi'?'Khám phá Phú Quốc qua JoTrip':'Explore Phu Quoc with JoTrip'
);

const islandCards=[
  ['/experiences/#sea','Sea · Bãi Sao'],
  ['/phu-quoc/#south','Stay + Sea · Bãi Khem'],
  ['/experiences/#roots','Roots · Nhà thùng'],
  ['/phu-quoc/','Local life · Phú Quốc']
];
document.querySelectorAll('.island-photo-sequence figure').forEach((figure,index)=>{
  const config=islandCards[index];
  if(config)makeCardLink(figure,config[0],config[1]);
});

// Horizontal documentary rail is draggable media, not a false button surface.
const rail=document.querySelector('[data-photo-rail]');
if(rail){
  rail.setAttribute('aria-roledescription','carousel');
  rail.querySelectorAll('figure').forEach(figure=>figure.setAttribute('aria-roledescription','slide'));
}
