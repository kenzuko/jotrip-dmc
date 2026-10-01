import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const r=p=>readFile(new URL('../'+p,import.meta.url));
test('exact approved photographic composition is preserved byte-for-byte',async()=>{
 const img=await r('dist/assets/approved-scene.jpg');
 assert.equal(createHash('sha256').update(img).digest('hex'),'b6988a6d4283b1aa9607d0583ab1f9eae57184a8217fe49b5e5ebf90190b4d82');
});
test('live airport photo is a separate unmodified JoTrip asset, not generated into scene',async()=>{
 const h=(await r('dist/index.html')).toString();const css=(await r('dist/site.css')).toString();
 assert.match(h,/class="airport-embed"/);assert.match(h,/src="\.\/assets\/airport-editorial\.webp"/);
 assert.match(css,/\.airport-embed img\{/);assert.match(h,/approved-book-edge\.png/);await stat(new URL('../dist/assets/airport-editorial.webp',import.meta.url));await stat(new URL('../dist/assets/airport-1600.webp',import.meta.url));
});
test('approved text and full chapter origin are present',async()=>{
 const h=(await r('dist/index.html')).toString();const c=JSON.parse(await r('dist/content.json'));
 assert.match(h,/Đi cùng người bản địa\. Hiểu hòn đảo/);assert.match(h,/của những hành trình có thể ở lại rất lâu trong ký ức/);
 assert.equal(c.chapters.length,6);assert.match(c.chapters[0].paragraphs.join(' '),/Chúng tôi muốn làm du lịch tốt hơn/);
});
test('Pages paths are relative and interactive elements exist',async()=>{
 const h=(await r('dist/index.html')).toString();const js=(await r('dist/site.js')).toString();
 assert.match(h,/href="\.\/site\.css"/);assert.match(h,/src="\.\/site\.js"/);
 assert.match(h,/data-open="reader"/);assert.match(h,/id="briefForm"/);
 assert.match(js,/jotrip\.dmc\.draft01/);assert.match(js,/mailto:hello@jotrip\.vn/);
 assert.doesNotMatch(h,/(?:src|href)="\/(?!\/)/);
});
test('audio is opt-in and mobile has its own scene crops',async()=>{
 const h=(await r('dist/index.html')).toString();const js=(await r('dist/site.js')).toString();
 assert.match(h,/aria-pressed="false"/);assert.match(js,/if\(!soundOn\)return/);
 await stat(new URL('../dist/assets/approved-mobile-sea.jpg',import.meta.url));
 await stat(new URL('../dist/assets/approved-mobile-book.jpg',import.meta.url));
 assert.match(h,/class="mobile-scenery"/);
});

test('phase1 visible copy is live and localized in both VI and EN',async()=>{
 const h=(await r('dist/index.html')).toString();const c=JSON.parse(await r('dist/content.json'));const js=(await r('dist/site.js')).toString();
 assert.match(h,/class="hero-live"/);assert.match(h,/class="book-copy-live"/);assert.match(h,/id="topBrief"/);assert.match(h,/id="desktopNoteText"/);assert.match(h,/data-lang="vi"/);assert.match(h,/data-lang="en"/);
 assert.ok(c.locales?.vi?.hero?.line1);assert.ok(c.locales?.en?.hero?.line1);
 assert.equal(c.locales.vi.chapters.length,6);assert.equal(c.locales.en.chapters.length,6);
 assert.match(js,/applyLocale/);assert.match(js,/setText\('#topBrief'/);assert.match(js,/setText\('#desktopNoteText'/);assert.match(js,/data-hint-key/);
});
test('phase1 interaction discovery is subtle and reduced-motion aware',async()=>{
 const h=(await r('dist/index.html')).toString();const css=(await r('dist/site.css')).toString();const js=(await r('dist/site.js')).toString();
 assert.match(h,/id="discoverHint"/);assert.match(h,/mobile-object-cue/);
 assert.match(css,/scene\.discovery-ready/);assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(js,/sessionStorage\.getItem\('jotrip\.dmc\.discovery\.v2'\)/);
});
