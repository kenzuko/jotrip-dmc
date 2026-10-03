import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const html=await readFile(join(root,'src/index.html'),'utf8');
const foundation=await readFile(join(root,'src/styles/00-foundation.css'),'utf8');
const motion=await readFile(join(root,'src/styles/10-motion-depth.css'),'utf8');
const storyStyle=await readFile(join(root,'src/styles/20-local-dmc-story.css'),'utf8');
const proofStyle=await readFile(join(root,'src/styles/30-proof-contact.css'),'utf8');
const photoStyle=await readFile(join(root,'src/styles/40-photo-quality.css'),'utf8');
const sunlitStyle=await readFile(join(root,'src/styles/50-sunlit-island-luxury.css'),'utf8');
const uxStyle=await readFile(join(root,'src/styles/60-mobile-ux-polish.css'),'utf8');
const storyLayer=await readFile(join(root,'src/pages/shared/story-layer.js'),'utf8');
const proofLayer=await readFile(join(root,'src/pages/shared/proof-layer.js'),'utf8');
const contactLayer=await readFile(join(root,'src/pages/shared/contact-layer.js'),'utf8');
const photoLayer=await readFile(join(root,'src/pages/shared/photo-layer.js'),'utf8');
const voiceLayer=await readFile(join(root,'src/pages/shared/sunlit-voice.js'),'utf8');
const uiPolish=await readFile(join(root,'src/pages/shared/ui-polish.js'),'utf8');
const app=await readFile(join(root,'src/app.js'),'utf8');
const i18n=await readFile(join(root,'src/i18n.js'),'utf8');
const build=await readFile(join(root,'build.mjs'),'utf8');
const wrangler=await readFile(join(root,'wrangler.jsonc'),'utf8');
const productionWrangler=await readFile(join(root,'wrangler.production.jsonc'),'utf8');
const workflow=await readFile(join(root,'.github/workflows/editorial-ci.yml'),'utf8');

const banned=['Island Reading Room','hero-book','physical-book','reader-room','window-scene','visual-v3','visual-v4','visual-v5','approved-room-parts'];
const pages=['experiences','phu-quoc','partners','journal','about'];

test('homepage remains an editorial hub rather than one long landing page',()=>{
  assert.match(html,/ISLAND DESK/);assert.match(html,/EXPERIENCE ATLAS/);assert.match(html,/data-photo-rail/);assert.match(html,/DMC PRACTICE/);assert.match(html,/FIELD NOTES/);assert.match(html,/FOR TRAVEL PARTNERS/);assert.equal(html.includes('class="journey"'),false);
});

