import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';

const read=path=>readFile(new URL('../'+path,import.meta.url),'utf8');

test('homepage is the approved Island Reading Room rebuild',async()=>{
  const h=await read('dist/index.html');
  assert.match(h,/The Island Reading Room/);
  assert.match(h,/class="hero-book"/);
  assert.match(h,/class="window-scene"/);
  assert.match(h,/class="welcome-note"/);
  assert.match(h,/class="memory-stack"/);
  assert.match(h,/class="journey-paper"/);
  assert.match(h,/data-action="planner"/);
  assert.match(h,/room-window-approved\.webp/);
  assert.match(h,/openphuquoc\.com/);
  assert.doesNotMatch(h,/room-atmosphere\.webp/);
  assert.doesNotMatch(h,/mobile-book-preview/);
  assert.doesNotMatch(h,/Sunset Town|Cầu Hôn|Kiss Bridge/);
});

test('visual system is one clean rebuild, not the legacy patch stack',async()=>{
  const css=await read('dist/room.css');
  assert.match(css,/Clean rebuild from the approved 28\/09\/2026 direction/);
  assert.match(css,/\.hero-book/);
  assert.match(css,/\.book-paper-stack/);
  assert.match(css,/\.hero-gutter/);
  assert.match(css,/MOBILE IS A SEPARATE COMPOSITION/);
  assert.doesNotMatch(css,/V4\.1|V4\.2|V4\.3|mobile-book-preview/);
});

test('story, memories, travel brief, sound and owner editor remain functional',async()=>{
  const [js,admin]=await Promise.all([read('dist/app.js'),read('dist/admin/index.html')]);
  assert.match(js,/class RoomSound/);
  assert.match(js,/memoriesMarkup/);
  assert.match(js,/plannerMarkup/);
  assert.match(js,/heroChapterTitle/);
  assert.match(admin,/Đây không phải Open CMS/);
});

test('approved atmosphere and verified JoTrip photo assets are built',async()=>{
  const assets=await readdir(new URL('../dist/assets/',import.meta.url));
  for(const name of ['room-window-approved.webp','airport-1600.webp','boat-800.webp','family-800.webp','jotrip-wordmark.png']){
    assert.ok(assets.includes(name),name);
  }
  assert.ok(!assets.includes('room-atmosphere.webp'),'legacy room atmosphere must not ship');
});
