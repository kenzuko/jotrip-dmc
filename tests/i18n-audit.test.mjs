import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import vm from 'node:vm';

const root=resolve(import.meta.dirname,'..');
const i18nSource=await readFile(join(root,'src/i18n.js'),'utf8');
const finalSource=await readFile(join(root,'src/pages/shared/fullsite-i18n.js'),'utf8');
const build=await readFile(join(root,'build.mjs'),'utf8');
const htmlFiles=[
  'src/index.html',
  'src/pages/experiences/index.html',
  'src/pages/phu-quoc/index.html',
  'src/pages/partners/index.html',
  'src/pages/journal/index.html',
  'src/pages/about/index.html'
];

const sandbox={};
vm.runInNewContext(i18nSource.replace(/\bexport\s+/g,'')+'\n;globalThis.__vi=vi;',sandbox);
const vi=sandbox.__vi;

const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g,' ').trim();
const visibleTexts=html=>{
  const body=html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1]||'';
  const clean=body.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'').replace(/<!--([\s\S]*?)-->/g,'');
  return [...clean.matchAll(/>([^<>]+)</g)].map(m=>decode(m[1])).filter(Boolean);
};
const allowed=text=>{
  if(/^\d+(?:\s*[·/:-]\s*\d+)*$/.test(text))return true;
  if(/^(JoTrip|DMC|Open Phu Quoc|Open PQ|WhatsApp|Zalo|Email|EN|VI)$/i.test(text))return true;
  if(/^(Phu Quoc|An Thoi|Duong Dong)(?:\s*[·,].*)?$/i.test(text))return true;
  if(/^JOTRIP(?:\s+DMC)?(?:\s*[·/]\s*PHU QUOC)?$/i.test(text))return true;
  if(/^©/.test(text))return true;
  return false;
};
const finalCovers=text=>finalSource.includes(`'${text.replaceAll("'","\\'")}'`)||finalSource.includes(`\"${text.replaceAll('"','\\"')}\"`);

test('final localization layer is injected after every DOM-producing shared layer',()=>{
  const order=['story-layer.js','proof-layer.js','contact-layer.js','photo-layer.js','sunlit-voice.js','ui-polish.js','fullsite-i18n.js'];
  let previous=-1;
  for(const name of order){
    const index=build.indexOf(`/shared/${name}`);
    assert.ok(index>previous,`${name} must be loaded after the previous shared layer`);
    previous=index;
  }
});

test('all public static visible copy has a Vietnamese path',async()=>{
  const missing=[];
  for(const rel of htmlFiles){
    const html=await readFile(join(root,rel),'utf8');
    for(const text of visibleTexts(html)){
      if(allowed(text)||vi[text]||finalCovers(text))continue;
      if(!/[A-Za-z]/.test(text)||text.length<=2)continue;
      missing.push(`${rel}: ${text}`);
    }
  }
  assert.deepEqual(missing,[],`Uncovered visible English copy:\n${missing.join('\n')}`);
});

test('late Vietnamese cleanup covers known mixed-language residues',()=>{
  for(const residue of ['PHU QUOC · VIETNAM','JOURNEY PAPER · PHU QUOC','FIELD NOTES','JOTRIP FIELD NOTES · PHU QUOC','PRIVATE ISLAND DAY','BIG-GAME FISHING','STAY-LED DESIGN','LOCAL CONTEXT','SEA · PRIVATE','FAMILY · BESPOKE','RESORT · QUIET LUXURY','Destination intelligence không phải dashboard. Nó là thứ giúp quyết định đúng hơn.']){
    assert.ok(finalSource.includes(residue),`missing late translation for ${residue}`);
  }
  for(const token of ['kids club','dashboard','transit','activity','bespoke','package','brochure','logistics','host','luxury']){
    assert.ok(finalSource.includes(token),`missing mixed-language cleanup token ${token}`);
  }
});

test('accessibility labels are localized too',()=>{
  for(const label of ['Primary navigation','Language','Open navigation','Mobile navigation','Footer navigation','Journey paper','Experience chapters','Phu Quoc chapters','Partner chapters','About chapters','Previous photos','Next photos']){
    assert.ok(finalSource.includes(label),`missing localized aria label ${label}`);
  }
});