test('real subpages exist and share the DMC shell',async()=>{
  for(const page of pages){const path=join(root,'src/pages',page,'index.html');assert.equal((await stat(path)).isFile(),true,`${page} page missing`);const pageHtml=await readFile(path,'utf8');assert.match(pageHtml,/data-site-header/);assert.match(pageHtml,/data-site-footer/);assert.match(pageHtml,/data-journey-drawer/);assert.match(pageHtml,/name="robots" content="noindex,nofollow"/);}assert.match(build,/cp\(join\(src,'pages'\),dist/);
});

test('EN-VI is a real persistent site layer',()=>{
  assert.match(app,/from '\.\/i18n\.js'/);assert.match(app,/data-lang="en"/);assert.match(app,/data-lang="vi"/);assert.match(app,/setLanguagePreference/);assert.match(i18n,/localStorage\.setItem\('jotrip-lang'/);assert.match(i18n,/BẮT ĐẦU TỪ CON NGƯỜI/);assert.match(i18n,/Phú Quốc/);assert.match(build,/i18n\.js/);assert.match(storyLayer,/HIỂU CẢ HÒN ĐẢO/);assert.match(storyLayer,/KNOWING THE WHOLE ISLAND/);assert.match(proofLayer,/KHÔNG CHỈ LÀ MỘT TOUR/);assert.match(proofLayer,/THE WHOLE STAY/);assert.match(voiceLayer,/Phú Quốc/);assert.match(voiceLayer,/Phu Quoc/);
});

test('local DMC story restores origin and deep destination literacy',()=>{
  assert.match(storyLayer,/Hòn đảo trong chúng tôi/);assert.match(storyLayer,/Có những điều ở quê nhà, khi còn nhỏ/);assert.match(storyLayer,/Chúng tôi muốn làm du lịch tốt hơn/);assert.match(storyLayer,/PHÚ QUỐC LUX → JOTRIP DMC/);assert.match(storyLayer,/DÔ!/);assert.match(storyLayer,/Đi cùng người bản địa\. Hiểu hòn đảo\. Rồi yêu cả hành trình\./);assert.match(storyLayer,/TRI THỨC ĐIỂM ĐẾN/);assert.match(storyLayer,/DESTINATION INTELLIGENCE IS PART OF DELIVERY/);assert.match(build,/\/shared\/story-layer\.js/);
});

test('proof layer shows whole-stay DMC work, real journey shapes and boundaries',()=>{
  assert.match(proofLayer,/JoTrip giữ cả kỳ nghỉ/);assert.match(proofLayer,/PRIVATE ISLAND DAY/);assert.match(proofLayer,/BIG-GAME FISHING/);assert.match(proofLayer,/05:00-14:00/);assert.match(proofLayer,/ISLAND ROOTS JOURNEY/);assert.match(proofLayer,/CONSERVATION-LED DAY/);assert.match(proofLayer,/NHỮNG ĐIỀU JOTRIP KHÔNG LÀM/);assert.match(proofLayer,/Destination intelligence/);assert.match(proofLayer,/airport-800\.webp/);assert.match(proofLayer,/driver-800\.webp/);assert.match(proofLayer,/boat-800\.webp/);
});

test('contact layer uses real JoTrip channels and replaces fake preview submit path',()=>{
  assert.match(contactLayer,/\+84 817 060 066/);assert.match(contactLayer,/84817060066/);assert.match(contactLayer,/0817060066/);assert.match(contactLayer,/phuquoclux@gmail\.com/);assert.match(contactLayer,/wa\.me/);assert.match(contactLayer,/zalo\.me/);assert.match(contactLayer,/mailto:/);assert.match(contactLayer,/tel:/);assert.match(contactLayer,/stopImmediatePropagation/);assert.match(contactLayer,/preferred/);assert.match(build,/\/shared\/contact-layer\.js/);assert.match(build,/\/shared\/proof-layer\.js/);
});

test('photo layer promotes high-resolution real Phu Quoc photography into large editorial frames',()=>{
  assert.match(photoLayer,/photo-1693282814784-649be45a459b/);assert.match(photoLayer,/photo-1732243395944-cb3ff9311091/);assert.match(photoLayer,/photo-1631009177269-fabf77f374f7/);assert.match(photoLayer,/photo-1746362722801-17bcc1f72fd9/);assert.match(photoLayer,/w=2600/);assert.match(photoLayer,/island-photo-sequence/);assert.match(photoLayer,/Bãi Sao/);assert.match(photoLayer,/Bãi Khem/);assert.match(build,/\/shared\/photo-layer\.js/);
});

test('photo quality override removes heavy desaturation and excessive scaling',()=>{
  assert.match(photoStyle,/filter:none!important/);assert.match(photoStyle,/scale\(1\.005\)/);assert.match(photoStyle,/scale\(1\.012\)/);assert.doesNotMatch(photoStyle,/scale\(1\.045\)/);assert.match(photoStyle,/island-photo-sequence/);
});

test('sunlit island luxury replaces the grey luxury mood with controlled tropical colour',()=>{
  assert.match(sunlitStyle,/--sun:#f2b84b/);assert.match(sunlitStyle,/--lagoon:#1b8a8c/);assert.match(sunlitStyle,/--coral:#c97855/);assert.match(sunlitStyle,/SUNLIT ISLAND LUXURY/);assert.match(sunlitStyle,/\.atlas\{background:linear-gradient/);assert.match(sunlitStyle,/\.trade-band\{background:#efc66f/);assert.match(sunlitStyle,/\.site-footer\{background:#103f39/);assert.match(sunlitStyle,/filter:none!important/);assert.match(sunlitStyle,/\.sunlit-human/);
});

test('human voice replaces strategy language with concrete JoTrip speech',()=>{
  assert.match(voiceLayer,/đi cùng người hiểu đảo/);assert.match(voiceLayer,/Phu Quoc,.*someone who knows the island/s);assert.match(voiceLayer,/Biển hôm nay khác hôm qua/);assert.match(voiceLayer,/A market is not a stage/);assert.match(voiceLayer,/không chỉ lo một tour/);assert.match(voiceLayer,/The trip feels easy/);assert.match(voiceLayer,/Phú Quốc đẹp/);assert.match(build,/\/shared\/sunlit-voice\.js/);
});

test('mobile hero cannot be pushed behind the fixed header again',()=>{
  assert.match(uxStyle,/@media\(max-width:850px\)/);assert.match(uxStyle,/\.cover-film\{position:relative!important;inset:auto!important/);assert.match(uxStyle,/\.cover-copy\{position:absolute!important;z-index:4;top:68px!important/);assert.match(uxStyle,/padding:52px 22px 38px!important/);assert.match(uxStyle,/\.cover-vignette\{background:linear-gradient/);assert.doesNotMatch(uxStyle,/padding-bottom:300px/);
});

test('visual affordances are honest and keyboard accessible',()=>{
  assert.match(uiPolish,/makeCardLink/);assert.match(uiPolish,/desk-card-image/);assert.match(uiPolish,/island-photo-sequence figure/);assert.match(uiPolish,/setAttribute\('role','link'\)/);assert.match(uiPolish,/event\.key==='Enter'/);assert.match(uiPolish,/aria-roledescription/);assert.match(uxStyle,/\.ui-link-card/);assert.match(build,/\/shared\/ui-polish\.js/);
});

test('each deep page gets distinct editorial depth and continuation',()=>{
  for(const page of pages) assert.match(app,new RegExp(`(?:'${page}'|${page}):`));assert.match(app,/const depthData/);assert.match(app,/const continuationData/);assert.match(app,/page-depth/);assert.match(app,/site-continuation/);
});

test('motion has reading progress, active chapters and restrained image depth',()=>{
  assert.match(app,/reading-progress/);assert.match(app,/IntersectionObserver/);assert.match(app,/is-current/);assert.match(app,/--depth-y/);assert.match(motion,/\.reading-progress/);assert.match(motion,/\.page-localnav a\.is-current/);assert.match(motion,/\.motion-reveal/);assert.match(motion,/@media\(prefers-reduced-motion:reduce\)/);
});

test('retired reading-room and generated-image architecture stays gone',()=>{
  for(const token of banned) assert.equal(html.includes(token),false,`retired token in html: ${token}`);for(const token of banned) assert.equal(foundation.includes(token),false,`retired token in css: ${token}`);assert.equal(/imagegen|dall-e|generated\//i.test(html),false);assert.equal(app.includes('AudioContext'),false);
});

test('visual system is layered but controlled',async()=>{
  const styles=(await readdir(join(root,'src/styles'))).filter(name=>name.endsWith('.css')).sort();assert.deepEqual(styles,['00-foundation.css','10-motion-depth.css','20-local-dmc-story.css','30-proof-contact.css','40-photo-quality.css','50-sunlit-island-luxury.css','60-mobile-ux-polish.css']);assert.match(foundation,/--paper:#f1eee6/);assert.match(motion,/page-depth/);assert.match(storyStyle,/\.origin-story/);assert.match(storyStyle,/\.story-grid/);assert.match(proofStyle,/\.proof-grid/);assert.match(proofStyle,/\.direct-contact/);assert.match(photoStyle,/Photo fidelity lock/);assert.match(sunlitStyle,/Luxury comes from composition/);assert.match(uxStyle,/Mobile and interaction polish/);
});

test('contact activation stays client-side and does not invent a backend',()=>{
  assert.equal(/fetch\(|XMLHttpRequest|sendBeacon/.test(contactLayer),false);assert.match(contactLayer,/window\.open/);assert.match(contactLayer,/navigator\.clipboard/);
});

test('preview worker stays isolated and production binds jotrip.vn',()=>{
  assert.match(wrangler,/"name":"jotrip-dmc-preview"/);assert.doesNotMatch(wrangler,/jotrip\.vn/);assert.match(productionWrangler,/"name":"jotrip-dmc"/);assert.match(productionWrangler,/"pattern":"jotrip\.vn\/\*"/);assert.match(productionWrangler,/"pattern":"www\.jotrip\.vn\/\*"/);assert.match(productionWrangler,/"zone_name":"jotrip\.vn"/);assert.match(workflow,/JOTRIP_PRODUCTION=1 npm run build/);assert.match(workflow,/wrangler\.production\.jsonc/);assert.match(build,/JOTRIP_PRODUCTION/);assert.match(build,/index,follow/);assert.match(build,/Allow: \/\\n/);
});
