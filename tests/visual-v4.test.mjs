import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
const src=new URL('../src/',import.meta.url),dist=new URL('../dist/',import.meta.url);
const checksum='f5ee1611c1a7e4dfa501fbe4eea0977756b1379e1742c89cf7c3419adf841b58';
test('V4 book correction survives the Cloudflare production build without replacing real photographs',async()=>{
 const compressed=(await readFile(new URL('visual-v4.css.gz.b64',src),'utf8')).trim();
 const original=gunzipSync(Buffer.from(compressed,'base64'));
 assert.equal(createHash('sha256').update(original).digest('hex'),checksum);
 const deployed=await readFile(new URL('visual-v4.css',dist));
 assert.deepEqual(deployed,original);
 const css=deployed.toString('utf8');
 for(const marker of ['.desk::before,.desk::after','.book-wrap{','.book-arrow','.chapter-shelf{','.photo-strip{','.benefits{','@media(max-width:760px)','prefers-reduced-motion'])assert.ok(css.includes(marker),marker);
 assert.match(css,/min-height:520px/);
 assert.match(css,/height:clamp\(520px,36\.4vw,590px\)/);
 assert.match(css,/\.book\{[^}]*grid-template-columns:48\.4% 51\.6%/);
 for(const route of ['','cau-chuyen/','con-nguoi/','phu-quoc/','bespoke/','lien-he/','partners/','privacy/']){
  const html=await readFile(new URL(route+'index.html',dist),'utf8');
  assert.match(html,/\/visual-v3\.css\?v=3/);
  assert.match(html,/\/visual-v4\.css\?v=4/);
  assert.match(html,/jotrip-wordmark\.png/);
  assert.match(html,/noindex,nofollow/);
 }
 for(const photo of ['airport-1600.webp','boat-800.webp','family-800.webp'])assert.ok((await stat(new URL('assets/'+photo,dist))).size>8000,photo);
});
