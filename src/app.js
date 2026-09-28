const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let content,current=Number(localStorage.getItem('jotrip.chapter')||0),mobileIndex=0,lastFocus=null;
const root=$('#sheetRoot'),sheet=$('#storySheet'),reader=$('#reader');
const isMobile=()=>matchMedia('(max-width:700px)').matches;
const esc=(s='')=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

class RoomSound{
  constructor(){
    this.enabled=localStorage.getItem('jotrip.sound')==='on';
    this.files={
      page:'/assets/sfx-page-turn.mp3',
      paper:'/assets/sfx-paper-slide.mp3',
      pen:'/assets/sfx-pen-write.mp3',
      wind:'/assets/sfx-window-wind.mp3'
    };
    this.audio=new Map();
  }
  play(name,volume=.08){
    if(!this.enabled)return;
    let a=this.audio.get(name);
    if(!a){a=new Audio(this.files[name]);a.preload='auto';this.audio.set(name,a)}
    try{a.pause();a.currentTime=0;a.volume=volume;a.play().catch(()=>{})}catch{}
  }
  set(on){this.enabled=on;localStorage.setItem('jotrip.sound',on?'on':'off')}
}
const sounds=new RoomSound();

async function loadContent(){
  const base=await fetch('/content.json',{cache:'no-store'}).then(r=>r.json());
  try{const local=JSON.parse(localStorage.getItem('jotrip.content.override')||'null');content=local?deepMerge(base,local):base}catch{content=base}
  applyCopy();buildChapterMenu();renderChapter(current);mobileIndex=current*2;renderMobilePage();
  const sound=$('#soundToggle');sound.setAttribute('aria-pressed',String(sounds.enabled));sound.title=sounds.enabled?'Tắt âm thanh căn phòng':'Bật âm thanh căn phòng';
  if(isMobile()&&!localStorage.getItem('jotrip.hint.seen')){
    const h=$('#firstHint');h.hidden=false;setTimeout(()=>{h.hidden=true;localStorage.setItem('jotrip.hint.seen','1')},4200)
  }
}
function deepMerge(a,b){
  if(Array.isArray(a)||Array.isArray(b))return b??a;
  if(a&&typeof a==='object'&&b&&typeof b==='object'){const o={...a};for(const k of Object.keys(b))o[k]=k in a?deepMerge(a[k],b[k]):b[k];return o}
  return b??a
}
function applyCopy(){
  $('#roomEyebrow').textContent=content.room.eyebrow;
  $('#roomEntry').textContent=content.room.entry;
  $('#roomHint').textContent=content.room.hint;
  $('#islandLink').textContent=content.room.islandLink;
  $('#windowQuote').textContent=content.room.windowQuote;
}

$('#soundToggle').addEventListener('click',()=>{
  sounds.set(!sounds.enabled);
  $('#soundToggle').setAttribute('aria-pressed',String(sounds.enabled));
  $('#soundToggle').title=sounds.enabled?'Tắt âm thanh căn phòng':'Bật âm thanh căn phòng';
  if(sounds.enabled)sounds.play('paper',.035)
});
function closeMenu(){$('#menu').hidden=true;$('#menuToggle').setAttribute('aria-expanded','false')}
$('#menuToggle').addEventListener('click',()=>{
  const m=$('#menu');m.hidden=!m.hidden;$('#menuToggle').setAttribute('aria-expanded',String(!m.hidden));
  if(!m.hidden)sounds.play('paper',.045)
});
$$('[data-action]').forEach(el=>el.addEventListener('click',()=>{closeMenu();act(el.dataset.action)}));

function act(a){
  if(a==='book')return openBook();
  if(a==='welcome')return openSheet(welcomeMarkup(),'paper');
  if(a==='drink')return openSheet(drinkMarkup(),'paper');
  if(a==='memories')return openSheet(memoriesMarkup(),'paper',bindMemories);
  if(a==='jo')return openSheet(joMarkup(),'paper');
  if(a==='planner')return openSheet(plannerMarkup(),'paper',bindPlanner);
  if(a==='window')return toggleWindow();
}
function toggleWindow(){
  const room=$('#room'),opening=!room.classList.contains('window-open');
  room.classList.toggle('window-open',opening);$('#windowMoment').hidden=!opening;
  sounds.play('wind',opening?.045:.025);
}
function openSheet(markup,sound='paper',bind){
  lastFocus=document.activeElement;
  sheet.innerHTML=`<button class="close-sheet" type="button" aria-label="Đóng">×</button>${markup}`;
  root.hidden=false;sheet.querySelector('.close-sheet').addEventListener('click',closeSheet);
  if(bind)bind();sounds.play(sound,.055);sheet.querySelector('.close-sheet').focus()
}
function closeSheet(){root.hidden=true;sheet.innerHTML='';lastFocus?.focus?.()}
root.addEventListener('click',e=>{if(e.target.matches('[data-close]'))closeSheet()});

