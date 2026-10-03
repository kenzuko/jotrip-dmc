const JOTRIP={phoneDisplay:'+84 817 060 066',phoneE164:'+84817060066',phoneLocal:'0817060066',email:'phuquoclux@gmail.com'};
const saved=localStorage.getItem('jotrip-lang');
const lang=saved==='vi'||saved==='en'?saved:((navigator.language||'').toLowerCase().startsWith('vi')?'vi':'en');
const vi=lang==='vi';
const tel=`tel:${JOTRIP.phoneE164}`;
const waBase=`https://wa.me/${JOTRIP.phoneE164.replace('+','')}`;
const zalo=`https://zalo.me/${JOTRIP.phoneLocal}`;
const mail=`mailto:${JOTRIP.email}`;

const footer=document.querySelector('.site-footer');
if(footer&&!footer.querySelector('.direct-contact')){
  footer.insertAdjacentHTML('beforeend',`<section class="direct-contact" aria-label="${vi?'Liên hệ JoTrip':'Contact JoTrip'}"><div><span>${vi?'NÓI CHUYỆN VỚI JOTRIP':'TALK TO JOTRIP'}</span><strong>${JOTRIP.phoneDisplay}</strong><small>${vi?'Điện thoại · Zalo · WhatsApp':'Phone · Zalo · WhatsApp'}</small></div><nav><a href="${tel}">${vi?'Gọi':'Call'}</a><a href="${waBase}" target="_blank" rel="noopener">WhatsApp</a><a href="${zalo}" target="_blank" rel="noopener">Zalo</a><a href="${mail}">Email</a></nav></section>`);
}

const form=document.getElementById('journeyForm');
const review=document.getElementById('journeyReview');
if(form){
  const first=form.firstElementChild;
  first?.insertAdjacentHTML('beforebegin',`<div class="contact-fields"><div class="field-pair"><label>${vi?'Tên của bạn':'Your name'}<input name="guestName" autocomplete="name" required placeholder="${vi?'Tên để JoTrip xưng hô':'How JoTrip should address you'}"></label><label>${vi?'Số điện thoại / WhatsApp / Zalo':'Phone / WhatsApp / Zalo'}<input name="contactNumber" autocomplete="tel" inputmode="tel" placeholder="${vi?'Ví dụ +84...':'For example +84...'}"></label></div><div class="field-pair"><label>Email<input name="guestEmail" autocomplete="email" inputmode="email" type="email" placeholder="name@example.com"></label><label>${vi?'Muốn JoTrip liên hệ qua':'Preferred contact'}<select name="preferred"><option value="whatsapp">WhatsApp</option><option value="zalo">Zalo</option><option value="email">Email</option><option value="phone">${vi?'Điện thoại':'Phone'}</option></select></label></div></div>`);

  const button=form.querySelector('.drawer-review-btn');
  if(button) button.innerHTML=`${vi?'Gửi cho JoTrip':'Send to JoTrip'} <span>→</span>`;
  const note=form.querySelector('.drawer-note');
  if(note) note.textContent=vi?'JoTrip sẽ mở đúng kênh bạn chọn với nội dung chuyến đi đã điền sẵn. Không có form giả báo gửi thành công.':'JoTrip opens your chosen contact channel with the journey details prefilled. No fake “submitted” state.';
  if(review) review.hidden=true;

  const quick=document.createElement('div');
  quick.className='journey-direct';
  quick.innerHTML=`<span>${vi?'Hoặc liên hệ trực tiếp':'Or contact directly'}</span><div><a href="${tel}">${JOTRIP.phoneDisplay}</a><a href="${waBase}" target="_blank" rel="noopener">WhatsApp</a><a href="${zalo}" target="_blank" rel="noopener">Zalo</a><a href="${mail}">Email</a></div>`;
  form.append(quick);

  const value=name=>String(new FormData(form).get(name)||'').trim();
  const compose=()=>{
    const rows=[
      [vi?'Tên':'Name',value('guestName')],[vi?'Liên hệ':'Contact',value('contactNumber')],[vi?'Email':'Email',value('guestEmail')],
      [vi?'Ngày / thời điểm':'Dates / timing',value('when')],[vi?'Đi cùng':'Travelling with',value('with')],[vi?'Nơi ở':'Stay',value('stay')],
      [vi?'Muốn thêm':'More of',value('experience')],[vi?'Muốn tránh':'Avoid',value('avoid')],[vi?'Điều quan trọng':'What makes it theirs',value('yours')]
    ].filter(([,v])=>v);
    const head=vi?'JOTRIP DMC - YÊU CẦU HÀNH TRÌNH':'JOTRIP DMC - JOURNEY REQUEST';
    return `${head}\n${location.href}\n\n${rows.map(([k,v])=>`${k}: ${v}`).join('\n')}`;
  };

  form.addEventListener('submit',async e=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    if(!form.reportValidity()) return;
    const contact=value('contactNumber'),email=value('guestEmail');
    if(!contact&&!email){
      const field=form.querySelector('[name="contactNumber"]');
      field?.setCustomValidity(vi?'Cho JoTrip ít nhất một số liên hệ hoặc email.':'Please give JoTrip at least a contact number or email.');
      field?.reportValidity();
      field?.addEventListener('input',()=>field.setCustomValidity(''),{once:true});
      return;
    }
    const text=compose();
    const preferred=value('preferred')||'whatsapp';
    if(review){review.hidden=false;review.textContent=vi?'Đang mở kênh liên hệ bạn chọn...':'Opening your chosen contact channel...';}
    if(preferred==='email'){
      const subject=encodeURIComponent(vi?'Yêu cầu hành trình JoTrip DMC':'JoTrip DMC journey request');
      location.href=`mailto:${JOTRIP.email}?subject=${subject}&body=${encodeURIComponent(text)}`;
    }else if(preferred==='zalo'){
      try{await navigator.clipboard.writeText(text);}catch{}
      window.open(zalo,'_blank','noopener');
      if(review)review.textContent=vi?'Nội dung hành trình đã được chuẩn bị. Nếu trình duyệt cho phép, tớ đã copy để bạn dán vào Zalo.':'Journey details are ready. If the browser allowed it, the text was copied for you to paste into Zalo.';
    }else if(preferred==='phone'){
      location.href=tel;
    }else{
      window.open(`${waBase}?text=${encodeURIComponent(text)}`,'_blank','noopener');
    }
  },true);
}
