import {getLanguage,setLanguagePreference,translateStaticText,t,getDynamicCopy} from './i18n.js';

const page = document.body.dataset.page || 'home';
const lang = getLanguage();
const copy = getDynamicCopy(lang);
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const headerMount = document.querySelector('[data-site-header]');
const footerMount = document.querySelector('[data-site-footer]');
const drawerMount = document.querySelector('[data-journey-drawer]');

const navItems = [
  ['experiences','/experiences/',t(lang,'experiences')],
  ['phu-quoc','/phu-quoc/',t(lang,'phuQuoc')],
  ['journal','/journal/',t(lang,'fieldNotes')],
  ['partners','/partners/',t(lang,'partners')],
  ['about','/about/',t(lang,'about')]
];

const renderShell = () => {
  if (headerMount) {
    headerMount.innerHTML = `
      <header class="site-header" id="siteHeader">
        <a class="brand" href="/" aria-label="JoTrip DMC home">
          <img src="/assets/jotrip-wordmark.png" alt="JoTrip">
          <span class="brand-dmc">DMC</span>
          <small>PHU QUOC · VIETNAM</small>
        </a>
        <nav class="desktop-nav" aria-label="Primary navigation">
          ${navItems.map(([key,href,label])=>`<a class="${page===key?'is-active':''}" href="${href}">${label}</a>`).join('')}
        </nav>
        <div class="header-end">
          <a class="island-link" href="https://openphuquoc.com/" target="_blank" rel="noopener">${t(lang,'openPQ')}</a>
          <div class="lang-switch" aria-label="Language"><button type="button" data-lang="en" class="${lang==='en'?'is-active':''}">EN</button><span>/</span><button type="button" data-lang="vi" class="${lang==='vi'?'is-active':''}">VI</button></div>
          <button class="journey-head" type="button" data-journey-open>${t(lang,'startJourney')}</button>
          <button class="menu-toggle" id="menuToggle" type="button" aria-expanded="false" aria-controls="mobileNav" aria-label="Open navigation"><span></span><span></span></button>
        </div>
      </header>
      <nav class="mobile-nav" id="mobileNav" hidden aria-label="Mobile navigation">
        <a class="mobile-home" href="/">${t(lang,'home')}</a>
        ${navItems.map(([key,href,label])=>`<a class="${page===key?'is-active':''}" href="${href}">${label}</a>`).join('')}
        <div class="mobile-lang"><button type="button" data-lang="en" class="${lang==='en'?'is-active':''}">English</button><button type="button" data-lang="vi" class="${lang==='vi'?'is-active':''}">Tiếng Việt</button></div>
        <button type="button" data-journey-open>${t(lang,'startJourney')} <span>→</span></button>
        <a class="mobile-openpq" href="https://openphuquoc.com/" target="_blank" rel="noopener">${t(lang,'openPhuQuoc')}</a>
      </nav>`;
  }

  if (footerMount) {
    footerMount.innerHTML = `
      <footer class="site-footer">
        <div class="footer-brand">
          <a href="/" class="footer-mark"><img src="/assets/jotrip-wordmark.png" alt="JoTrip"><span>DMC</span></a>
          <p>${lang==='vi'?'Phú Quốc, từ bên trong.':'Phu Quoc, from the inside.'}</p>
        </div>
        <nav class="footer-nav" aria-label="Footer navigation">
          ${navItems.map(([,href,label])=>`<a href="${href}">${label}</a>`).join('')}
          <button type="button" data-journey-open>${t(lang,'journeyPaper')}</button>
        </nav>
        <div class="footer-meta">
          <a href="https://openphuquoc.com/" target="_blank" rel="noopener">${t(lang,'openPhuQuoc')}</a>
          <span>${t(lang,'travelPersonal')}</span>
          <small>© <span data-year></span> JoTrip DMC · Phu Quoc, Vietnam</small>
          <small class="photo-credit">${t(lang,'photoCredit')}</small>
        </div>
      </footer>`;
  }

  if (drawerMount) {
    drawerMount.innerHTML = `
      <section class="journey-drawer" id="journeyDrawer" hidden aria-label="Journey paper">
        <button class="drawer-shade" type="button" data-journey-close aria-label="${t(lang,'close')}"></button>
        <aside class="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="journeyTitle">
          <header class="drawer-head"><div><span>JOTRIP DMC</span><small>JOURNEY PAPER · PHU QUOC</small></div><button type="button" data-journey-close aria-label="${t(lang,'close')}">×</button></header>
          <div class="drawer-intro"><p class="micro ink">${t(lang,'journeyEyebrow')}</p><h2 id="journeyTitle">${t(lang,'journeyTitle')}</h2><p>${t(lang,'journeyIntro')}</p></div>
          <form class="drawer-form" id="journeyForm">
            <div class="field-pair"><label>${t(lang,'when')}<input name="when" autocomplete="off" placeholder="${t(lang,'phWhen')}"></label><label>${t(lang,'who')}<input name="with" autocomplete="off" placeholder="${t(lang,'phWho')}"></label></div>
            <label>${t(lang,'stay')}<input name="stay" autocomplete="off" placeholder="${t(lang,'phStay')}"></label>
            <label>${t(lang,'more')}<input name="experience" autocomplete="off" placeholder="${t(lang,'phMore')}"></label>
            <label>${t(lang,'avoid')}<input name="avoid" autocomplete="off" placeholder="${t(lang,'phAvoid')}"></label>
            <label>${t(lang,'yours')}<textarea name="yours" rows="4" placeholder="${t(lang,'phYours')}"></textarea></label>
            <button class="drawer-review-btn" type="submit">${t(lang,'review')} <span>→</span></button>
            <p class="drawer-note">${t(lang,'preview')}</p>
            <pre class="journey-review" id="journeyReview" hidden aria-live="polite"></pre>
          </form>
        </aside>
      </section>`;
  }
};
renderShell();