function welcomeMarkup(){return `
  <p class="kicker">A LETTER FROM PHÚ QUỐC</p>
  <div class="welcome-layout">
    <div class="welcome-paper"><h2>${esc(content.welcome.title)}</h2><p>${esc(content.welcome.body)}</p><small>${esc(content.welcome.sign)}</small></div>
    <img class="sheet-jo" src="/assets/jo-wave.webp" alt="Jo - người bạn đồng hành của JoTrip">
  </div>`}
function joMarkup(){return `
  <p class="kicker">HEY JO!</p>
  <div class="jo-layout">
    <div><h2>${esc(content.jo.title)}</h2><p>${esc(content.jo.body)}</p><p class="jo-line">${esc(content.jo.line)}</p></div>
    <img class="sheet-jo" src="/assets/jo-wave.webp" alt="Jo - người bạn đồng hành của JoTrip">
  </div>`}
function drinkMarkup(){return `<p class="kicker">THE WELCOME TABLE</p><h2>${esc(content.drink.title)}</h2><div class="drink-note"><div class="drink-glass" aria-hidden="true">◌</div><p>${esc(content.drink.body)}</p></div>`}
function memoriesMarkup(){return `
  <p class="kicker">REAL MOMENTS · JOTRIP ARCHIVE</p><h2>${esc(content.memories.title)}</h2><p>${esc(content.memories.intro)}</p>
  <div class="memory-grid">${content.memories.items.map((m,i)=>`<button class="memory-card" data-memory="${i}" type="button"><img src="/assets/${m.img}" alt="Ảnh tư liệu thực tế JoTrip" loading="lazy"><span>${esc(m.caption)}</span></button>`).join('')}</div>
  <div class="loose-notes">${(content.memories.notes||[]).map(n=>`<blockquote>${esc(n)}</blockquote>`).join('')}</div>`}
function bindMemories(){
  $$('[data-memory]').forEach(b=>b.addEventListener('click',()=>{
    const m=content.memories.items[Number(b.dataset.memory)];sounds.play('paper',.04);
    sheet.innerHTML=`<button class="close-sheet" type="button" aria-label="Đóng">×</button><p class="kicker">MỘT KÝ ỨC TRÊN BÀN</p><div class="memory-focus"><img src="/assets/${m.img}" alt="Ảnh tư liệu thực tế JoTrip"><div><h2>${esc(m.caption)}</h2><p>Ảnh thật trong kho tư liệu JoTrip tại Phú Quốc. Chúng tôi giữ câu chuyện ở mức vừa đủ để một khoảnh khắc thật không biến thành lời quảng cáo được dựng lại.</p><button class="secondary" id="backMemories" type="button">← Xem những tấm khác</button></div></div>`;
    sheet.querySelector('.close-sheet').addEventListener('click',closeSheet);
    $('#backMemories').addEventListener('click',()=>{sheet.innerHTML=`<button class="close-sheet" type="button" aria-label="Đóng">×</button>${memoriesMarkup()}`;sheet.querySelector('.close-sheet').addEventListener('click',closeSheet);bindMemories()})
  }))
}

