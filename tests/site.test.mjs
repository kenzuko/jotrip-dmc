import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const html=await readFile(join(root,'src/index.html'),'utf8');
const foundation=await readFile(join(root,'src/styles/00-foundation.css'),'utf8');
const motion=await readFile(join(root,'src/styles/10-motion-depth.css'),'utf8');
const storyStyle=await readFile(join(root,'src/styles/20-local-dmc-story.css'),'utf8');
const storyLayer=await readFile(join(root,'src/pages/shared/story-layer.js'),'utf8');
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
  assert.match(app,/from '\.\/i18n\.js'/);assert.match(app,/data-lang="en"/);assert.match(app,/data-lang="vi"/);assert.match(app,/setLanguagePreference/);assert.match(i18n,/localStorage\.setItem\('jotrip-lang'/);assert.match(i18n,/BẮT ĐẦU TỪ CON NGƯỜI/);assert.match(i18n,/Phú Quốc/);assert.match(build,/i18n\.js/);assert.match(storyLayer,/const lang =/);assert.match(storyLayer,/HIỂU CẢ HÒN ĐẢO/);assert.match(storyLayer,/KNOWING THE WHOLE ISLAND/);
});

test('local DMC story restores origin and deep destination literacy',()=>{
  assert.match(storyLayer,/Hòn đảo trong chúng tôi/);
  assert.match(storyLayer,/Có những điều ở quê nhà, khi còn nhỏ/);
  assert.match(storyLayer,/Chúng tôi muốn làm du lịch tốt hơn/);
  assert.match(storyLayer,/PHÚ QUỐC LUX → JOTRIP DMC/);
  assert.match(storyLayer,/DÔ!/);
  assert.match(storyLayer,/Đi cùng người bản địa\. Hiểu hòn đảo\. Rồi yêu cả hành trình\./);
  assert.match(storyLayer,/TRI THỨC ĐIỂM ĐẾN/);
  assert.match(storyLayer,/DESTINATION INTELLIGENCE IS PART OF DELIVERY/);
  assert.match(build,/\/shared\/story-layer\.js/);
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
  const styles=(await readdir(join(root,'src/styles'))).filter(name=>name.endsWith('.css')).sort();assert.deepEqual(styles,['00-foundation.css','10-motion-depth.css','20-local-dmc-story.css']);assert.match(foundation,/--paper:#f1eee6/);assert.match(foundation,/filter:saturate\(/);assert.match(motion,/page-depth/);assert.match(storyStyle,/\.origin-story/);assert.match(storyStyle,/\.story-grid/);
});

test('journey drawer stays local-only in preview',()=>{
  assert.match(i18n,/Bản xem thử: hiện chưa tự động gửi dữ liệu/);assert.match(app,/event\.preventDefault\(\)/);assert.equal(/fetch\(|XMLHttpRequest|sendBeacon/.test(app),false);
});

test('preview worker stays isolated and production binds jotrip.vn',()=>{
  assert.match(wrangler,/"name":"jotrip-dmc-preview"/);
  assert.doesNotMatch(wrangler,/jotrip\.vn/);
  assert.match(productionWrangler,/"name":"jotrip-dmc"/);
  assert.match(productionWrangler,/"pattern":"jotrip\.vn\/\*"/);
  assert.match(productionWrangler,/"zone_name":"jotrip\.vn"/);
  assert.match(workflow,/JOTRIP_PRODUCTION=1 npm run build/);
  assert.match(workflow,/wrangler\.production\.jsonc/);
  assert.match(build,/JOTRIP_PRODUCTION/);
  assert.match(build,/index,follow/);
  assert.match(build,/Allow: \/\\n/);
});
