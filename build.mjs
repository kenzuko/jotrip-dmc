import {mkdir,rm,readFile,writeFile,copyFile,readdir} from 'node:fs/promises';
import {resolve,join,basename} from 'node:path';
import {gunzipSync} from 'node:zlib';

const root=resolve(import.meta.dirname),src=join(root,'src'),dist=join(root,'dist');
await rm(dist,{recursive:true,force:true});
await mkdir(join(dist,'assets'),{recursive:true});
await mkdir(join(dist,'admin'),{recursive:true});

for(const f of ['index.html','room.css','app.js','content.json','robots.txt'])await copyFile(join(src,f),join(dist,f));
for(const f of ['index.html','admin.js'])await copyFile(join(src,'admin',f),join(dist,'admin',f));

// Reuse verified JoTrip real-photo bundles.
for(const pack of (await readdir(join(src,'assets-packs'))).filter(x=>x.endsWith('.tar.gz'))){
  const raw=gunzipSync(await readFile(join(src,'assets-packs',pack)));let pos=0;
  while(pos+512<=raw.length){
    const h=raw.subarray(pos,pos+512),name=h.subarray(0,100).toString().split('\0')[0];
    if(!name)break;
    const size=parseInt(h.subarray(124,136).toString().replace(/\0/g,'').trim()||'0',8);pos+=512;
    if(name&&size>0){
      const base=basename(name);if(base!==name||!/^[a-z0-9_.-]+$/i.test(base))throw Error('Unsafe asset '+name);
      await writeFile(join(dist,'assets',base),raw.subarray(pos,pos+size));
    }
    pos+=Math.ceil(size/512)*512;
  }
}

// Art-directed room background, kept text-editable in the repository.
const parts=(await readdir(join(src,'room-image-parts'))).filter(x=>x.endsWith('.txt')).sort();
const b64=(await Promise.all(parts.map(f=>readFile(join(src,'room-image-parts',f),'utf8')))).join('').trim();
await writeFile(join(dist,'assets','room-atmosphere.webp'),Buffer.from(b64,'base64'));

// Static V4 assets: Jo mascot and real licensed sound recordings.
const staticDir=join(src,'static');
for(const f of await readdir(staticDir))await copyFile(join(staticDir,f),join(dist,'assets',f));

const required=[
  'jotrip-wordmark.png','room-atmosphere.webp','airport-1600.webp','boat-800.webp','resort-800.webp',
  'family-800.webp','lunch-800.webp','evening-800.webp','driver-800.webp',
  'jo-wave.webp','sfx-page-turn.mp3','sfx-paper-slide.mp3','sfx-pen-write.mp3','sfx-window-wind.mp3'
];
for(const f of required)await readFile(join(dist,'assets',f));
console.log('Built JoTrip DMC Living Island Book V4 with '+(await readdir(join(dist,'assets'))).length+' assets');
