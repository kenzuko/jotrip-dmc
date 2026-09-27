import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {Script} from 'node:vm';
const root=new URL('../dist/',import.meta.url);
const read=async path=>readFile(new URL(path,root),'utf8');
const paths=['','cau-chuyen/','con-nguoi/','phu-quoc/','phu-quoc/nam-dao/','phu-quoc/bac-dao/','phu-quoc/nghi-duong/','bespoke/','lien-he/','partners/','privacy/'];
test('Build publishes full standalone editorial architecture',async()=>{
for(const p of paths) {
  const file=p?p+'index.html':'index.html',html=await read(file);
  assert.match(html,/<html lang="vi"/,file);
  assert.match(html,/jotrip-wordmark\.png/,file);
  assert.match(html,/<meta name="robots" content="noindex,nofollow">/,file);
  assert.match(html,/<main\b/,file);
  assert.match(html,/Travel, made personal\./,file);
  assert.ok(!/href="\/[a-z-]+\/(?=[ >])/.test(html),'Unclosed link '+file);
}
});
test('Homepage keeps approved book, six chapters, ribbon, authentic photo bundle',async()=>{
const html=await read('index.html');
assert.match(html,/id="mainBook"/);
assert.equal((html.match(/data-chapter="\d"/g)||[]).length,6);
assert.match(html,/ed-portals-grid/);
assert.match(html,/class="benefits"/);
assert.doesNotMatch(html,/<section class="long-story" id="story">/);
assert.match(html,/href="\/cau-chuyen\/"/);
assert.match(html,/href="\/con-nguoi\/"/);
assert.match(html,/href="\/phu-quoc\/"/);
assert.match(html,/href="\/bespoke\/"/);
for(const f of ['airport-800.webp','boat-800.webp','family-800.webp','jotrip-wordmark.png'])assert.ok((await stat(new URL('assets/'+f,root))).size>1000,f);
});
test('All internal HTML links target a generated page',async()=>{
for(const path of paths){
const html=await read((path||'')+'index.html');
for(const [,link] of html.matchAll(/href="(\/[^"#?]*\/)"/g)){
if(link==='/')continue;
const target=new URL(link.slice(1)+'index.html',root);
await assert.doesNotReject(async()=>stat(target),'Broken '+link+' in '+path);
}
}
});
test('Generated browser script parses and prevents automatic booking',async()=>{
for(const p of ['','bespoke/','cau-chuyen/','phu-quoc/']){
const html=await read(p+'index.html');
for(const [,js] of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new Script(js,{filename:p||'index'});
assert.doesNotMatch(html,/booking_confirmed|98% hài lòng|unsplash\.com/i);
}
const bespoke=await read('bespoke/index.html');
assert.match(bespoke,/name="consent"/);
assert.match(bespoke,/mailto:phuquoclux@gmail\.com/);
assert.match(bespoke,/preventDefault/);
});

test('English link from an editorial subpage switches the book language',async()=>{
 const html=await read('index.html');
 assert.match(html,/new URLSearchParams\(location.search\)/);
 assert.match(html,/lang"\)==="en"/);
});
