import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
const read=path=>readFile(new URL('../'+path,import.meta.url),'utf8');

test('V8 ships as one physical Island Reading Room composition',async()=>{
  const h=await read('dist/index.html');
  assert.match(h,/The Island Reading Room/);
  assert.match(h,/room-plate-v8\.webp/);
  assert.match(h,/class="book-hit"/);
  assert.match(h,/class="page-live page-live-left"/);
  assert.match(h,/class="memory-object"/);
  assert.match(h,/class="journey-object"/);
  assert.doesNotMatch(h,/Sunset Town|Cầu Hôn|Kiss Bridge|mobile-book-preview/);
});

test('sound is opt-in and never autoplays',async()=>{
  const h=await read('dist/index.html');
  assert.match(h,/aria-pressed="false"/);
  assert.match(h,/jotrip\.v8\.sound/);
  assert.match(h,/===['"]on['"]/);
  assert.doesNotMatch(h,/<audio[^>]+autoplay|<video[^>]+autoplay/i);
});

test('Journey Paper remains a local Draft 01 until the guest sends it',async()=>{
  const h=await read('dist/index.html');
  assert.match(h,/Tạo Draft 01/);
  assert.match(h,/jotrip\.v8\.brief/);
  assert.match(h,/mailto:/);
  assert.match(h,/vẫn đang ở trên thiết bị của bạn/);
});

test('mobile is a separate camera composition',async()=>{
  const h=await read('dist/index.html');
  assert.match(h,/Mobile gets its own camera composition/);
  assert.match(h,/@media\(max-width:700px\)/);
  assert.match(h,/scene-frame:before/);
});

test('verified JoTrip assets and V8 room plate are built',async()=>{
  const assets=await readdir(new URL('../dist/assets/',import.meta.url));
  for(const name of ['room-plate-v8.webp','jotrip-wordmark.png','airport-1600.webp','boat-800.webp','family-800.webp']) assert.ok(assets.includes(name),name);
});
