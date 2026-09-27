import {copyFile,mkdir,rm,readdir,readFile,writeFile} from 'node:fs/promises';
import {join,resolve,basename} from 'node:path';
import {gunzipSync} from 'node:zlib';
const root=resolve(import.meta.dirname,'..'),src=join(root,'src'),dist=join(root,'dist');
await rm(dist,{recursive:true,force:true});await mkdir(join(dist,'assets'),{recursive:true});
await copyFile(join(src,'index.html'),join(dist,'index.html'));
await copyFile(join(src,'robots.txt'),join(dist,'robots.txt'));
await copyFile(join(src,'visual-refinement.css'),join(dist,'visual-refinement.css'));
const packs=await readdir(join(src,'assets-packs'));
for(const name of packs.filter(x=>x.endsWith('.tar.gz'))){
 const raw=gunzipSync(await readFile(join(src,'assets-packs',name)));
 let pos=0;while(pos+512<=raw.length){
  const h=raw.subarray(pos,pos+512),name=h.subarray(0,100).toString().split('\0')[0];if(!name)break;
  const size=parseInt(h.subarray(124,136).toString().replace(/\0/g,'').trim()||'0',8);
  pos+=512;if(!/^[a-z0-9-]+(?:-[0-9]+)?\.(webp|png)$/i.test(basename(name))||name!==basename(name))throw Error('Invalid asset '+name);
  await writeFile(join(dist,'assets',name),raw.subarray(pos,pos+size));pos+=Math.ceil(size/512)*512;
 }
}
const required=['airport','boat','resort','family','lunch','evening','driver'];
const missing=[];for(const key of required)for(const width of [360,800,1600]){try{await readFile(join(dist,'assets',`${key}-${width}.webp`))}catch{missing.push(`${key}-${width}.webp`)}}
try{await readFile(join(dist,'assets','jotrip-wordmark.png'))}catch{missing.push('jotrip-wordmark.png')}
if(missing.length)throw Error('Missing '+missing.join(', '));
console.log('DMC visual assets unpacked from original-photography WebP bundles');
