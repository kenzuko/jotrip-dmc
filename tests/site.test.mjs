import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const html=await readFile(join(root,'src/index.html'),'utf8');
const foundation=await readFile(join(root,'src/styles/00-foundation.css'),'utf8');
const motion=await readFile(join(root,'src/styles/10-motion-depth.css'),'utf8');
const app=await readFile(join(root,'src/app.js'),'utf8');
const i18n=await readFile(join(root,'src/i18n.js'),'utf8');
const build=await readFile(join(root,'build.mjs'),'utf8');

const banned=['Island Reading Room','hero-book','physical-book','reader-room','window-scene','visual-v3','visual-v4','visual-v5','approved-room-parts'];
const pages=['experiences','phu-quoc','partners','journal','about'];

test('homepage remains an editorial hub rather than one long landing page',()=>{
  assert.match(html,/ISLAND DESK/);
  assert.match(html,/EXPERIENCE ATLAS/);
  assert.match(html,/data-photo-rail/);
  assert.match(html,/DMC PRACTICE/);
  assert.match(html,/FIELD NOTES/);
  assert.match(html,/FOR TRAVEL PARTNERS/);
  assert.equal(html.includes('class="journey"'),false);
});

test('real subpages exist and share the DMC shell',async()=>{
  for(const page of pages){
    const path=join(root,'src/pages',page,'index.html');
    assert.equal((await stat(path)).isFile(),true,`${page} page missing`);
    const pageHtml=await readFile(path,'utf8');
    assert.match(pageHtml,/data-site-header/);
    assert.match(pageHtml,/data-site-footer/);
    assert.match(pageHtml,/data-journey-drawer/);
    assert.match(pageHtml,/name="robots" content="noindex,nofollow"/);
  }
  assert.match(build,/cp\(join\(src,'pages'\),dist/);
});

test('EN-VI is a real persistent site layer',()=>{
  assert.match(app,/from '\.\/i18n\.js'/);
  assert.match(app,/data-lang="en"/);
  assert.match(app,/data-lang="vi"/);
  assert.match(app,/setLanguagePreference/);
  assert.match(i18n,/localStorage\.setItem\('jotrip-lang'/);
  assert.match(i18n,/BẮT ĐẦU TỪ CON NGƯỜI/);
  assert.match(i18n,/Phú Quốc/);
  assert.match(build,/i18n\.js/);
});

test('each deep page gets distinct editorial depth and continuation',()=>{
  for(const page of pages) assert.match(app,new RegExp(`(?:'${page}'|${page}):`));
  assert.match(app,/const depthData/);
  assert.match(app,/const continuationData/);
  assert.match(app,/page-depth/);
  assert.match(app,/site-continuation/);
});

test('motion has reading progress, active chapters and restrained image depth',()=>{
  assert.match(app,/reading-progress/);
  assert.match(app,/IntersectionObserver/);
  assert.match(app,/is-current/);
  assert.match(app,/--depth-y/);
  assert.match(motion,/\.reading-progress/);
  assert.match(motion,/\.page-localnav a\.is-current/);
  assert.match(motion,/\.motion-reveal/);
  assert.match(motion,/@media\(prefers-reduced-motion:reduce\)/);
});

test('retired reading-room and generated-image architecture stays gone',()=>{
  for(const token of banned) assert.equal(html.includes(token),false,`retired token in html: ${token}`);
  for(const token of banned) assert.equal(foundation.includes(token),false,`retired token in css: ${token}`);
  assert.equal(/imagegen|dall-e|generated\//i.test(html),false);
  assert.equal(app.includes('AudioContext'),false);
});

test('visual system is layered but controlled',async()=>{
  const styles=(await readdir(join(root,'src/styles'))).filter(name=>name.endsWith('.css')).sort();
  assert.deepEqual(styles,['00-foundation.css','10-motion-depth.css']);
  assert.match(foundation,/--paper:#f1eee6/);
  assert.match(foundation,/filter:saturate\(/);
  assert.match(motion,/page-depth/);
});

test('journey drawer stays local-only in preview',()=>{
  assert.match(app,/Bản xem thử: hiện chưa tự động gửi dữ liệu/);
  assert.match(app,/event\.preventDefault\(\)/);
  assert.equal(/fetch\(|XMLHttpRequest|sendBeacon/.test(app),false);
});
