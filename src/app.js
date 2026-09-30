const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let content=null, current=0, soundOn=localStorage.getItem('jotrip.dmc.sound')==='on', audio=null;

async function load(){
  try{content=await fetch('./content.json',{cache:'no-store'}).then(r=>r.json())}catch{content={chapters:[]}}
  buildReaderMenu();
  renderChapter(0);
}
function ensureAudio(){
  if(!soundOn)return null;
  if(!audio)audio=new (window.AudioContext||window.webkitAudioContext)();
  if(audio.state==='suspended')audio.resume();
  return audio;
}
function rustle(){
  const a=ensureAudio(); if(!a)return;
  const n=Math.max(1,Math.floor(a.sampleRate*.12)),b=a.createBuffer(1,n,a.sampleRate),d=b.getChannelData(0);
  for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);
  const s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();
  s.buffer=b;f.type='lowpass';f.frequency.value=1800;g.gain.value=.035;
  s.connect(f);f.connect(g);g.connect(a.destination);s.start();
}
const soundToggle=$('#soundToggle');
soundToggle?.setAttribute('aria-pressed',String(soundOn));
soundToggle?.addEventListener('click',()=>{
  soundOn=!soundOn;localStorage.setItem('jotrip.dmc.sound',soundOn?'on':'off');
  soundToggle.setAttribute('aria-pressed',String(soundOn));soundToggle.textContent=soundOn?'♫':'♪';
  if(soundOn)rustle();
});

function openDialog(el){ if(!el)return; rustle(); if(typeof el.showModal==='function')el.showModal(); else el.setAttribute('open','') }
function closeDialog(el){ if(!el)return; rustle(); if(typeof el.close==='function')el.close(); else el.removeAttribute('open') }
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>closeDialog(b.closest('dialog'))));
$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d)closeDialog(d)}));

const noteDialog=$('#noteDialog'),reader=$('#readerDialog'),brief=$('#briefDialog');
$$('[data-open-note]').forEach(b=>b.addEventListener('click',()=>openDialog(noteDialog)));
$$('[data-open-reader]').forEach(b=>b.addEventListener('click',()=>{openDialog(reader);renderChapter(current)}));
$$('[data-open-brief]').forEach(b=>b.addEventListener('click',()=>openDialog(brief)));

const menuToggle=$('#menuToggle'),mobileMenu=$('#mobileMenu');
menuToggle?.addEventListener('click',()=>{
  const open=mobileMenu.hidden;mobileMenu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));rustle();
});
mobileMenu?.querySelectorAll('a,button').forEach(x=>x.addEventListener('click',()=>{mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false')}));

function asset(name){return './assets/'+name}
function buildReaderMenu(){
  const menu=$('#readerMenu'); if(!menu||!content?.chapters)return;
  menu.innerHTML=content.chapters.map((c,i)=>`<button type="button" data-chapter="${i}">${String(i+1).padStart(2,'0')} · ${escapeHtml(c.title)}</button>`).join('');
  menu.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{goChapter(Number(b.dataset.chapter));menu.hidden=true}));
}
$('#readerToc')?.addEventListener('click',()=>{const m=$('#readerMenu');m.hidden=!m.hidden;rustle()});
function renderChapter(i){
  const chapters=content?.chapters||[]; if(!chapters.length)return;
  current=Math.max(0,Math.min(i,chapters.length-1)); const c=chapters[current];
  $('#chapterOrigin').textContent=c.origin||'';
  $('#chapterTitle').textContent=c.title||'';
  $('#chapterSub').textContent=c.sub||'';
  $('#chapterBody').textContent=c.body||'';
  $('#chapterCount').textContent=`${String(current+1).padStart(2,'0')} / ${String(chapters.length).padStart(2,'0')}`;
  const img=$('#chapterImage'); img.src=asset(c.img); img.alt=c.alt||'Ảnh tư liệu thật của JoTrip';
  $('#chapterCaption').textContent=c.caption||'ẢNH TƯ LIỆU JOTRIP';
  $('#prevChapter').disabled=current===0; $('#nextChapter').disabled=current===chapters.length-1;
  localStorage.setItem('jotrip.dmc.chapter',String(current));
}
function goChapter(i){if(i===current)return;rustle();setTimeout(()=>renderChapter(i),90)}
$('#prevChapter')?.addEventListener('click',()=>goChapter(current-1));
$('#nextChapter')?.addEventListener('click',()=>goChapter(current+1));
document.addEventListener('keydown',e=>{
  if(reader?.open){if(e.key==='ArrowRight')goChapter(current+1);if(e.key==='ArrowLeft')goChapter(current-1);if(e.key==='Escape')closeDialog(reader)}
});
let touchX=0;
reader?.addEventListener('touchstart',e=>touchX=e.changedTouches[0].clientX,{passive:true});
reader?.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-touchX;if(Math.abs(d)>55)goChapter(current+(d<0?1:-1))},{passive:true});
$$('[data-memory]').forEach((b,i)=>b.addEventListener('click',()=>{current=Math.min(i+1,(content?.chapters?.length||1)-1);openDialog(reader);renderChapter(current)}));

$('#briefForm')?.addEventListener('submit',e=>{
  e.preventDefault(); const data=Object.fromEntries(new FormData(e.currentTarget).entries());
  localStorage.setItem('jotrip.dmc.brief',JSON.stringify(data));
  const lines=[
    'YOUR PHU QUOC JOURNEY - DRAFT 01','',
    `Tên: ${data.name||'—'}`,`Người đi cùng: ${data.group||'—'}`,`Thời gian: ${data.dates||'—'}`,
    `Nhịp nghỉ: ${data.pace||'—'}`,`Điều cần lưu ý: ${data.care||'—'}`,`Liên hệ: ${data.contact||'—'}`
  ];
  const box=$('#draftResult'); box.hidden=false;
  box.innerHTML=`<strong>YOUR PHU QUOC JOURNEY - DRAFT 01</strong><p>Bản nháp này vẫn đang ở trên thiết bị của bạn. Chỉ khi bạn chủ động gửi thì JoTrip mới nhận được.</p><pre>${escapeHtml(lines.join('\n'))}</pre><a href="mailto:hello@jotrip.vn?subject=Your%20Phu%20Quoc%20Journey%20-%20Draft%2001&body=${encodeURIComponent(lines.join('\n'))}">Mở email để gửi cho JoTrip →</a>`;
  rustle();
});

function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
current=Number(localStorage.getItem('jotrip.dmc.chapter')||0);
load();
