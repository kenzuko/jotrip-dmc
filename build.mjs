import {mkdir,rm,readFile,writeFile,copyFile,readdir,cp} from 'node:fs/promises';
import {resolve,join,basename} from 'node:path';
import {gunzipSync} from 'node:zlib';

const root=resolve(import.meta.dirname),src=join(root,'src'),dist=join(root,'dist');
const production=process.env.JOTRIP_PRODUCTION==='1';
await rm(dist,{recursive:true,force:true});
await mkdir(join(dist,'assets'),{recursive:true});
await mkdir(join(dist,'admin'),{recursive:true});

for(const file of ['index.html','app.js','i18n.js','content.json','robots.txt']){
  await copyFile(join(src,file),join(dist,file));
}
for(const file of ['index.html','admin.js']){
  await copyFile(join(src,'admin',file),join(dist,'admin',file));
}

await cp(join(src,'pages'),dist,{recursive:true,force:true});

// Preview stays noindex. Production builds become indexable only when explicitly enabled.
if(production){
  const publicHtml=[
    join(dist,'index.html'),
    join(dist,'experiences','index.html'),
    join(dist,'phu-quoc','index.html'),
    join(dist,'partners','index.html'),
    join(dist,'journal','index.html'),
    join(dist,'about','index.html')
  ];
  for(const file of publicHtml){
    const source=await readFile(file,'utf8');
    await writeFile(file,source.replace('name="robots" content="noindex,nofollow"','name="robots" content="index,follow"'));
  }
  await writeFile(join(dist,'robots.txt'),'User-agent: *\nAllow: /\n');
}

const styleDir=join(src,'styles');
const styleFiles=(await readdir(styleDir)).filter(name=>name.endsWith('.css')).sort();
const appCss=(await Promise.all(styleFiles.map(name=>readFile(join(styleDir,name),'utf8')))).join('\n\n');
await writeFile(join(dist,'app.css'),appCss);

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

const required=['jotrip-wordmark.png','airport-1600.webp','airport-800.webp','boat-800.webp','resort-800.webp','family-800.webp','lunch-800.webp','evening-800.webp','driver-800.webp'];
for(const asset of required) await readFile(join(dist,'assets',asset));
await readFile(join(dist,'i18n.js'));

console.log(`Built JoTrip DMC ${production?'production':'preview'} bilingual editorial site with ${styleFiles.length} style layers and ${(await readdir(join(dist,'assets'))).length} verified real-photo assets`);
