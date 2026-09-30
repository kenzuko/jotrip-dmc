/* JoTrip DMC V2 - one locale source, no baked visible interface copy. */
const q = s => document.querySelector(s);
const qa = s => [...document.querySelectorAll(s)];
const t = (code) => code.split('.').reduce((x,k) => x?.[k], locale) ?? code;
const localities = ['vi','en'];
let lang = 'vi',locale={},chapters=[],chapter=0,soundOn=false,lastFocus=null;
const dialogs={reader:q('#readerDialog'),note:q('#noteDialog'),memories:q('#memoriesDialog'),brief:q('#briefDialog')};
const menu=q('#mobileNav'),menuButton=q('#menuButton');
const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Sound is disabled by default and will not invent sounds while real, licensed assets are reviewed.
// A muted interface remains fully functional. Loader is separate from the core interaction engine.
const soundToggle=q('#soundToggle');
const media={ambient:null,page:null};
async function startSound(){
 if(!media.ambient){
  // No remote URL; activate only when reviewed licensed files are actually shipped.
  const maybe='./assets/sound/distant-sea.mp3';
  const exists=await fetch(maybe,{method:'HEAD'}).then(r=>r.ok).catch(()=>false);
  if(!exists)return false;
  media.ambient=new Audio(maybe);media.ambient.loop=true;media.ambient.preload='none';media.ambient.volume=0;
 }
 try{await media.ambient.play();let n=0;clearInterval(media.fade);media.fade=setInterval(()=>{n++;if(!media.ambient){clearInterval(media.fade);return}media.ambient.volume=Math.min(.09,n*.006);if(n>=15)clearInterval(media.fade)},100);return true}
 catch{return false}
}
function stopSound(){clearInterval(media.fade);if(!media.ambient)return;const a=media.ambient;let n=0;media.fade=setInterval(()=>{n++;a.volume=Math.max(0,a.volume-.01);if(a.volume===0||n>16){a.pause();clearInterval(media.fade)}},70)}
function rustle(){
 if(!soundOn)return;
 const sound=media.page;
 if(!sound)return;
 try{sound.currentTime=0;sound.volume=.11;void sound.play()}catch{}
}
soundToggle?.addEventListener('click',async()=>{
 if(soundOn){soundOn=false;stopSound()}
 else {
  const played=await startSound();
  if(!played){soundToggle.title=lang==='vi'?'Âm thanh thật đang được chuẩn bị':'Real ambient audio is being prepared';return}
  soundOn=true;
  if(!media.page){const r=await fetch('./assets/sound/page-turn.mp3',{method:'HEAD'}).catch(()=>null);if(r?.ok){media.page=new Audio('./assets/sound/page-turn.mp3');media.page.preload='none'}}
 }
 soundToggle?.setAttribute('aria-pressed',String(soundOn));soundToggle.textContent=t('footer.sound_'+(soundOn?'on':'off'));
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&soundOn)stopSound();else if(!document.hidden&&soundOn)void startSound()});

