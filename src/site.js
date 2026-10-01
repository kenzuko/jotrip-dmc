const q=s=>document.querySelector(s), qa=s=>Array.from(document.querySelectorAll(s));
let contentData=null,chapters=[],chapter=0,audio=null,soundOn=false,restoreFocus=null;
let locale=localStorage.getItem('jotrip.dmc.locale')||((navigator.language||'').toLowerCase().startsWith('vi')?'vi':'en');
if(!['vi','en'].includes(locale))locale='vi';

const dialogs={reader:q('#readerDialog'),note:q('#noteDialog'),memories:q('#memoriesDialog'),brief:q('#briefDialog')};
const menu=q('#mobileNav'),menuButton=q('#menuButton');

/* Phase 1 keeps sound opt-in and unchanged. Licensed ambience comes in its own gated phase. */
const soundToggle=q('#soundToggle');
soundToggle?.addEventListener('click',()=>{
  soundOn=!soundOn;
  soundToggle.setAttribute('aria-pressed',String(soundOn));
  soundToggle.textContent=soundOn?(locale==='vi'?'Âm thanh: Bật':'Sound: On'):(locale==='vi'?'Âm thanh: Tắt':'Sound: Off');
  if(soundOn)rustle();
});
function rustle(){
  if(!soundOn)return;
  try{
    audio??=new (window.AudioContext||window.webkitAudioContext)();
    if(audio.state==='suspended')void audio.resume();
    const n=Math.floor(audio.sampleRate*.11),buf=audio.createBuffer(1,n,audio.sampleRate),d=buf.getChannelData(0);
    for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);
    const src=audio.createBufferSource(),f=audio.createBiquadFilter(),g=audio.createGain();
    src.buffer=buf;f.type='lowpass';f.frequency.value=1700;g.gain.value=.035;
    src.connect(f);f.connect(g);g.connect(audio.destination);src.start();
  }catch{}
}

function show(d){
  if(!d)return;
  restoreFocus=document.activeElement;rustle();
  if(typeof d.showModal==='function'&&!d.open)d.showModal();
  else d.setAttribute('open','');
  d.querySelector('[data-close]')?.focus();
}
function hide(d){
  if(!d)return;rustle();
  if(typeof d.close==='function'&&d.open)d.close();
  else d.removeAttribute('open');
  restoreFocus?.focus?.();
}
qa('[data-close]').forEach(b=>b.addEventListener('click',()=>hide(b.closest('dialog'))));
Object.values(dialogs).forEach(d=>d?.addEventListener('click',e=>{if(e.target===d)hide(d)}));

qa('[data-open]').forEach(el=>el.addEventListener('click',()=>{
  if(menu&&!menu.hidden){menu.hidden=true;menuButton?.setAttribute('aria-expanded','false')}
  const type=el.dataset.open;
  if(type==='toc'){
    show(dialogs.reader);q('#toc').hidden=false;q('#tocToggle').setAttribute('aria-expanded','true');
  }else if(type==='reader'){renderChapter(chapter);show(dialogs.reader)}
  else show(dialogs[type]);
}));
menuButton?.addEventListener('click',()=>{
  menu.hidden=!menu.hidden;
  menuButton.setAttribute('aria-expanded',String(!menu.hidden));rustle();
});

function setText(selector,value){const n=q(selector);if(n)n.textContent=value??''}
function setHtml(selector,value){const n=q(selector);if(n)n.innerHTML=value??''}

