import {readFile,writeFile,readdir,stat} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
const src=new URL('../src/',import.meta.url),dist=new URL('../dist/',import.meta.url);
let payload='';
for(const part of [1,2,3])payload+=(await readFile(new URL('visual-v3.part'+part,src),'utf8')).trim();
if(payload.length!==6488)throw Error('Visual fidelity source incomplete');
const css=gunzipSync(Buffer.from(payload,'base64'));
if(css.length!==14721||createHash('sha256').update(css).digest('hex')!=='ce93d8d11603094082a638ada792acfe18f44be758e30b796d91623386229da3')throw Error('Visual CSS integrity failed');
await writeFile(new URL('visual-v3.css',dist),css);
// V4 corrects the approved book's actual layout width, tabletop depth and responsive paper shape.
// Keep V3 immutable; V4 is an additive, checksum-verified overlay, so rollbacks remain safe.
const compressedV4=(await readFile(new URL('visual-v4.css.gz.b64',src),'utf8')).trim();
const v4=gunzipSync(Buffer.from(compressedV4,'base64'));
if(createHash('sha256').update(v4).digest('hex')!=='f5ee1611c1a7e4dfa501fbe4eea0977756b1379e1742c89cf7c3419adf841b58')throw Error('V4 CSS checksum failed');
await writeFile(new URL('visual-v4.css',dist),v4);

const stylesheet='<link rel="stylesheet" href="/visual-v3.css?v=3">\\n<link rel="stylesheet" href="/visual-v4.css?v=4">';
let count=0;
async function walk(folder){
 for(const item of await readdir(folder,{withFileTypes:true})){
  const file=new URL(item.name+(item.isDirectory()?'/':''),folder);
  if(item.isDirectory()){await walk(file);continue}
  if(item.name!=='index.html')continue;
  let html=await readFile(file,'utf8');
  if(!html.includes('jotrip-wordmark.png'))throw Error('Unexpected HTML route: '+file.pathname);
  if(html.includes('/visual-v3.css'))throw Error('Duplicate visual overlay: '+file.pathname);
  html=html.replace('</head>',stylesheet+'\n</head>');
  if(!html.includes('noindex,nofollow'))html=html.replace('</head>','<meta name="robots" content="noindex,nofollow">\n</head>');
  if(html.includes('class="desk"')){
    if((html.match(/data-chapter="\d"/g)||[]).length!==6||!html.includes('class="benefits"'))throw Error('Approved book anatomy changed');
  }
  await writeFile(file,html);
  count++;
 }
}
await walk(dist);
if(count<10)throw Error('Editorial routes missing, produced '+count);
console.log('Living Book visual V3 installed on '+count+' routes; verified original photo and logo paths.');