function setContent(query,value,mode){
 if(value==null)return;
 if(mode==='html'){const safe=String(value).replace(/<(?!\/?(?:br|em)\b)[^>]*>/gi,'');query.innerHTML=safe}
 else query.textContent=String(value);
}
async function setLocale(next,{save=true}={}){
 if(!localities.includes(next))next='vi';
 let pack;
 try{const r=await fetch(`./i18n/${next}.json`,{cache:'no-cache'});if(!r.ok)throw Error(r.status);pack=await r.json()}
 catch(e){console.warn('Locale unavailable',next,e);if(next!=='vi')return setLocale('vi',{save});return}
 lang=next;locale=pack;chapters=pack.chapters;
 document.documentElement.lang=next;
 document.documentElement.classList.toggle('is-en',next==='en');
 qa('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===next)));
 qa('[data-l10n]').forEach(el=>setContent(el,t(el.dataset.l10n)));
 qa('[data-l10n-html]').forEach(el=>setContent(el,t(el.dataset.l10nHtml),'html'));
 qa('[data-l10n-ph]').forEach(el=>el.placeholder=t(el.dataset.l10nPh));
 qa('[data-l10n-aria]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.l10nAria)));
 q('#seoDescription')?.setAttribute('content',next==='vi'?'JoTrip DMC tại Phú Quốc. Hành trình riêng bắt đầu từ điều bạn muốn cảm nhận trên đảo.':'JoTrip DMC in Phu Quoc. Personal journeys shaped around the moments that matter to you.');
 q('#soundToggle').textContent=soundToggle.disabled?t('footer.sound_soon'):t('footer.sound_'+(soundOn?'on':'off'));
 qa('.live-main-nav').forEach(el=>el.setAttribute('aria-label',next==='vi'?'Điều hướng chính':'Main navigation'));
 buildToc();renderChapter(chapter); // preserve page and open dialog when switching
 if(q('#briefResult')&&!q('#briefResult').hidden)renderDraft();
 if(save)try{localStorage.setItem('jotrip.dmc.locale',lang)}catch{}
}
qa('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>void setLocale(btn.dataset.lang)));
let cachedLang='vi';try{cachedLang=localStorage.getItem('jotrip.dmc.locale')||''}catch{}
const queryLang=new URLSearchParams(location.search).get('lang');
void setLocale(localities.includes(queryLang)?queryLang:localities.includes(cachedLang)?cachedLang:navigator.language?.toLowerCase().startsWith('vi')?'vi':'en',{save:false});

function show(d,source){
 if(!d)return;
 lastFocus=source||document.activeElement;
 if(!reduced&&source){d.style.setProperty('--entry-x',(source.dataset.open==='note'?'78%':source.dataset.open==='reader'?'44%':'55%'));}
 rustle();
 if(typeof d.showModal==='function'&&!d.open)d.showModal();else d.setAttribute('open','');
 d.querySelector('[data-close]')?.focus();
}
function hide(d){
 if(!d)return;rustle();if(typeof d.close==='function'&&d.open)d.close();else d.removeAttribute('open');
 lastFocus?.focus?.();
}
qa('[data-close]').forEach(b=>b.addEventListener('click',()=>hide(b.closest('dialog'))));
Object.values(dialogs).forEach(d=>d?.addEventListener('click',e=>{if(e.target===d)hide(d)}));
qa('[data-open]').forEach(el=>el.addEventListener('click',()=>{
 if(menu&&!menu.hidden){menu.hidden=true;menuButton?.setAttribute('aria-expanded','false')}
 const type=el.dataset.open;
 if(type==='toc'){show(dialogs.reader,el);q('#toc').hidden=false;q('#tocToggle').setAttribute('aria-expanded','true')}
 else if(type==='reader'){renderChapter(chapter);show(dialogs.reader,el)}
 else show(dialogs[type],el);
}));
menuButton?.addEventListener('click',()=>{menu.hidden=!menu.hidden;menuButton.setAttribute('aria-expanded',String(!menu.hidden));rustle()});
const mobileBook=q('.mobile-book-art');mobileBook?.addEventListener('click',()=>{renderChapter(chapter);show(dialogs.reader,mobileBook)});

function buildToc(){
 const nav=q('#toc');if(!nav||!chapters.length)return;
 nav.replaceChildren();chapters.forEach((c,i)=>{
  const b=document.createElement('button');b.type='button';b.dataset.chapter=String(i);
  b.textContent=String(i+1).padStart(2,'0')+' / '+c.title;
  b.addEventListener('click',()=>{renderChapter(i);nav.hidden=true;q('#tocToggle').setAttribute('aria-expanded','false');rustle()});nav.append(b);
 });
}
function renderChapter(i){
 if(!chapters.length)return;
 chapter=Math.max(0,Math.min(i,chapters.length-1));const c=chapters[chapter];
 for(const [id,value] of [['#chapterEyebrow',c.eyebrow],['#chapterTitle',c.title],['#chapterSubtitle',c.subtitle],['#chapterCaption',c.caption]])setContent(q(id),value||'');
 const body=q('#chapterBody');body.replaceChildren();(c.paragraphs||[]).forEach(p=>{const para=document.createElement('p');para.textContent=p;body.append(para)});
 const img=q('#chapterPhoto');img.src='./assets/'+encodeURIComponent(c.image);img.alt=c.alt||t('reader.photo');
 q('#chapterNumber').textContent=String(chapter+1).padStart(2,'0')+' / '+String(chapters.length).padStart(2,'0');
 q('#chapterPrev').disabled=chapter===0;q('#chapterNext').disabled=chapter===chapters.length-1;
 q('.reader-paper').scrollTop=0;
 qa('#toc button').forEach(b=>b.setAttribute('aria-current',String(+b.dataset.chapter===chapter)));
 try{localStorage.setItem('jotrip.dmc.lastChapter',String(chapter))}catch{}
}
function changeChapter(delta){const next=chapter+delta;if(next<0||next>=chapters.length)return;rustle();renderChapter(next)}
q('#chapterPrev')?.addEventListener('click',()=>changeChapter(-1));
q('#chapterNext')?.addEventListener('click',()=>changeChapter(1));
q('#tocToggle')?.addEventListener('click',()=>{const toc=q('#toc');toc.hidden=!toc.hidden;q('#tocToggle').setAttribute('aria-expanded',String(!toc.hidden));rustle()});
document.addEventListener('keydown',e=>{if(!dialogs.reader.open)return;if(e.key==='ArrowRight')changeChapter(1);if(e.key==='ArrowLeft')changeChapter(-1)});
let touchX=null;
q('.reader-spread')?.addEventListener('touchstart',e=>touchX=e.changedTouches[0].clientX,{passive:true});
q('.reader-spread')?.addEventListener('touchend',e=>{if(touchX==null)return;const delta=e.changedTouches[0].clientX-touchX;touchX=null;if(Math.abs(delta)>65)changeChapter(delta<0?1:-1)},{passive:true});
try{chapter=Math.max(0,Math.min(5,Number(localStorage.getItem('jotrip.dmc.lastChapter')||0)))}catch{}

// Tour inquiry: progressive detail fields, truthful local-only draft and explicit email send.
const form=q('#briefForm'),result=q('#briefResult');
try{const prev=JSON.parse(localStorage.getItem('jotrip.dmc.draft01')||'null');if(prev){Object.entries(prev).forEach(([key,val])=>{const el=form?.elements.namedItem(key);if(el)el.value=val})}}catch{}
const childrenSelect=q('#childrenSelect');
function syncChildren(){q('.children-ages').hidden=!childrenSelect?.value||childrenSelect?.value==='0'}
childrenSelect?.addEventListener('change',syncChildren);syncChildren();
form?.addEventListener('input',()=>{const fields=Object.fromEntries(new FormData(form).entries());try{localStorage.setItem('jotrip.dmc.draft01',JSON.stringify(fields))}catch{}});
let draftData=null;
function renderDraft(){if(!draftData)return;
 result.replaceChildren();result.hidden=false;
 const title=document.createElement('strong');title.textContent=t('brief.draft_title');
 const note=document.createElement('p');note.textContent=t('brief.draft_info');
 const lines=[t('brief.eyebrow'),''];
 for(const [name,label] of [['name','name'],['companions','companions'],['when','when'],['pace','pace'],['adults','adults'],['children','children'],['ages','ages'],['stay','stay'],['accommodation','accommodation'],['interests','interests'],['transport','transport'],['dining','dining'],['budget','budget'],['priority','priority'],['care','care'],['contact','contact'],['channel','channel']]){
  if(String(draftData[name]||'').trim())lines.push(t('brief.'+label)+': '+draftData[name]);
 }
 const pre=document.createElement('pre');pre.textContent=lines.join('\n');
 const send=document.createElement('a');send.href='mailto:hello@jotrip.vn?subject='+encodeURIComponent(t('brief.draft_title'))+'&body='+encodeURIComponent(lines.join('\n'));send.textContent=t('brief.send');
 result.append(title,note,pre,send);
}
form?.addEventListener('submit',e=>{
 e.preventDefault();rustle();draftData=Object.fromEntries(new FormData(form).entries());
 try{localStorage.setItem('jotrip.dmc.draft01',JSON.stringify(draftData))}catch{}
 renderDraft();result.scrollIntoView({behavior:reduced?'instant':'smooth',block:'nearest'});
});
// One gentle, optional invitation; never loops and never steals focus.
try{
 if(!reduced&&!sessionStorage.getItem('jotrip.dmc.hint-shown')){
  sessionStorage.setItem('jotrip.dmc.hint-shown','1');
  setTimeout(()=>{const scene=q('#scene');scene?.classList.add('show-intro-hint');setTimeout(()=>scene?.classList.remove('show-intro-hint'),3400)},2050);
 }
}catch{}