const main = document.querySelector('main');
if (main) translateStaticText(main,lang);
document.title = lang==='vi' ? ({home:'JoTrip DMC · Phú Quốc, từ bên trong',experiences:'Trải nghiệm · JoTrip DMC','phu-quoc':'Phú Quốc · JoTrip DMC',partners:'Đối tác lữ hành · JoTrip DMC',journal:'Ghi chép đảo · JoTrip DMC',about:'Về JoTrip · JoTrip DMC'}[page] || 'JoTrip DMC') : document.title;

const depthData = {
  experiences:{
    en:{eyebrow:'HOW WE DECIDE',title:'The experience is only half the design.',intro:'The other half is deciding when, for whom and under which conditions it makes sense.',items:[['WHO','Who is actually travelling?','Children, grandparents, experienced anglers, first-time swimmers and couples do not need the same day.'],['CONDITIONS','What does the island allow today?','Sea, heat, rain, transfer time and operating reality are part of the experience, not footnotes.'],['PACE','How much is enough?','We would rather leave one good hour empty than add a weak stop simply because there is space.'],['MEMORY','What should remain afterwards?','The best day is not always the fullest one. It is the one the group still talks about for the right reason.']]},
    vi:{eyebrow:'CÁCH JOTRIP QUYẾT ĐỊNH',title:'Trải nghiệm chỉ là một nửa của thiết kế.',intro:'Nửa còn lại là quyết định khi nào nên làm, hợp với ai và trong điều kiện nào.',items:[['AI ĐI','Ai thật sự đang đi cùng?','Trẻ nhỏ, ông bà, người câu cá có kinh nghiệm, người mới xuống nước và cặp đôi không cần cùng một ngày giống nhau.'],['ĐIỀU KIỆN','Hôm nay hòn đảo cho phép điều gì?','Biển, nóng, mưa, thời gian di chuyển và thực tế vận hành là một phần của trải nghiệm, không phải ghi chú phụ.'],['NHỊP','Bao nhiêu là đủ?','JoTrip thà chừa một giờ thật đẹp còn hơn thêm một điểm yếu chỉ vì lịch còn chỗ.'],['KÝ ỨC','Điều gì nên ở lại sau chuyến đi?','Ngày hay nhất không phải lúc nào cũng là ngày dày nhất. Đó là ngày cả nhóm còn nhắc lại vì đúng lý do.']]}
  },
  'phu-quoc':{
    en:{eyebrow:'FOUR LENSES',title:'The island changes depending on how you read it.',intro:'A good Phu Quoc plan starts with context, not a pin-filled map.',items:[['STAY','Where are you waking up?','North, central and south change transfer logic, morning options and how much of the island is sensible in one day.'],['TIME','What part of the day matters?','Morning sea, midday heat and evening town life each ask for a different pace.'],['CONDITIONS','What is the island doing today?','Weather and sea can turn the same route into two completely different experiences.'],['PEOPLE','Who is doing the travelling?','A family, couple, fishing group or resort-led holiday reads distance and value differently.']]},
    vi:{eyebrow:'BỐN LĂNG KÍNH',title:'Hòn đảo thay đổi tùy cách mình đọc nó.',intro:'Một kế hoạch Phú Quốc tốt bắt đầu từ bối cảnh, không phải bản đồ đầy ghim.',items:[['NƠI Ở','Bạn thức dậy ở đâu?','Bắc, trung tâm và nam đảo làm thay đổi logic di chuyển, lựa chọn buổi sáng và khoảng đảo hợp lý trong một ngày.'],['THỜI ĐIỂM','Phần nào của ngày là quan trọng?','Biển buổi sáng, cái nóng giữa trưa và nhịp thị trấn buổi tối cần những tốc độ khác nhau.'],['ĐIỀU KIỆN','Hôm nay hòn đảo đang như thế nào?','Thời tiết và biển có thể biến cùng một tuyến thành hai trải nghiệm hoàn toàn khác.'],['CON NGƯỜI','Ai đang đi?','Gia đình, cặp đôi, nhóm câu cá hay kỳ nghỉ thiên resort sẽ đọc khoảng cách và giá trị rất khác nhau.']]}
  },
  partners:{
    en:{eyebrow:'A USEFUL BRIEF',title:'The better the context, the quieter the operation.',intro:'We do not need a hundred fields. We need the details that change decisions on the ground.',items:[['GUEST','Who are they?','Age mix, travel style, previous Vietnam experience and what usually makes them comfortable.'],['PRIORITY','What matters most?','A great resort, a serious fishing day, family time, food or simply a trip that does not feel over-managed.'],['BOUNDARIES','What should we not do?','Knowing what a client dislikes is often more useful than adding another preference.'],['RESPONSIBILITY','Who owns which decision?','Clear commercial and operating boundaries let both sides move quickly when the island changes.']]},
    vi:{eyebrow:'MỘT BRIEF HỮU ÍCH',title:'Bối cảnh càng rõ, vận hành càng nhẹ.',intro:'JoTrip không cần một trăm ô thông tin. Tụi mình cần những chi tiết thật sự làm thay đổi quyết định tại điểm đến.',items:[['KHÁCH','Họ là ai?','Độ tuổi, kiểu du lịch, kinh nghiệm Việt Nam trước đây và điều gì thường khiến họ thấy thoải mái.'],['ƯU TIÊN','Điều gì quan trọng nhất?','Một resort thật tốt, một ngày câu cá nghiêm túc, thời gian gia đình, ẩm thực hay đơn giản là chuyến đi không bị quản quá chặt.'],['RANH GIỚI','Điều gì không nên làm?','Biết khách không thích gì nhiều khi hữu ích hơn thêm một sở thích nữa.'],['TRÁCH NHIỆM','Ai quyết định phần nào?','Ranh giới thương mại và vận hành rõ giúp hai bên phản ứng nhanh khi hòn đảo thay đổi.']]}
  },
  journal:{
    en:{eyebrow:'MORE FROM THE FIELD',title:'Small observations change big itineraries.',intro:'A DMC gets better when it remembers what actually happened, not only what was supposed to happen.',items:[['RAIN','Rain is not one thing.','A short tropical shower, a slow wet morning and a marine system should not create the same response.'],['TRANSFER','Distance is emotional too.','Forty minutes after a long-haul flight feels different from forty minutes after breakfast.'],['FOOD','Taste needs context.','The best local table is the one that fits the people, timing and appetite in front of it.'],['HOST','The human layer matters.','The same place can feel flat or memorable depending on who introduces it.']]},
    vi:{eyebrow:'THÊM GHI CHÉP TỪ THỰC ĐỊA',title:'Quan sát nhỏ có thể đổi cả lịch trình lớn.',intro:'Một DMC làm tốt hơn khi nhớ điều thật sự đã xảy ra, không chỉ điều đáng lẽ phải xảy ra.',items:[['MƯA','Mưa không chỉ có một kiểu.','Một cơn mưa nhiệt đới ngắn, một buổi sáng ẩm kéo dài và một hệ thống biển không thể được xử lý giống nhau.'],['DI CHUYỂN','Khoảng cách cũng là cảm xúc.','Bốn mươi phút sau chuyến bay dài khác hoàn toàn bốn mươi phút sau bữa sáng.'],['ẨM THỰC','Khẩu vị cần bối cảnh.','Bàn ăn địa phương tốt nhất là bàn hợp với người, thời điểm và cơn đói đang ở trước mặt.'],['HOST','Lớp con người rất quan trọng.','Cùng một nơi có thể nhạt hoặc đáng nhớ tùy người giới thiệu nó.']]}
  },
  about:{
    en:{eyebrow:'OUR STANDARD',title:'Local knowledge is only useful when it becomes responsibility.',intro:'What JoTrip protects is not a style of itinerary. It is the quality of judgement behind the journey.',items:[['TRUTH','Say what is actually true.','If weather, sea or an operating detail is unclear, uncertainty is better than invented confidence.'],['OWNERSHIP','Keep a name on the problem.','Guests and partners should know who is holding the next decision.'],['EDITING','Remove before adding.','More activities do not automatically make a richer journey.'],['MEMORY','Carry context forward.','Preferences, small incidents and what we learn about a guest should not reset at every handover.']]},
    vi:{eyebrow:'TIÊU CHUẨN CỦA JOTRIP',title:'Kiến thức bản địa chỉ có giá trị khi nó trở thành trách nhiệm.',intro:'Điều JoTrip bảo vệ không phải một phong cách lịch trình. Đó là chất lượng phán đoán phía sau hành trình.',items:[['SỰ THẬT','Nói đúng điều đang thật sự xảy ra.','Nếu thời tiết, biển hay một chi tiết vận hành chưa rõ, thừa nhận chưa chắc vẫn tốt hơn tạo sự tự tin giả.'],['TRÁCH NHIỆM','Luôn có tên người giữ vấn đề.','Khách và đối tác phải biết ai đang giữ quyết định tiếp theo.'],['BIÊN TẬP','Bớt trước khi thêm.','Nhiều hoạt động hơn không tự động tạo ra hành trình giàu hơn.'],['GHI NHỚ','Giữ bối cảnh xuyên suốt.','Sở thích, sự cố nhỏ và những gì đã hiểu về khách không nên bị reset sau mỗi lần bàn giao.']]}
  }
};

