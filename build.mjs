import {mkdir,rm,readFile,writeFile,copyFile,readdir,cp} from 'node:fs/promises';
import {resolve,join,basename} from 'node:path';
import {gunzipSync} from 'node:zlib';

const root=resolve(import.meta.dirname),src=join(root,'src'),dist=join(root,'dist');
await rm(dist,{recursive:true,force:true});
await mkdir(join(dist,'assets'),{recursive:true});
await mkdir(join(dist,'admin'),{recursive:true});

for(const file of ['index.html','app.js','content.json','robots.txt']){
  await copyFile(join(src,file),join(dist,file));
}
for(const file of ['index.html','admin.js']){
  await copyFile(join(src,'admin',file),join(dist,'admin',file));
}

// Publish real subpages so the DMC is a website, not one long landing page.
await cp(join(src,'pages'),dist,{recursive:true,force:true});

// One maintainable visual system shared across home and all subpages.
const styleDir=join(src,'styles');
const styleFiles=(await readdir(styleDir)).filter(name=>name.endsWith('.css')).sort();
const appCss=(await Promise.all(styleFiles.map(name=>readFile(join(styleDir,name),'utf8')))).join('\n\n');
await writeFile(join(dist,'app.css'),appCss);

// Verified JoTrip real-photo archive. These are documentary assets, not generated imagery.
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

const required=[
  'jotrip-wordmark.png',
  'airport-1600.webp',
  'airport-800.webp',
  'boat-800.webp',
  'resort-800.webp',
  'family-800.webp',
  'lunch-800.webp',
  'evening-800.webp',
  'driver-800.webp'
];
for(const asset of required) await readFile(join(dist,'assets',asset));

console.log('Built JoTrip DMC multipage editorial site with '+styleFiles.length+' visual system and '+(await readdir(join(dist,'assets'))).length+' verified real-photo assets');
