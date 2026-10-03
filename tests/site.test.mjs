import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {join,resolve} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const html=await readFile(join(root,'src/index.html'),'utf8');
const css=await readFile(join(root,'src/styles/00-foundation.css'),'utf8');
const app=await readFile(join(root,'src/app.js'),'utf8');
const build=await readFile(join(root,'build.mjs'),'utf8');

const banned=[
  'Island Reading Room','hero-book','physical-book','reader-room','window-scene',
  'visual-v3','visual-v4','visual-v5','approved-room-parts'
];

test('approved Island Sequence copy is present',()=>{
  assert.match(html,/PHU QUOC,\s*<br>FROM THE INSIDE\./);
  assert.match(html,/Đi cùng người bản địa\./);
  assert.match(html,/A journey begins/);
  assert.match(html,/One Island\.\s*<br><em>Many Ways In\.<\/em>/);
  assert.match(html,/We don't begin/);
  assert.match(html,/JOURNEY PAPER/);
});

test('public homepage does not contain retired reading-room architecture',()=>{
  for(const token of banned) assert.equal(html.includes(token),false,`retired token in html: ${token}`);
  for(const token of banned) assert.equal(css.includes(token),false,`retired token in css: ${token}`);
  assert.equal(app.includes('AudioContext'),false);
  assert.equal(app.includes('chapter'),false);
});

test('homepage uses verified repository photography and no generated-image path',()=>{
  for(const asset of ['boat-800.webp','driver-800.webp','lunch-800.webp','evening-800.webp','family-800.webp','airport-1600.webp']){
    assert.match(html,new RegExp(`/assets/${asset.replace('.','\\.')}`));
  }
  assert.equal(/imagegen|dall-e|generated\//i.test(html),false);
  assert.match(build,/verified real-photo assets/i);
});

test('visual system is intentionally singular',async()=>{
  const styles=(await readdir(join(root,'src/styles'))).filter(name=>name.endsWith('.css'));
  assert.deepEqual(styles,['00-foundation.css']);
  assert.match(css,/--paper:#f3f0e8/);
  assert.match(css,/filter:saturate\(/);
  assert.match(css,/@media\(max-width:620px\)/);
});

test('preview remains noindex and journey form does not transmit data',()=>{
  assert.match(html,/name="robots" content="noindex,nofollow"/);
  assert.match(html,/Nothing is sent automatically/);
  assert.match(app,/event\.preventDefault\(\)/);
  assert.equal(/fetch\(|XMLHttpRequest|sendBeacon/.test(app),false);
});
