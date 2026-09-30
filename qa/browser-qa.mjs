import {chromium} from 'playwright-core';
import {mkdir} from 'node:fs/promises';
const BASE='http://127.0.0.1:8877/jotrip-dmc/';
await mkdir('qa-artifacts',{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROME||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const errors=[];
function watch(page,key){
 page.on('pageerror',e=>errors.push(key+': '+e.message));
 page.on('response',r=>{if(r.status()>=400)errors.push(key+': '+r.status()+' '+r.url())});
}
async function ensure(value,label){if(!value)throw Error(label)}
try{
 const page=await browser.newPage({viewport:{width:1536,height:864},deviceScaleFactor:1,locale:'vi-VN'});watch(page,'desktop');
 await page.goto(BASE+'?lang=vi',{waitUntil:'networkidle',timeout:45000});
 await page.waitForFunction(()=>document.querySelector('.live-hero h1')?.textContent?.includes('Đi cùng người bản địa'));
 await ensure(await page.locator('.scene-master').evaluate(e=>e.complete&&e.naturalWidth===1536),'Missing clean scene');
 await ensure(await page.locator('.airport-embed img').evaluate(e=>e.complete&&e.naturalWidth>100),'Verified airport asset missing');
 await ensure(await page.locator('.live-hero').isVisible(),'Live text not visible');
 await page.screenshot({path:'qa-artifacts/v2-desktop-vi.png'});
 await page.locator('.live-language [data-lang=en]').click();
 await page.waitForFunction(()=>document.documentElement.lang==='en'&&document.querySelector('.live-hero h1')?.textContent?.includes('Travel with local insight'));
 await ensure((await page.locator('.live-book-copy h2').innerText()).includes('The island'),'Book not translated');
 await page.screenshot({path:'qa-artifacts/v2-desktop-en.png'});
 await page.locator('.live-hero-cta').click();
 await page.locator('#briefDialog[open]').waitFor();
 await page.locator('[name="name"]').fill('Visual QA');
 await page.locator('#briefMore').evaluate(el=>el.open=true);
 await page.locator('#childrenSelect').selectOption('2');
 await ensure(await page.locator('.children-ages').isVisible(),'Conditional children ages not shown');
 await page.locator('[name="ages"]').fill('3 and 8');
 await page.screenshot({path:'qa-artifacts/v2-journey-en.png'});
 await page.locator('#briefForm button[type=submit]').click();
 await ensure((await page.locator('#briefResult').innerText()).includes('has not received'),'Draft must clearly say not sent');
 await page.locator('#briefDialog [data-close]').click();
 await page.locator('.live-language [data-lang=vi]').click();
 await page.locator('.live-note').click();await page.locator('#noteDialog[open]').waitFor();
 await page.screenshot({path:'qa-artifacts/v2-note-vi.png'});
 await page.locator('#noteDialog [data-close]').click();
 await page.locator('.book-surface').click({force:true});await page.locator('#readerDialog[open]').waitFor();
 await ensure((await page.locator('#chapterTitle').innerText()).includes('Hòn đảo trong chúng tôi'),'VI book story wrong');
 await page.screenshot({path:'qa-artifacts/v2-reader-vi.png'});
 await page.locator('#tocToggle').click();await ensure(await page.locator('#toc').isVisible(),'Contents tab not opened');
 await page.screenshot({path:'qa-artifacts/v2-contents-vi.png'});
 await page.locator('#readerDialog [data-close]').click();
 const mobile=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,locale:'en-US'});watch(mobile,'mobile');
 await mobile.goto(BASE+'?lang=en',{waitUntil:'networkidle',timeout:45000});
 await mobile.waitForFunction(()=>document.documentElement.lang==='en');
 await ensure(await mobile.locator('.mobile-stage').isVisible(),'Mobile art stage hidden');
 await ensure(await mobile.locator('.desktop-stage').isHidden(),'Full desktop art downloaded to view');
 await mobile.screenshot({path:'qa-artifacts/v2-mobile-en.png',fullPage:true});
 await mobile.locator('.mobile-languages [data-lang=vi]').click();
 await mobile.waitForFunction(()=>document.documentElement.lang==='vi');
 await ensure(!(await mobile.locator('.mobile-hero-copy p').innerText()).includes('<br>'),'Raw HTML in mobile lead');
 await mobile.screenshot({path:'qa-artifacts/v2-mobile-vi.png',fullPage:true});
 await mobile.locator('.mobile-book-art').click();await mobile.locator('#readerDialog[open]').waitFor();
 await mobile.screenshot({path:'qa-artifacts/v2-mobile-reader.png'});
 await ensure(errors.length===0,'Browser issues: '+errors.join('; '));
 console.log('PASS V2 desktop VI+EN, live text, documentary photo, internal paper surfaces, optional form, mobile VI+EN, no HTTP errors');
}finally{await browser.close()}
