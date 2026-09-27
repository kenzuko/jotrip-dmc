import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dist=new URL('../dist/',import.meta.url);
test('Original-photography luxury book visual survives build on all standalone routes',async()=>{
 const css=await readFile(new URL('visual-v3.css',dist),'utf8');
 assert.equal(Buffer.byteLength(css,'utf8'),14721);
 assert.equal(createHash('sha256').update(css).digest('hex'),'ce93d8d11603094082a638ada792acfe18f44be758e30b796d91623386229da3');
 assert.match(css,/\.book:before/);
 assert.match(css,/\.page-right img/);
 assert.match(css,/\.chapter-shelf/);
 assert.match(css,/\.benefits/);
 assert.match(css,/@media\(max-width:760px\)/);
 assert.match(css,/prefers-reduced-motion/);
 for(const p of ['','cau-chuyen/','con-nguoi/','phu-quoc/','bespoke/','lien-he/','partners/','privacy/']){
   const html=await readFile(new URL(p+'index.html',dist),'utf8');
   assert.match(html,/\/visual-v3\.css\?v=3/);
   assert.match(html,/jotrip-wordmark\.png/);
   assert.match(html,/noindex,nofollow/);
   assert.ok(!html.includes('unsplash.com'));
 }
 const home=await readFile(new URL('index.html',dist),'utf8');
 assert.equal((home.match(/data-chapter="\d"/g)||[]).length,6);
 for(const s of ['class="book"','class="chapter-shelf"','class="benefits"','ed-portals-grid'])assert.ok(home.includes(s),s);
 for(const pic of ['airport-1600.webp','boat-800.webp','family-800.webp'])assert.ok((await stat(new URL('assets/'+pic,dist))).size>8000,pic);
});