const continuationData = {
  experiences:[['phu-quoc','/phu-quoc/','Read the island','Đọc hòn đảo'],['journal','/journal/','Field notes','Ghi chép đảo'],['partners','/partners/','Partner desk','Bàn đối tác']],
  'phu-quoc':[['experiences','/experiences/','Shape an experience','Định hình trải nghiệm'],['journal','/journal/','Read field notes','Đọc ghi chép'],['about','/about/','Who is JoTrip?','JoTrip là ai?']],
  partners:[['about','/about/','How JoTrip works','Cách JoTrip làm nghề'],['experiences','/experiences/','Experience logic','Logic trải nghiệm'],['phu-quoc','/phu-quoc/','Read Phu Quoc','Đọc Phú Quốc']],
  journal:[['phu-quoc','/phu-quoc/','Read the island','Đọc hòn đảo'],['experiences','/experiences/','Turn notes into a journey','Biến ghi chép thành hành trình'],['about','/about/','Our point of view','Góc nhìn JoTrip']],
  about:[['experiences','/experiences/','See how it becomes a journey','Xem nó thành hành trình ra sao'],['partners','/partners/','Work with JoTrip','Làm việc cùng JoTrip'],['journal','/journal/','Read the field notes','Đọc ghi chép thực địa']]
};