function plannerMarkup(){return `
  <p class="kicker">JOTRIP DMC · TRAVEL BRIEF</p>
  <h2>${esc(content.planner.title)}</h2>
  <p class="planner-intro">${esc(content.planner.intro)}</p>
  <div class="planner-note">${esc(content.planner.note)}</div>
  <form class="planner-form" id="plannerForm">
    <section class="form-section" data-step="0"><h3>01 · Bạn sẽ đi cùng ai?</h3><div class="field-grid">
      <label class="field">Tên của bạn<input name="name" autocomplete="name"></label>
      <label class="field">Nhóm của bạn<select name="group"><option value="">Chọn nếu muốn</option><option>Hai người</option><option>Gia đình</option><option>Nhiều thế hệ</option><option>Nhóm bạn</option><option>Đoàn doanh nghiệp</option><option>Khác</option></select></label>
      <label class="field">Người lớn<input name="adults" type="number" min="1" inputmode="numeric" placeholder="2"></label>
      <label class="field">Trẻ em và độ tuổi<input name="children" placeholder="Ví dụ: 2 bé - 5 và 9 tuổi"></label>
    </div></section>
    <section class="form-section" data-step="1"><h3>02 · Khoảng thời gian nào bạn nghĩ đến Phú Quốc?</h3><div class="field-grid">
      <label class="field">Ngày / khoảng thời gian<input name="dates" placeholder="Ví dụ: 18-23/12"></label>
      <label class="field">Số đêm<input name="nights" type="number" min="1" inputmode="numeric"></label>
      <label class="field">Nơi ở dự kiến<input name="hotel" placeholder="Resort / khu vực / chưa chọn"></label>
      <label class="field">Tình trạng lưu trú<select name="hotelStatus"><option>Chưa đặt</option><option>Đã đặt</option><option>Muốn JoTrip cùng chọn</option></select></label>
    </div></section>
    <section class="form-section" data-step="2"><h3>03 · Bạn muốn những ngày ở đảo trôi qua thế nào?</h3><div class="checks">
      ${['Đi biển','Thư thả','Ẩm thực','Riêng tư','Gia đình & trẻ em','Hiểu Phú Quốc','Dịp đặc biệt','Nghỉ dưỡng','Câu cá','Chưa biết - hãy gợi ý'].map(x=>`<label class="check"><input type="checkbox" name="interest" value="${x}"><span>${x}</span></label>`).join('')}
    </div></section>
    <section class="form-section" data-step="3"><h3>04 · JoTrip nên chăm phần nào?</h3><div class="checks">
      ${['Đón sân bay','Xe riêng','Lưu trú','Trải nghiệm riêng','Ăn uống','Vé & show','Ngày biển','Điều phối cả kỳ nghỉ','Phương án khi thời tiết đổi'].map(x=>`<label class="check"><input type="checkbox" name="service" value="${x}"><span>${x}</span></label>`).join('')}
    </div></section>
    <section class="form-section" data-step="4"><h3>05 · Có điều gì chúng tôi nên biết để chăm bạn tốt hơn?</h3><div class="field-grid">
      <label class="field">Dịp đặc biệt<input name="occasion" placeholder="Sinh nhật, kỷ niệm, một dịp riêng..."></label>
      <label class="field">Nhịp kỳ nghỉ<select name="pace"><option>Thật chậm</option><option>Cân bằng</option><option>Khám phá nhiều</option><option>Chưa rõ</option></select></label>
      <label class="field" style="grid-column:1/-1">Điều JoTrip nên lưu ý<textarea name="careNotes" placeholder="Khả năng di chuyển, khẩu vị, điều cần tránh, người lớn tuổi, trẻ nhỏ, sở thích riêng..."></textarea></label>
    </div></section>
    <section class="form-section" data-step="5"><h3>06 · Để chúng tôi liên hệ lại</h3><div class="field-grid">
      <label class="field">Email / điện thoại / WhatsApp<input name="contact" required autocomplete="email"></label>
      <label class="field">Cách bạn muốn được liên hệ<select name="channel"><option>Email</option><option>WhatsApp</option><option>Điện thoại</option><option>Zalo</option></select></label>
    </div></section>
    <div class="planner-actions"><p>Bản nháp được lưu trên thiết bị này. Khi gửi, bạn sẽ được xem lại email trước khi quyết định gửi đi.</p><div><button class="secondary" type="button" id="saveDraft">Lưu bản nháp</button> <button class="primary" type="submit">Đặt tờ brief lên bàn ↗</button></div></div>
  </form>`}
