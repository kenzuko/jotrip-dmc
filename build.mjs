import {mkdir,rm,readFile,writeFile,copyFile,readdir} from 'node:fs/promises';
import {resolve,join,basename} from 'node:path';
import {gunzipSync} from 'node:zlib';

const root=resolve(import.meta.dirname),src=join(root,'src'),dist=join(root,'dist');
await rm(dist,{recursive:true,force:true});
await mkdir(join(dist,'assets'),{recursive:true});
await mkdir(join(dist,'admin'),{recursive:true});

for(const file of ['index.html','app.js','content.json','robots.txt']) await copyFile(join(src,file),join(dist,file));
for(const file of ['index.html','admin.js']) await copyFile(join(src,'admin',file),join(dist,'admin',file));

const styleFiles=['approved-foundation.css','approved-responsive.css'];
const css=(await Promise.all(styleFiles.map(name=>readFile(join(src,'styles',name),'utf8')))).join('\n\n');
await writeFile(join(dist,'app.css'),css);

for(const pack of (await readdir(join(src,'assets-packs'))).filter(name=>name.endsWith('.tar.gz'))){
  const raw=gunzipSync(await readFile(join(src,'assets-packs',pack)));
  let pos=0;
  while(pos+512<=raw.length){
    const h=raw.subarray(pos,pos+512),name=h.subarray(0,100).toString().split('\0')[0];
    if(!name)break;
    const size=parseInt(h.subarray(124,136).toString().replace(/\0/g,'').trim()||'0',8);
    pos+=512;
    if(size>0){
      const base=basename(name);
      if(base!==name||!/^[a-z0-9_.-]+$/i.test(base))throw Error('Unsafe asset '+name);
      await writeFile(join(dist,'assets',base),raw.subarray(pos,pos+size));
    }
    pos+=Math.ceil(size/512)*512;
  }
}

for(const asset of ['jotrip-wordmark.png','airport-1600.webp','boat-800.webp','resort-800.webp','family-800.webp','lunch-800.webp','evening-800.webp','driver-800.webp']){
  await readFile(join(dist,'assets',asset));
}
await writeFile(join(dist,'.nojekyll'),'');
console.log('Built approved JoTrip DMC visual website with verified real-photo assets');
