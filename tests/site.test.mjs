import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const html=await readFile(join(root,'src/index.html'),'utf8');
const css=await readFile(join(root,'src/styles/00-foundation.css'),'utf8');
const app=await readFile(join(root,'src/app.js'),'utf8');
const build=await readFile(join(root,'build.mjs'),'utf8');

const banned=['Island Reading Room','hero-book','physical-book','reader-room','window-scene','visual-v3','visual-v4','visual-v5','approved-room-parts'];
const pages=['experiences','phu-quoc','partners','journal','about'];

test('homepage is an editorial hub rather than one long landing page',()=>{
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

test('retired reading-room and generated-image architecture stays gone',()=>{
  for(const token of banned) assert.equal(html.includes(token),false,`retired token in html: ${token}`);
  for(const token of banned) assert.equal(css.includes(token),false,`retired token in css: ${token}`);
  assert.equal(/imagegen|dall-e|generated\//i.test(html),false);
  assert.equal(app.includes('AudioContext'),false);
});

test('site has restrained motion and living interactions',()=>{
  assert.match(app,/data-hero-film/);
  assert.match(app,/fieldNotes/);
  assert.match(app,/atlasData/);
  assert.match(app,/data-photo-rail/);
  assert.match(css,/@keyframes filmProgress/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
});

test('visual system remains singular and neutral',async()=>{
  const styles=(await readdir(join(root,'src/styles'))).filter(name=>name.endsWith('.css'));
  assert.deepEqual(styles,['00-foundation.css']);
  assert.match(css,/--paper:#f1eee6/);
  assert.match(css,/filter:saturate\(/);
  assert.match(css,/@media\(max-width:560px\)/);
});

test('journey drawer stays local-only in preview',()=>{
  assert.match(app,/Preview mode: nothing is sent automatically yet/);
  assert.match(app,/event\.preventDefault\(\)/);
  assert.equal(/fetch\(|XMLHttpRequest|sendBeacon/.test(app),false);
});
