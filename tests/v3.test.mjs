import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');

test('approved hero copy is preserved',async()=>{
  const h=await read('dist/index.html');
  assert.match(h,/Đi cùng người bản địa/);
  assert.match(h,/Rồi yêu cả hành trình/);
  assert.match(h,/Một chuyến đi riêng không bắt đầu bằng danh sách điểm đến/);
});

test('book is real HTML and embeds the verified airport photo',async()=>{
  const h=await read('dist/index.html');
  assert.match(h,/class="book"/);
  assert.match(h,/class="page page-left"/);
  assert.match(h,/\.\/assets\/airport-1600\.webp/);
  assert.match(h,/Hòn đảo/);
  assert.match(h,/Qua từng vị khách, từng hành trình và những cuộc gặp gỡ/);
  assert.doesNotMatch(h,/room-plate|approved-room|background-image:[^;]*generated/i);
});

test('sound remains explicitly opt-in',async()=>{
  const h=await read('dist/index.html'),j=await read('dist/app.js');
  assert.match(h,/aria-pressed="false"/);
  assert.match(j,/===['"]on['"]/);
  assert.doesNotMatch(h,/<audio[^>]+autoplay|<video[^>]+autoplay/i);
});

test('GitHub Pages uses only relative application paths',async()=>{
  const h=await read('dist/index.html');
  assert.doesNotMatch(h,/(?:src|href)="\/(?!\/)/);
  assert.match(h,/src="\.\/app\.js"/);
  assert.match(h,/href="\.\/app\.css"/);
});

test('verified documentary images ship',async()=>{
  const assets=await readdir(new URL('../dist/assets/',import.meta.url));
  for(const name of ['airport-1600.webp','boat-800.webp','evening-800.webp','lunch-800.webp','jotrip-wordmark.png'])assert.ok(assets.includes(name),name);
});