function bindPlanner(){
  const form=$('#plannerForm'),saved=JSON.parse(localStorage.getItem('jotrip.brief')||'{}');
  for(const [k,v] of Object.entries(saved)){
    const el=form.elements[k];if(!el)continue;
    if(el instanceof RadioNodeList){[...el].forEach(x=>x.checked=(Array.isArray(v)?v:[v]).includes(x.value))}else el.value=v
  }
  $('#saveDraft').addEventListener('click',()=>{saveBrief(form);sounds.play('paper',.035);$('#saveDraft').textContent='Đã lưu trên máy'});
  if(isMobile())setupPlannerSteps(form);
  form.addEventListener('submit',e=>{
    e.preventDefault();if(!form.reportValidity())return;
    const data=saveBrief(form),summary=briefSummary(data);sounds.play('pen',.045);
    sheet.innerHTML=`<button class="close-sheet" type="button" aria-label="Đóng">×</button><p class="kicker">YOUR PHU QUOC JOURNEY · DRAFT 01</p><div class="journey-folder"><small>JOTRIP DMC · TRAVEL, MADE PERSONAL.</small><h3>Một bản nháp cho chuyến đi của bạn.</h3><pre>${esc(summary)}</pre><p>Chúng tôi chưa xem được bản nháp này cho đến khi bạn chủ động gửi email. Bạn có thể đọc lại trước khi gửi.</p><button class="primary" id="sendBrief" type="button">Mở email để gửi JoTrip ↗</button></div>`;
    sheet.querySelector('.close-sheet').addEventListener('click',closeSheet);
    $('#sendBrief').addEventListener('click',()=>location.href='mailto:phuquoclux@gmail.com?subject='+encodeURIComponent('JoTrip DMC - Phu Quoc Journey Draft 01')+'&body='+encodeURIComponent(summary))
  })
}
function setupPlannerSteps(form){
  form.classList.add('mobile-progress');
  const sections=[...form.querySelectorAll('.form-section')],actions=form.querySelector('.planner-actions');let step=0;
  const draw=()=>{
    sections.forEach((s,i)=>s.classList.toggle('active',i===step));
    actions.style.display=step===sections.length-1?'flex':'none';
    sections.forEach(s=>s.querySelector('.mobile-step-actions')?.remove());
    const nav=document.createElement('div');nav.className='mobile-step-actions';
    if(step>0){const prev=document.createElement('button');prev.type='button';prev.className='secondary';prev.textContent='← Trước';prev.onclick=()=>{step--;draw();sheet.scrollTo({top:0,behavior:'smooth'})};nav.append(prev)}
    const next=document.createElement('button');next.type='button';next.className='primary';next.textContent=step===sections.length-1?'Xem lại tờ brief ↗':'Tiếp →';
    next.onclick=()=>{if(step===sections.length-1){form.requestSubmit();return}step++;sounds.play('paper',.03);draw();sheet.scrollTo({top:0,behavior:'smooth'})};nav.append(next);
    sections[step].append(nav)
  };draw()
}
function saveBrief(form){const d=new FormData(form),o={};for(const [k,v] of d){if(o[k])o[k]=[].concat(o[k],v);else o[k]=v}localStorage.setItem('jotrip.brief',JSON.stringify(o));return o}
function briefSummary(d){
  const list=v=>Array.isArray(v)?v.join(', '):(v||'Chưa ghi');
  return ['Xin chào JoTrip DMC,','','Tôi muốn trao đổi về một chuyến đi tại Phú Quốc.','','Tên: '+list(d.name),'Đi cùng: '+list(d.group),'Số khách: '+list(d.adults)+' người lớn; '+list(d.children),'Thời gian: '+list(d.dates),'Số đêm: '+list(d.nights),'Lưu trú: '+list(d.hotel)+' - '+list(d.hotelStatus),'Quan tâm: '+list(d.interest),'Nhịp nghỉ: '+list(d.pace),'Dịch vụ muốn JoTrip hỗ trợ: '+list(d.service),'Dịp đặc biệt: '+list(d.occasion),'Điều JoTrip nên biết: '+list(d.careNotes),'Liên hệ: '+list(d.contact)+' - '+list(d.channel),'','Tôi chủ động gửi các thông tin trên để JoTrip hiểu nhu cầu và liên hệ tư vấn.'].join('\n')
}

/* BOOK */
function buildChapterMenu(){
  const nav=$('#chapterMenu');
  nav.innerHTML=content.chapters.map((c,i)=>`<button type="button" data-chapter="${i}">${String(i+1).padStart(2,'0')} · ${esc(c.title)}</button>`).join('');
  $$('[data-chapter]').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.chapter);current=n;mobileIndex=n*2;renderChapter(n);renderMobilePage();nav.hidden=true;sounds.play('page',.055)}))
}
function openBook(){
  lastFocus=document.activeElement;reader.hidden=false;current=Math.max(0,Math.min(current,content.chapters.length-1));mobileIndex=current*2;
  renderChapter(current);renderMobilePage();sounds.play('page',.06);$('#readerClose').focus()
}
function closeBook(){reader.hidden=true;localStorage.setItem('jotrip.chapter',String(current));lastFocus?.focus?.()}
$('#readerClose').addEventListener('click',closeBook);
$('#chapterMenuToggle').addEventListener('click',()=>$('#chapterMenu').hidden=!$('#chapterMenu').hidden);