function applyLocale(next,{persist=true}={}){
  if(!contentData?.locales?.[next])return;
  locale=next;
  if(persist)localStorage.setItem('jotrip.dmc.locale',locale);
  document.documentElement.lang=locale;
  const t=contentData.locales[locale];
  document.title=t.meta.title;
  const desc=q('meta[name="description"]');if(desc)desc.setAttribute('content',t.meta.description);

  setText('#heroEyebrow',t.hero.eyebrow);
  setText('#heroLine1',t.hero.line1);setText('#heroLine2',t.hero.line2);setText('#heroLine3',t.hero.line3);
  const desktopLead=q('#heroLead');if(desktopLead)desktopLead.textContent=t.hero.lead;
  setText('#heroPrimary',t.hero.primary);setHtml('#heroBook',t.hero.book+' <span aria-hidden="true">→</span>');

  setText('#bookEyebrow',t.book.eyebrow);setText('#bookTitle1',t.book.title1);setText('#bookTitle2',t.book.title2);
  setText('#bookExcerpt',t.book.excerpt);setHtml('#bookStory',t.book.story+' <span aria-hidden="true">→</span>');

  setText('#mobileHeroEyebrow',t.hero.eyebrow);setText('#mobileHero1',t.hero.line1);setText('#mobileHero2',t.hero.line2);setText('#mobileHero3',t.hero.line3);
  setText('#mobileHeroLead',t.hero.lead);setText('#mobileHeroPrimary',t.hero.primary+' ↗');
  setText('#mobileBookEyebrow',t.book.eyebrow);setText('#mobileBookTitle1',t.book.title1);setText('#mobileBookTitle2',t.book.title2);
  setText('#mobileBookExcerpt',t.book.excerpt);setHtml('#mobileOpenBook',t.hero.book+' <span aria-hidden="true">→</span>');
  setText('#mobileNoteText',t.mobile.note);setText('#mobileBookCue',t.hints.mobileBook);

  qa('[data-hint-key]').forEach(el=>el.dataset.hint=t.hints[el.dataset.hintKey]||'');
  setText('#discoverHint',t.hints.discover);
  qa('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===locale)));

  chapters=t.chapters||[];
  chapter=Math.max(0,Math.min(chapter,chapters.length-1));
  buildToc();renderChapter(chapter);

  if(soundToggle)soundToggle.textContent=soundOn?(locale==='vi'?'Âm thanh: Bật':'Sound: On'):(locale==='vi'?'Âm thanh: Tắt':'Sound: Off');
}
qa('[data-lang]').forEach(b=>b.addEventListener('click',()=>applyLocale(b.dataset.lang)));

function renderChapter(i){
  if(!chapters.length){
    setText('#chapterTitle',locale==='vi'?'Nội dung đang được tải':'Content is loading');
    return;
  }
  chapter=Math.max(0,Math.min(i,chapters.length-1));const c=chapters[chapter];
  setText('#chapterEyebrow',c.eyebrow);setText('#chapterTitle',c.title);setText('#chapterSubtitle',c.subtitle);
  const body=q('#chapterBody');body.replaceChildren();
  (c.paragraphs||[]).forEach(p=>{const el=document.createElement('p');el.textContent=p;body.append(el)});
  const photo=q('#chapterPhoto');photo.src='./assets/'+encodeURIComponent(c.image);photo.alt=c.alt||'JoTrip documentary photograph';
  setText('#chapterCaption',c.caption);
  setText('#chapterNumber',String(chapter+1).padStart(2,'0')+' / '+String(chapters.length).padStart(2,'0'));
  q('#chapterPrev').disabled=chapter===0;q('#chapterNext').disabled=chapter===chapters.length-1;
  q('.reader-paper').scrollTop=0;
  localStorage.setItem('jotrip.dmc.lastChapter',String(chapter));
  qa('#toc button').forEach(b=>b.setAttribute('aria-current',String(Number(b.dataset.chapter)===chapter)));
}
function buildToc(){
  const nav=q('#toc');if(!nav)return;nav.replaceChildren();
  chapters.forEach((c,i)=>{
    const b=document.createElement('button');b.type='button';b.dataset.chapter=String(i);
    b.textContent=String(i+1).padStart(2,'0')+' / '+c.title;
    b.addEventListener('click',()=>{renderChapter(i);nav.hidden=true;q('#tocToggle').setAttribute('aria-expanded','false');rustle()});
    nav.append(b);
  });
}
function changeChapter(dir){const next=chapter+dir;if(next<0||next>=chapters.length)return;rustle();renderChapter(next)}
q('#chapterPrev')?.addEventListener('click',()=>changeChapter(-1));
q('#chapterNext')?.addEventListener('click',()=>changeChapter(1));
q('#tocToggle')?.addEventListener('click',()=>{
  const toc=q('#toc');toc.hidden=!toc.hidden;
  q('#tocToggle').setAttribute('aria-expanded',String(!toc.hidden));rustle();
});
document.addEventListener('keydown',e=>{
  if(!dialogs.reader.open)return;
  if(e.key==='ArrowRight')changeChapter(1);
  if(e.key==='ArrowLeft')changeChapter(-1);
});
let touchX=null;
q('.reader-spread')?.addEventListener('touchstart',e=>touchX=e.changedTouches[0].clientX,{passive:true});
q('.reader-spread')?.addEventListener('touchend',e=>{
  if(touchX===null)return;const delta=e.changedTouches[0].clientX-touchX;touchX=null;
  if(Math.abs(delta)>70)changeChapter(delta<0?1:-1);
},{passive:true});

function runDiscoveryCue(){
  if(sessionStorage.getItem('jotrip.dmc.discovery.v2'))return;
  sessionStorage.setItem('jotrip.dmc.discovery.v2','1');
  window.setTimeout(()=>{
    const scene=q('#scene'),hint=q('#discoverHint');scene?.classList.add('discovery-ready');hint?.classList.add('is-visible');
    window.setTimeout(()=>hint?.classList.remove('is-visible'),3000);
    window.setTimeout(()=>scene?.classList.remove('discovery-ready'),3500);
  },1700);
}

async function loadContent(){
  try{
    const r=await fetch('./content.json',{cache:'no-store'});if(!r.ok)throw Error('Content '+r.status);
    contentData=await r.json();
    chapter=Math.max(0,Math.min(Number(localStorage.getItem('jotrip.dmc.lastChapter')||0),5));
    applyLocale(locale,{persist:false});runDiscoveryCue();
  }catch(e){console.error('Cannot load JoTrip content',e);setText('#chapterTitle','Content unavailable');}
}
void loadContent();

/* Draft remains local until the visitor explicitly opens their mail app. */
const form=q('#briefForm'),result=q('#briefResult');
const previous=localStorage.getItem('jotrip.dmc.draft01');
if(previous){try{const obj=JSON.parse(previous);Object.entries(obj).forEach(([k,v])=>{const field=form?.elements.namedItem(k);if(field)field.value=v})}catch{}}
form?.addEventListener('input',()=>{
  const fields=Object.fromEntries(new FormData(form).entries());
  localStorage.setItem('jotrip.dmc.draft01',JSON.stringify(fields));
});
form?.addEventListener('submit',e=>{
  e.preventDefault();rustle();const f=Object.fromEntries(new FormData(form).entries());
  localStorage.setItem('jotrip.dmc.draft01',JSON.stringify(f));
  const vi=locale==='vi';
  const lines=[vi?'YOUR PHU QUOC JOURNEY - DRAFT 01':'YOUR PHU QUOC JOURNEY - DRAFT 01','',
    (vi?'Tên: ':'Name: ')+(f.name||'—'),(vi?'Người đi cùng: ':'Travel party: ')+(f.companions||'—'),
    (vi?'Khi nào đến đảo: ':'Dates: ')+(f.when||'—'),(vi?'Nhịp nghỉ: ':'Preferred pace: ')+(f.pace||'—'),
    (vi?'Điều cần chú ý: ':'What matters: ')+(f.care||'—'),(vi?'Liên hệ: ':'Contact: ')+(f.contact||'—')];
  result.replaceChildren();result.hidden=false;
  const title=document.createElement('strong');title.textContent='YOUR PHU QUOC JOURNEY - DRAFT 01';
  const note=document.createElement('p');note.textContent=vi?'Bản nháp chỉ được lưu trên thiết bị này. JoTrip chưa nhận được thông tin cho đến khi bạn chủ động gửi.':'This draft is stored only on this device. JoTrip has not received it until you explicitly send it.';
  const pre=document.createElement('pre');pre.textContent=lines.join('\n');
  const send=document.createElement('a');send.href='mailto:hello@jotrip.vn?subject='+encodeURIComponent('Your Phu Quoc Journey - Draft 01')+'&body='+encodeURIComponent(lines.join('\n'));
  send.textContent=vi?'Mở email để gửi cho JoTrip ↗':'Open email to send to JoTrip ↗';
  result.append(title,note,pre,send);
});
