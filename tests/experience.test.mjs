import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const get=name=>readFile(new URL('../dist/'+name,import.meta.url));
const txt=async name=>(await get(name)).toString();
const sha256=buffer=>createHash('sha256').update(buffer).digest('hex');
test('immutable user approved image is byte-for-byte preserved',async()=>{
 const original=await get('assets/approved-scene.jpg');
 assert.equal(sha256(original),'b6988a6d4283b1aa9607d0583ab1f9eae57184a8217fe49b5e5ebf90190b4d82');
 await stat(new URL('../dist/assets/scene-clean-v2.png',import.meta.url));
});
test('visible desktop hero and book copy are authored HTML not hidden screenshot text',async()=>{
 const h=await txt('index.html');
 assert.match(h,/class="live-hero"/);assert.match(h,/class="live-book-copy"/);
 assert.match(h,/src="\.\/assets\/scene-clean-v2\.png"/);
 assert.match(h,/data-l10n="hero\.first"/);assert.match(h,/data-l10n="book\.excerpt"/);
 assert.doesNotMatch(h,/class="scene-master"[^>]*approved-scene\.jpg/);
});
test('locales translate every visible key and preserve approved Vietnamese chapter one',async()=>{
 const vi=JSON.parse(await txt('i18n/vi.json')),en=JSON.parse(await txt('i18n/en.json'));
 const listKeys=(o,p='')=>Object.entries(o).flatMap(([k,v])=>Array.isArray(v)?[]:v&&typeof v==='object'?listKeys(v,p+k+'.'):[p+k]);
 assert.deepEqual(listKeys(vi).sort(),listKeys(en).sort());
 assert.equal(vi.chapters.length,6);assert.equal(en.chapters.length,6);
 assert.equal(vi.hero.first,'Đi cùng người bản địa.');
 assert.match(vi.book.excerpt,/Qua từng vị khách, từng hành trình/);
 assert.match(vi.chapters[0].paragraphs.join(' '),/Chúng tôi muốn làm du lịch tốt hơn/);
 assert.match(en.chapters[0].paragraphs.join(' '),/our home a better place too/);
 const h=await txt('index.html');
 for(const [key] of [...h.matchAll(/data-l10n(?:-html|-ph|-aria)?="([^"]+)"/g)])assert.ok(key);
 const all=[...h.matchAll(/data-l10n(?:-html|-ph|-aria)?="([^"]+)"/g)].map(m=>m[1]);
 for(const key of all){const v=key.split('.').reduce((a,c)=>a?.[c],vi);assert.ok(typeof v==='string',key)}
});
test('documentary photo and page edge assets remain separate from scene',async()=>{
 const h=await txt('index.html');
 assert.match(h,/class="airport-embed"/);assert.match(h,/src="\.\/assets\/airport-editorial\.webp"/);
 for(const x of ['airport-editorial.webp','approved-book-edge.png','airport-1600.webp','boat-800.webp','jotrip-wordmark.png'])await stat(new URL('../dist/assets/'+x,import.meta.url));
});
test('interactive cues support accessibility and progressive detailed inquiry',async()=>{
 const h=await txt('index.html'),js=await txt('site.js');
 assert.match(h,/class="book-surface"/);assert.match(h,/class="live-note"/);
 assert.match(h,/aria-live="polite"/);assert.match(h,/id="briefMore"/);assert.match(h,/class="span-full children-ages" hidden/);
 assert.match(js,/jotrip\.dmc\.draft01/);assert.match(js,/mailto:hello@jotrip\.vn/);
 assert.match(js,/if\(!reduced&&!sessionStorage\.getItem/);
 assert.match(js,/document\.documentElement\.lang=next/);
 assert.doesNotMatch(h,/(?:src|href)="\/(?!\/)/);
});
test('audio never auto-plays, disabled pending sourced licensed recordings',async()=>{
 const h=await txt('index.html'),js=await txt('site.js');
 assert.match(h,/id="soundToggle"[^>]*disabled/);
 assert.match(js,/soundOn=false/);
 assert.doesNotMatch(h,/<audio[^>]*autoplay/);
});