const renderDepth = () => {
  if (!main || !depthData[page]) return;
  const source = depthData[page][lang];
  const end = main.querySelector('.page-end');
  if (!end || !source) return;
  const section = document.createElement('section');
  section.className='page-depth auto-reveal';
  section.innerHTML=`<div class="page-depth-head"><p class="micro ink">${source.eyebrow}</p><h2>${source.title}</h2><p>${source.intro}</p></div><div class="page-depth-grid">${source.items.map(([label,title,body],i)=>`<article style="--stagger:${i}"><span>${String(i+1).padStart(2,'0')} · ${label}</span><h3>${title}</h3><p>${body}</p></article>`).join('')}</div>`;
  end.before(section);

  const links=continuationData[page];
  if(links){
    const cont=document.createElement('section');
    cont.className='site-continuation auto-reveal';
    cont.innerHTML=`<div class="continuation-head"><span>${lang==='vi'?'TIẾP TỤC KHÁM PHÁ':'KEEP EXPLORING'}</span><h2>${lang==='vi'?'Đừng để câu chuyện dừng ở cuối trang.':'Do not let the story stop at the end of a page.'}</h2></div><div class="continuation-links">${links.map(([key,href,en,vi],i)=>`<a href="${href}" style="--stagger:${i}"><span>0${i+1}</span><b>${lang==='vi'?vi:en}</b><i>↗</i></a>`).join('')}</div>`;
    end.before(cont);
  }
};
renderDepth();

