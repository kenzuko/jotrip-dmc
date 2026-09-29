import {mkdir,rm,readFile,writeFile,copyFile,readdir} from 'node:fs/promises';
import {resolve,join,basename} from 'node:path';
import {gunzipSync} from 'node:zlib';

const root=resolve(import.meta.dirname),src=join(root,'src'),dist=join(root,'dist');
await rm(dist,{recursive:true,force:true});
await mkdir(join(dist,'assets'),{recursive:true});
await mkdir(join(dist,'admin'),{recursive:true});

const v8Dir=join(src,'v8');
const htmlParts=[
  'index.part-01.html','index.part-02.html','index.part-03.html',
  'index.part-04-a.html','index.part-04-b.html',
  'index.part-05-a.html','index.part-05-b.html'
];
const html=(await Promise.all(htmlParts.map(name=>readFile(join(v8Dir,name),'utf8')))).join('');
await writeFile(join(dist,'index.html'),html);

for(const file of ['content.json','robots.txt']) await copyFile(join(src,file),join(dist,file));
for(const file of ['index.html','admin.js']) await copyFile(join(src,'admin',file),join(dist,'admin',file));
await copyFile(join(src,'room-art-v8','room-plate-v8.webp'),join(dist,'assets','room-plate-v8.webp'));

for(const pack of (await readdir(join(src,'assets-packs'))).filter(name=>name.endsWith('.tar.gz'))){
  const raw=gunzipSync(await readFile(join(src,'assets-packs',pack)));
  let pos=0;
  while(pos+512<=raw.length){
    const header=raw.subarray(pos,pos+512);
    const name=header.subarray(0,100).toString().split('\0')[0];
    if(!name) break;
    const size=parseInt(header.subarray(124,136).toString().replace(/\0/g,'').trim()||'0',8);
    pos+=512;
    if(name&&size>0){
      const base=basename(name);
      if(base!==name||!/^[a-z0-9_.-]+$/i.test(base)) throw Error('Unsafe asset '+name);
      await writeFile(join(dist,'assets',base),raw.subarray(pos,pos+size));
    }
    pos+=Math.ceil(size/512)*512;
  }
}
for(const asset of ['room-plate-v8.webp','jotrip-wordmark.png','airport-1600.webp','boat-800.webp','resort-800.webp','family-800.webp','lunch-800.webp','evening-800.webp','driver-800.webp']) await readFile(join(dist,'assets',asset));
await writeFile(join(dist,'.nojekyll'),'');
console.log('Built JoTrip DMC V8 from '+htmlParts.length+' source chunks with '+(await readdir(join(dist,'assets'))).length+' assets');
