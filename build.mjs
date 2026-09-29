import {mkdir,rm,readFile,writeFile,copyFile,readdir} from 'node:fs/promises';
import {resolve,join,basename} from 'node:path';
import {gunzipSync} from 'node:zlib';

const root=resolve(import.meta.dirname),src=join(root,'src'),dist=join(root,'dist');
await rm(dist,{recursive:true,force:true});
await mkdir(join(dist,'assets'),{recursive:true});
await mkdir(join(dist,'admin'),{recursive:true});

for(const file of ['index.html','room.css','app.js','content.json','robots.txt']){
  await copyFile(join(src,file),join(dist,file));
}
for(const file of ['index.html','admin.js']){
  await copyFile(join(src,'admin',file),join(dist,'admin',file));
}

// Verified JoTrip real-photo archive. People and journey memories always come from these sources.
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

// Approved 28/09 room atmosphere only. This asset deliberately contains no documentary people.
// It replaces the retired V3 room artwork instead of layering new CSS over the old image.
const approvedParts=(await readdir(join(src,'approved-room-parts')))
  .filter(name=>name.endsWith('.txt'))
  .sort();
if(approvedParts.length!==4) throw Error('Approved room atmosphere requires exactly 4 source parts');
const approvedB64=(await Promise.all(
  approvedParts.map(name=>readFile(join(src,'approved-room-parts',name),'utf8'))
)).join('').trim();
await writeFile(join(dist,'assets','room-window-approved.webp'),Buffer.from(approvedB64,'base64'));

const required=[
  'jotrip-wordmark.png',
  'room-window-approved.webp',
  'airport-1600.webp',
  'boat-800.webp',
  'resort-800.webp',
  'family-800.webp',
  'lunch-800.webp',
  'evening-800.webp',
  'driver-800.webp'
];
for(const asset of required) await readFile(join(dist,'assets',asset));

console.log('Built JoTrip DMC Island Reading Room - approved 28/09 clean rebuild with '+(await readdir(join(dist,'assets'))).length+' assets');