if (page==='home' && main) {
  const trade=main.querySelector('.trade-band');
  if(trade){
    const pulse=document.createElement('section');
    pulse.className='home-pulse auto-reveal';
    pulse.innerHTML=lang==='vi'
      ? `<div><span>JOTRIP · NHỊP ĐẢO</span><h2>Không phải mọi ngày ở Phú Quốc đều nên giống nhau.</h2></div><div class="pulse-grid"><article><b>01</b><h3>Đọc điều kiện.</h3><p>Biển, thời tiết và giờ thật trước khi khóa một ngày.</p></article><article><b>02</b><h3>Đọc con người.</h3><p>Nhịp của khách quan trọng hơn mật độ hoạt động.</p></article><article><b>03</b><h3>Đọc khoảng trống.</h3><p>Đôi khi phần không lên lịch mới là thứ làm chuyến đi đáng nhớ.</p></article></div>`
      : `<div><span>JOTRIP · ISLAND RHYTHM</span><h2>Not every day in Phu Quoc should behave the same way.</h2></div><div class="pulse-grid"><article><b>01</b><h3>Read conditions.</h3><p>Sea, weather and real timing before locking the day.</p></article><article><b>02</b><h3>Read the people.</h3><p>The guest's rhythm matters more than activity density.</p></article><article><b>03</b><h3>Read the empty space.</h3><p>Sometimes the part not scheduled is what makes the trip memorable.</p></article></div>`;
    trade.before(pulse);
  }
}

document.body.insertAdjacentHTML('afterbegin','<div class="reading-progress" aria-hidden="true"><i></i></div>');
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click',()=>{ const next=button.dataset.lang==='vi'?'vi':'en'; if(next===lang)return; setLanguagePreference(next); location.reload(); }));

const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const drawer = document.getElementById('journeyDrawer');
const drawerPanel = drawer?.querySelector('.drawer-panel');
const progress = document.querySelector('.reading-progress i');

const setMenu = open => {
  if (!menuToggle || !mobileNav) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileNav.hidden = !open;
  document.body.classList.toggle('menu-open', open);
};
menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

let drawerReturnFocus = null;
const setDrawer = (open, trigger = null) => {
  if (!drawer) return;
  if (open) {
    drawerReturnFocus = trigger || document.activeElement;
    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add('is-open'));
    document.body.classList.add('drawer-open');
    drawerPanel?.querySelector('input, textarea, button')?.focus();
  } else {
    drawer.classList.remove('is-open');
    document.body.classList.remove('drawer-open');
    window.setTimeout(() => { drawer.hidden = true; drawerReturnFocus?.focus?.(); }, 260);
  }
};
document.querySelectorAll('[data-journey-open]').forEach(button => button.addEventListener('click', () => { setMenu(false); setDrawer(true, button); }));
document.querySelectorAll('[data-journey-close]').forEach(button => button.addEventListener('click', () => setDrawer(false)));
document.addEventListener('keydown', event => { if (event.key !== 'Escape') return; if (drawer && !drawer.hidden) setDrawer(false); else setMenu(false); });