function emphasizeTitle(s=''){
  const bits=['Phú Quốc','không chiều lòng người','phía sau','chọn','của bạn'];
  let out=esc(s);for(const b of bits){const e=esc(b);out=out.replace(e,`<em>${e}</em>`)}return out
}
function renderChapter(n){
  if(!content)return;current=Math.max(0,Math.min(n,content.chapters.length-1));const c=content.chapters[current];
  $('#chapterNo').textContent='CHƯƠNG '+String(current+1).padStart(2,'0');$('#chapterOrigin').textContent=c.origin;
  $('#chapterTitle').innerHTML=emphasizeTitle(c.title);$('#chapterSub').textContent=c.sub;$('#chapterBody').textContent=c.body;
  $('#chapterImage').src='/assets/'+c.img+'-1600.webp';$('#chapterImage').alt=c.caption;$('#chapterCaption').textContent=c.caption;
  const note=$('#joNote');if(c.joNote){note.hidden=false;note.querySelector('p').textContent=c.joNote}else note.hidden=true;
  const caps=$('#capabilityStrip');if(c.capabilities?.length){caps.hidden=false;caps.innerHTML=c.capabilities.map(x=>`<span>${esc(x)}</span>`).join('')}else{caps.hidden=true;caps.innerHTML=''}
  $('#chapterCount').textContent=String(current+1).padStart(2,'0')+' / '+String(content.chapters.length).padStart(2,'0');
  $('#prevChapter').disabled=current===0;$('#nextChapter').disabled=current===content.chapters.length-1;
  $('#chapterNextStory').textContent=current===content.chapters.length-1?'Đến lượt chúng tôi hiểu bạn ↗':'Đọc chương tiếp →'
}
let switching=false;
function switchChapter(n){
  if(switching||n<0||n>=content.chapters.length||n===current)return;
  if(isMobile()){current=n;mobileIndex=n*2;renderChapter(n);renderMobilePage();sounds.play('page',.05);return}
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){renderChapter(n);sounds.play('page',.05);return}
  switching=true;const t=$('#turnSheet');t.classList.remove('turning');void t.offsetWidth;t.classList.add('turning');sounds.play('page',.06);
  setTimeout(()=>renderChapter(n),330);setTimeout(()=>{t.classList.remove('turning');switching=false},790)
}
$('#prevChapter').addEventListener('click',()=>switchChapter(current-1));
$('#nextChapter').addEventListener('click',()=>switchChapter(current+1));
$('#chapterNextStory').addEventListener('click',()=>{if(current===content.chapters.length-1){closeBook();setTimeout(()=>act('planner'),100)}else switchChapter(current+1)});

function renderMobilePage(){
  if(!content)return;
  const total=content.chapters.length*2;mobileIndex=Math.max(0,Math.min(mobileIndex,total-1));current=Math.floor(mobileIndex/2);
  const c=content.chapters[current],isPhoto=mobileIndex%2===1,p=$('#mobilePage');
  if(isPhoto){
    p.className='mobile-page photo-page';
    p.innerHTML=`<img src="/assets/${c.img}-1600.webp" alt="${esc(c.caption)}"><span class="m-caption">${esc(c.caption)}</span>`
  }else{
    p.className='mobile-page';
    p.innerHTML=`<span class="m-kicker">CHƯƠNG ${String(current+1).padStart(2,'0')} · ${esc(c.origin)}</span><h1>${emphasizeTitle(c.title)}</h1><h2>${esc(c.sub)}</h2><p class="m-body">${esc(c.body)}</p>${c.joNote?`<aside class="m-note"><b>JO'S NOTE</b><br>${esc(c.joNote)}</aside>`:''}${c.capabilities?.length?`<div class="m-capabilities">${c.capabilities.map(x=>`<span>${esc(x)}</span>`).join('')}</div>`:''}`
  }
  $('#mobilePageCount').textContent=String(mobileIndex+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
  $('#mobilePrev').disabled=mobileIndex===0;$('#mobileNext').disabled=mobileIndex===total-1;localStorage.setItem('jotrip.chapter',String(current))
}
function mobileTurn(delta){
  const next=mobileIndex+delta,total=content.chapters.length*2;if(next<0||next>=total)return;
  mobileIndex=next;sounds.play('page',.05);renderMobilePage()
}
$('#mobilePrev').addEventListener('click',()=>mobileTurn(-1));$('#mobileNext').addEventListener('click',()=>mobileTurn(1));
let sx=0;$('#mobileBookStage').addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});$('#mobileBookStage').addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>55)mobileTurn(dx<0?1:-1)},{passive:true});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){if(!root.hidden)closeSheet();else if(!reader.hidden)closeBook();else closeMenu();return}
  if(!reader.hidden&&!e.target.matches('input,textarea,select')){if(e.key==='ArrowRight')isMobile()?mobileTurn(1):switchChapter(current+1);if(e.key==='ArrowLeft')isMobile()?mobileTurn(-1):switchChapter(current-1)}
});
addEventListener('resize',()=>{if(!reader.hidden){renderChapter(current);renderMobilePage()}});

loadContent();
