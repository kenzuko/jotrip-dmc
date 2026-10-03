const PHOTO={
  sao:'https://images.unsplash.com/photo-1693282814784-649be45a459b?auto=format&fit=crop&q=88&w=2600',
  khem:'https://images.unsplash.com/photo-1732243395944-cb3ff9311091?auto=format&fit=crop&q=88&w=2600',
  sunset:'https://images.unsplash.com/photo-1631009177269-fabf77f374f7?auto=format&fit=crop&q=88&w=2600',
  fishing:'https://images.unsplash.com/photo-1634043270873-f2f830e5d4bf?auto=format&fit=crop&q=88&w=2400',
  roots:'https://images.unsplash.com/photo-1746362722801-17bcc1f72fd9?auto=format&fit=crop&q=88&w=2200',
  local:'https://images.unsplash.com/photo-1772737465607-adcaab218fd9?auto=format&fit=crop&q=88&w=2200'
};

const page=document.body.dataset.page||'home';
const setPhoto=(el,src,position='center')=>{if(!el)return;el.src=src;el.style.objectPosition=position;el.decoding='async';};

if(page==='home'){
  const frames=[...document.querySelectorAll('.film-frame img')];
  setPhoto(frames[0],PHOTO.sao,'center 58%');
  setPhoto(frames[1],PHOTO.khem,'center 48%');
  setPhoto(frames[2],PHOTO.local,'center 52%');

  setPhoto(document.querySelector('.journal-card-large img'),PHOTO.fishing,'center 55%');
  setPhoto(document.querySelector('.trade-image img'),PHOTO.khem,'center 48%');

  const atlasImage=document.querySelector('[data-atlas-image]');
  const atlasPhotos={sea:[PHOTO.sao,'center 55%'],roots:[PHOTO.roots,'center'],wild:[PHOTO.fishing,'center 54%'],moments:[PHOTO.sunset,'center 56%']};
  const applyAtlas=key=>{const item=atlasPhotos[key];if(!item)return;window.setTimeout(()=>setPhoto(atlasImage,item[0],item[1]),190);};
  document.querySelectorAll('[data-atlas]').forEach(tab=>{
    tab.addEventListener('click',()=>applyAtlas(tab.dataset.atlas));
    tab.addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover)').matches)applyAtlas(tab.dataset.atlas);});
  });
  applyAtlas('sea');

  const wholeStay=document.querySelector('.whole-stay .proof-inner');
  if(wholeStay&&!wholeStay.querySelector('.island-photo-sequence')){
    wholeStay.insertAdjacentHTML('beforeend',`<div class="island-photo-sequence" aria-label="Real Phu Quoc photography">
      <figure class="island-photo-wide"><img src="${PHOTO.sao}" alt="Sao Beach in Phu Quoc" loading="lazy"><figcaption><span>SEA</span><b>Bãi Sao · Phú Quốc</b></figcaption></figure>
      <figure><img src="${PHOTO.khem}" alt="Khem Beach in Phu Quoc" loading="lazy"><figcaption><span>STAY + SEA</span><b>Bãi Khem · Phú Quốc</b></figcaption></figure>
      <figure><img src="${PHOTO.roots}" alt="Traditional fish sauce barrels in Phu Quoc" loading="lazy"><figcaption><span>ROOTS</span><b>Nhà thùng · Phú Quốc</b></figcaption></figure>
      <figure class="island-photo-wide"><img src="${PHOTO.local}" alt="Daily local life in Phu Quoc" loading="lazy"><figcaption><span>LOCAL LIFE</span><b>Nhịp sống trên đảo</b></figcaption></figure>
    </div>`);
  }
}

if(page==='experiences'){
  setPhoto(document.querySelector('.page-hero-media img'),PHOTO.sao,'center 56%');
  setPhoto(document.querySelector('#sea .story-media img'),PHOTO.khem,'center 48%');
}

if(page==='phu-quoc'){
  const hero=document.querySelector('.page-hero-media img');
  if(hero)setPhoto(hero,PHOTO.local,'center 52%');
}

if(page==='partners'){
  const hero=document.querySelector('.page-hero-media img');
  if(hero)setPhoto(hero,PHOTO.khem,'center 48%');
}

// The 800px JoTrip documentary images remain valuable, but only in smaller evidence frames.
// Never upscale them into full-bleed hero/editorial photography again.
document.querySelectorAll('.evidence-rail img[src="/assets/boat-800.webp"]').forEach(img=>setPhoto(img,PHOTO.fishing,'center 54%'));
document.querySelectorAll('.evidence-rail img[src="/assets/resort-800.webp"]').forEach(img=>setPhoto(img,PHOTO.khem,'center 48%'));