const localNav = document.querySelector('.page-localnav');
const localLinks = localNav ? [...localNav.querySelectorAll('a[href^="#"]')] : [];
const sectionMap = new Map(localLinks.map(link=>[link.getAttribute('href').slice(1),link]));
if(localLinks.length && 'IntersectionObserver' in window){
  const localObserver=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(!visible)return;
    localLinks.forEach(a=>a.classList.remove('is-current'));
    sectionMap.get(visible.target.id)?.classList.add('is-current');
  },{rootMargin:'-18% 0px -62% 0px',threshold:[0,.2,.5]});
  sectionMap.forEach((_,id)=>{ const el=document.getElementById(id); if(el)localObserver.observe(el); });
}

const revealCandidates=[...document.querySelectorAll('.reveal,.auto-reveal,.page-hero-copy,.page-hero-media,.page-section-intro,.split-story,.matrix article,.note-article,.editorial-band-inner,.page-end')];
revealCandidates.forEach((el,i)=>{el.classList.add('motion-reveal');el.style.setProperty('--reveal-order',String(i%6));});
if ('IntersectionObserver' in window && !prefersReduced) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }), { rootMargin:'0px 0px -7% 0px', threshold:.07 });
  revealCandidates.forEach(item => observer.observe(item));
} else revealCandidates.forEach(item => item.classList.add('is-visible'));

const depthTargets=[...document.querySelectorAll('.page-hero-media img,.story-media img,.note-article img,.trade-image img,.journal-card img,.desk-card-image img,.atlas-stage figure img')];
let ticking=false;
const updateScrollMotion=()=>{
  ticking=false;
  const doc=document.documentElement;
  const max=Math.max(1,doc.scrollHeight-innerHeight);
  if(progress) progress.style.transform=`scaleX(${Math.min(1,Math.max(0,scrollY/max))})`;
  header?.classList.toggle('is-scrolled', scrollY > 18);
  if(prefersReduced)return;
  for(const img of depthTargets){
    const r=img.parentElement?.getBoundingClientRect(); if(!r)continue;
    const center=r.top+r.height/2-innerHeight/2;
    const y=Math.max(-18,Math.min(18,-center/innerHeight*22));
    img.style.setProperty('--depth-y',`${y}px`);
  }
};
const requestScrollMotion=()=>{if(ticking)return;ticking=true;requestAnimationFrame(updateScrollMotion);};
updateScrollMotion();
window.addEventListener('scroll',requestScrollMotion,{passive:true});
window.addEventListener('resize',requestScrollMotion,{passive:true});

const film = document.querySelector('[data-hero-film]');
const filmFrames = film ? [...film.querySelectorAll('.film-frame')] : [];
const filmCaption = document.querySelector('[data-film-caption]');
const filmProgress = document.querySelector('[data-film-progress]');
let filmIndex = 0;
if (filmFrames.length > 1 && !prefersReduced) {
  const nextFilm = () => {
    filmFrames[filmIndex].classList.remove('is-active');
    filmIndex = (filmIndex + 1) % filmFrames.length;
    filmFrames[filmIndex].classList.add('is-active');
    if (filmCaption) filmCaption.textContent = copy.filmCaptions[filmIndex] || '';
    if (filmProgress) { filmProgress.classList.remove('restart'); void filmProgress.offsetWidth; filmProgress.classList.add('restart'); }
  };
  window.setInterval(nextFilm, 6100);
}

const fieldNote = document.querySelector('[data-field-note] p');
let noteIndex = 0;
if (fieldNote && !prefersReduced) {
  window.setInterval(() => {
    noteIndex = (noteIndex + 1) % copy.fieldNotes.length;
    fieldNote.classList.add('is-changing');
    window.setTimeout(() => { fieldNote.textContent = copy.fieldNotes[noteIndex]; fieldNote.classList.remove('is-changing'); }, 220);
  }, 4700);
}

