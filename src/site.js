const q=s=>document.querySelector(s), qa=s=>Array.from(document.querySelectorAll(s));
let chapters=[], chapter=0, audio=null, soundOn=false, restoreFocus=null;
const dialogs={reader:q('#readerDialog'),note:q('#noteDialog'),memories:q('#memoriesDialog'),brief:q('#briefDialog')};
const menu=q('#mobileNav'),menuButton=q('#menuButton');

/* No sound is played until a visitor explicitly opts in. No music or ambient audio. */
const soundToggle=q('#soundToggle');
soundToggle?.addEventListener('click',()=>{
  soundOn=!soundOn;
  soundToggle.setAttribute('aria-pressed',String(soundOn));
  soundToggle.textContent=soundOn?'Âm thanh: Bật':'Âm thanh: Tắt';
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
  }catch{/* Audio is strictly optional. */}
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

function text(el,value){const n=q(el);if(n)n.textContent=value||''}
function renderChapter(i){
  if(!chapters.length){
    text('#chapterTitle','Nội dung đang được tải');
    text('#chapterBody','Vui lòng thử lại trong ít phút.');return;
  }
  chapter=Math.max(0,Math.min(i,chapters.length-1));const c=chapters[chapter];
  text('#chapterEyebrow',c.eyebrow);
  text('#chapterTitle',c.title);
  text('#chapterSubtitle',c.subtitle);
  const body=q('#chapterBody');body.replaceChildren();
  (c.paragraphs||[]).forEach(p=>{const el=document.createElement('p');el.textContent=p;body.append(el)});
  const photo=q('#chapterPhoto');photo.src='./assets/'+encodeURIComponent(c.image);photo.alt=c.alt||'Ảnh thật trong kho tư liệu JoTrip';
  text('#chapterCaption',c.caption);
  text('#chapterNumber',String(chapter+1).padStart(2,'0')+' / '+String(chapters.length).padStart(2,'0'));
  q('#chapterPrev').disabled=chapter===0;q('#chapterNext').disabled=chapter===chapters.length-1;
  q('.reader-paper').scrollTop=0;
  localStorage.setItem('jotrip.dmc.lastChapter',String(chapter));
  qa('#toc button').forEach(b=>b.setAttribute('aria-current',String(Number(b.dataset.chapter)===chapter)));
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
async function loadChapters(){
  try{
    const r=await fetch('./content.json',{cache:'no-store'});
    if(!r.ok)throw Error('Content '+r.status);
    chapters=(await r.json()).chapters;
    if(!Array.isArray(chapters)||chapters.length!==6)throw Error('Expected six chapters');
    chapter=Math.max(0,Math.min(Number(localStorage.getItem('jotrip.dmc.lastChapter')||0),5));
    const nav=q('#toc');nav.replaceChildren();
    chapters.forEach((c,i)=>{
      const b=document.createElement('button');b.type='button';b.dataset.chapter=String(i);
      b.textContent=String(i+1).padStart(2,'0')+' / '+c.title;
      b.addEventListener('click',()=>{renderChapter(i);nav.hidden=true;q('#tocToggle').setAttribute('aria-expanded','false');rustle()});
      nav.append(b);
    });
    renderChapter(chapter);
  }catch(e){console.error('Cannot load approved book content',e);text('#chapterTitle','Chưa tải được cuốn sách');}
}
void loadChapters();

/* A local draft cannot pretend to have been submitted. Email opens only after an explicit click. */
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
  const lines=['YOUR PHU QUOC JOURNEY - DRAFT 01','',
    'Tên: '+(f.name||'—'),'Người đi cùng: '+(f.companions||'—'),
    'Khi nào đến đảo: '+(f.when||'—'),'Nhịp nghỉ: '+(f.pace||'—'),
    'Điều cần chú ý: '+(f.care||'—'),'Liên hệ: '+(f.contact||'—')];
  result.replaceChildren();result.hidden=false;
  const title=document.createElement('strong');title.textContent='YOUR PHU QUOC JOURNEY - DRAFT 01';
  const note=document.createElement('p');note.textContent='Bản nháp chỉ được lưu trên thiết bị này. JoTrip chưa nhận được thông tin cho đến khi bạn chủ động gửi.';
  const pre=document.createElement('pre');pre.textContent=lines.join('\n');
  const send=document.createElement('a');send.href='mailto:hello@jotrip.vn?subject='+encodeURIComponent('Your Phu Quoc Journey - Draft 01')+'&body='+encodeURIComponent(lines.join('\n'));
  send.textContent='Mở email để gửi cho JoTrip ↗';
  result.append(title,note,pre,send);
});
