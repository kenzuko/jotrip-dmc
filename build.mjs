import {mkdir,rm,readFile,writeFile,copyFile,readdir} from 'node:fs/promises';
import {resolve,join,basename} from 'node:path';
import {gunzipSync} from 'node:zlib';
const root=resolve(import.meta.dirname),src=join(root,'src'),dist=join(root,'dist');
await rm(dist,{recursive:true,force:true});
await mkdir(join(dist,'assets'),{recursive:true});await mkdir(join(dist,'i18n'),{recursive:true});
for(const name of ['index.html','site.css','site.js'])await copyFile(join(src,name),join(dist,name));
for(const name of ['vi.json','en.json'])await copyFile(join(src,'i18n',name),join(dist,'i18n',name));

// Legacy admin references incompatible content schema and is intentionally not published.

for(const name of ['approved-scene.jpg','scene-clean-v2.png','approved-mobile-sea.jpg','approved-mobile-book.jpg','airport-editorial.webp','approved-book-edge.png'])await copyFile(join(src,'visual',name),join(dist,'assets',name));
for(const pack of (await readdir(join(src,'assets-packs'))).filter(n=>n.endsWith('.tar.gz'))){
 const raw=gunzipSync(await readFile(join(src,'assets-packs',pack)));
 let pos=0;
 while(pos+512<=raw.length){
  const h=raw.subarray(pos,pos+512),name=h.subarray(0,100).toString().split('\0')[0];if(!name)break;
  const size=parseInt(h.subarray(124,136).toString().replace(/\0/g,'').trim()||'0',8);pos+=512;
  if(size>0){const base=basename(name);if(base!==name||!/^[a-z0-9_.-]+$/i.test(base))throw Error('Unsafe asset '+name);await writeFile(join(dist,'assets',base),raw.subarray(pos,pos+size))}
  pos+=Math.ceil(size/512)*512;
 }
}
for(const file of ['approved-scene.jpg','scene-clean-v2.png','airport-editorial.webp','approved-book-edge.png','airport-1600.webp','jotrip-wordmark.png'])await readFile(join(dist,'assets',file));
await writeFile(join(dist,'.nojekyll'),'');
console.log('Built stage V2, immutable reference, two locale data packs and verified JoTrip photographs');