const atlasData = {
  sea:{image:'/assets/boat-800.webp',alt:'A private sea journey in Phu Quoc',link:'/experiences/#sea'},
  roots:{image:'https://images.unsplash.com/photo-1746362722801-17bcc1f72fd9?auto=format&fit=crop&q=82&w=1800',alt:'Traditional fish sauce barrels in Phu Quoc',link:'/experiences/#roots'},
  wild:{image:'https://images.unsplash.com/photo-1634043270873-f2f830e5d4bf?auto=format&fit=crop&q=82&w=1800',alt:'Fishing boat on the sea in Phu Quoc',link:'/experiences/#wild'},
  moments:{image:'/assets/family-800.webp',alt:'Family travelling with JoTrip in Phu Quoc',link:'/experiences/#moments'}
};
const atlasTabs=[...document.querySelectorAll('[data-atlas]')];
const atlasImage=document.querySelector('[data-atlas-image]');
const atlasTitle=document.querySelector('[data-atlas-title]');
const atlasBody=document.querySelector('[data-atlas-body]');
const atlasLink=document.querySelector('[data-atlas-link]');
const activateAtlas=key=>{
  const item=atlasData[key], text=copy.atlas[key]; if(!item||!text)return;
  atlasTabs.forEach(tab=>{const active=tab.dataset.atlas===key;tab.classList.toggle('is-active',active);tab.setAttribute('aria-selected',String(active));});
  const stage=document.querySelector('[data-atlas-stage]'); stage?.classList.add('is-switching');
  window.setTimeout(()=>{if(atlasImage){atlasImage.src=item.image;atlasImage.alt=item.alt;}if(atlasTitle)atlasTitle.textContent=text.title;if(atlasBody)atlasBody.textContent=text.body;if(atlasLink){atlasLink.href=item.link;atlasLink.innerHTML=`${text.label} <span>↗</span>`;}stage?.classList.remove('is-switching');},150);
};
atlasTabs.forEach(tab=>{tab.addEventListener('click',()=>activateAtlas(tab.dataset.atlas));tab.addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover)').matches)activateAtlas(tab.dataset.atlas);});});
if(lang==='vi' && atlasTabs.length) activateAtlas('sea');

const rail=document.querySelector('[data-photo-rail]');
document.querySelector('[data-rail-prev]')?.addEventListener('click',()=>rail?.scrollBy({left:-Math.min(520,innerWidth*.72),behavior:'smooth'}));
document.querySelector('[data-rail-next]')?.addEventListener('click',()=>rail?.scrollBy({left:Math.min(520,innerWidth*.72),behavior:'smooth'}));
let railHover=false, railTimer=null;
if(rail && !prefersReduced){
  rail.addEventListener('mouseenter',()=>railHover=true);rail.addEventListener('mouseleave',()=>railHover=false);
  railTimer=window.setInterval(()=>{if(railHover||document.hidden)return;const end=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-24;rail.scrollTo({left:end?0:rail.scrollLeft+Math.min(360,innerWidth*.42),behavior:'smooth'});},7200);
}

const journeyForm=document.getElementById('journeyForm');
const journeyReview=document.getElementById('journeyReview');
journeyForm?.addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(journeyForm);
  const labels=lang==='vi'?['Khi nào','Đi cùng ai','Nơi ở','Muốn thêm','Muốn tránh','Điều làm chuyến đi thành của bạn']:['When','Travelling with','Stay','More of','Prefer to avoid','What makes it yours'];
  const rows=[[labels[0],data.get('when')],[labels[1],data.get('with')],[labels[2],data.get('stay')],[labels[3],data.get('experience')],[labels[4],data.get('avoid')],[labels[5],data.get('yours')]].filter(([,value])=>String(value||'').trim());
  if(!journeyReview)return;
  journeyReview.hidden=false;
  journeyReview.textContent=rows.length
    ? `${lang==='vi'?'PHIẾU HÀNH TRÌNH CỦA BẠN':'YOUR JOURNEY PAPER'}\n\n${rows.map(([label,value])=>`${label}: ${String(value).trim()}`).join('\n')}\n\n${lang==='vi'?'Bản xem thử. Chưa có dữ liệu nào được gửi.':'Preview only. Nothing has been sent.'}`
    : (lang==='vi'?'Bắt đầu bằng bất cứ điều gì bạn đã biết. Chỉ một chi tiết cũng đủ.':'Start with anything you already know. Even one detail is enough.');
  journeyReview.scrollIntoView({behavior:'smooth',block:'nearest'});
});
