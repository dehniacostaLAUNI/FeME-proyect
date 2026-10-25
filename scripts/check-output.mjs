import {readFile,readdir} from 'node:fs/promises';
import path from 'node:path';
const dir=path.resolve(import.meta.dirname,'../dist');
const html=await readFile(path.join(dir,'index.html'),'utf8');
if(!html.includes('no-referrer')||!html.includes('Content-Security-Policy'))throw Error('Faltan políticas de privacidad.');
if(/<(?:iframe|video|audio)\b|(?:src|href)=["']https?:\/\//i.test(html))throw Error('Recurso remoto en la página inicial.');
async function walk(folder){for(const e of await readdir(folder,{withFileTypes:true})){const file=path.join(folder,e.name);if(e.isDirectory())await walk(file);else{if(/\.map$/.test(file))throw Error('No se publican mapas de código fuente.');if(/\.css$/.test(file)&&/(?:@import|url\()\s*['"]?https?:/i.test(await readFile(file,'utf8')))throw Error('CSS con recursos remotos.')}}}
await walk(dir);
console.log('Paquete de publicación verificado; sin mapas de código fuente ni recursos remotos en HTML/CSS.');
