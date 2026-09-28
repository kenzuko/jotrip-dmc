import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';

const read=p=>readFile(new URL('../'+p,import.meta.url),'utf8');

test('homepage keeps the quiet island reading room',async()=>{
  const h=await read('dist/index.html');
  assert.match(h,/The Living Island Book/);
  assert.match(h,/data-action="planner"/);
  assert.match(h,/data-action="jo"/);
  assert.match(h,/openphuquoc\.com/);
  assert.doesNotMatch(h,/mobile-dock/);
  assert.doesNotMatch(h,/book-photo-overlay|class="postcards"/);
});

test('V4 uses real audio files instead of synthesized WebAudio',async()=>{
  const js=await read('dist/app.js');
  assert.match(js,/sfx-page-turn\.mp3/);
  assert.match(js,/sfx-paper-slide\.mp3/);
  assert.match(js,/sfx-window-wind\.mp3/);
  assert.doesNotMatch(js,/AudioContext|createOscillator|createBuffer/);
});

test('book narrative and bespoke philosophy are present',async()=>{
  const c=JSON.parse(await read('dist/content.json'));
  assert.equal(c.chapters.length,6);
  assert.match(c.chapters[0].body,/Phú Quốc đã thay đổi qua từng năm/);
  assert.match(c.chapters[2].title,/biển không chiều lòng người/);
  assert.ok(c.chapters[4].capabilities.includes('Private yacht & boat'));
  assert.match(c.jo.line,/We do not begin with where to go/);
});

test('mobile book, Jo mascot and real-photo assets are built',async()=>{
  const [css,html]=await Promise.all([read('dist/room.css'),read('dist/index.html')]);
  assert.match(css,/mobile-book-stage/);
  assert.match(css,/@media\(max-width:700px\)/);
  assert.match(html,/jo-wave\.webp/);
  const a=await readdir(new URL('../dist/assets/',import.meta.url));
  for(const name of ['room-atmosphere.webp','airport-1600.webp','boat-800.webp','family-800.webp','jo-wave.webp','sfx-page-turn.mp3','sfx-paper-slide.mp3','sfx-pen-write.mp3','sfx-window-wind.mp3'])assert.ok(a.includes(name),name);
});
