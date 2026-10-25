import {readdir,readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const problems=[];
async function files(dir){let result=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isSymbolicLink()){problems.push('No se admiten enlaces simbólicos: '+path.relative(root,p));continue}result.push(...(e.isDirectory()?await files(p):[p]))}return result}
const catalog=JSON.parse(await readFile(path.join(root,'public/data/catalogo.json'),'utf8'));
if(catalog.version!==1||!Array.isArray(catalog.items)||catalog.items.length>100)problems.push('Catálogo inválido.');
const ids=new Set(),approved=new Set();
for(const item of catalog.items||[]){
 if(!/^[a-z0-9-]{1,64}$/.test(item.id)||ids.has(item.id))problems.push('Identificador de evidencia inválido o repetido.');ids.add(item.id);
 if(item.reviewedForPublication!==true)problems.push('Falta revisión de publicación: '+item.id);
 if(!/^\/evidence\/[a-z0-9-]+\.(webp|pdf)$/.test(item.file)||!['image/webp','application/pdf'].includes(item.mime))problems.push('Solo se admiten archivos locales revisados: '+item.id);
 if(item.mime==='image/webp'&&!item.file.endsWith('.webp')||item.mime==='application/pdf'&&!item.file.endsWith('.pdf'))problems.push('Tipo de archivo incompatible: '+item.id);
 for(const field of ['title','body'])for(const lang of ['es','en']){const value=item[field]?.[lang];if(typeof value!=='string'||!value.trim()||value.length>(field==='title'?140:1500))problems.push('Texto bilingüe incompleto: '+item.id);if(typeof value==='string'&&(/https?:\/\/|[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:\+?\d[\s().-]*){9,}/i.test(value)))problems.push('Revisar enlaces, contactos o números en: '+item.id)}
 approved.add('public'+item.file);
 try{await stat(path.join(root,'public',item.file.slice(1)))}catch{problems.push('Archivo de evidencia no encontrado: '+item.id)}
}
const expectedAssets=new Set(['public/assets/launi.png','public/assets/feme.png','public/assets/guia-publica-es.pdf','public/assets/guia-publica-en.pdf','public/assets/fonts/DMSans[opsz,wght].ttf','public/assets/fonts/DMSerifDisplay-Regular.ttf','public/assets/fonts/DMSerifDisplay-Italic.ttf','public/assets/fonts/Caveat[wght].ttf','public/assets/fonts/dmsans-OFL.txt','public/assets/fonts/dmserifdisplay-OFL.txt','public/assets/fonts/caveat-OFL.txt','public/favicon.svg','public/_headers','public/404.html','public/data/catalogo.json']);
for(const required of expectedAssets)try{await stat(path.join(root,required))}catch{problems.push('Falta un recurso necesario: '+required)}
for(const file of await files(path.join(root,'public'))){const relative=path.relative(root,file).replaceAll('\\','/');if(!expectedAssets.has(relative)&&!approved.has(relative))problems.push('Archivo público fuera de la lista revisada: '+relative);const b=await readFile(file);if(b.length>25*1024*1024)problems.push('Archivo demasiado grande: '+relative);if(relative.endsWith('.webp')&&(b.includes(Buffer.from('EXIF'))||b.includes(Buffer.from('XMP '))))problems.push('Hay metadatos en una imagen: '+relative);if(relative.endsWith('.svg')&&/(?:https?:|<script|<foreignObject|onload=)/i.test(b.toString('utf8').replace('http://www.w3.org/2000/svg','')))problems.push('SVG con contenido externo o activo: '+relative)}
for(const file of await files(path.join(root,'src'))){const source=await readFile(file,'utf8');if(/<iframe\b|<video\b|<audio\b|navigator\.(?:geolocation|mediaDevices|sendBeacon)|document\.cookie|RTCPeerConnection|WebSocket|dangerouslySetInnerHTML|https?:\/\/fonts\./i.test(source))problems.push('Conexión o función no permitida en '+path.relative(root,file));if(file.endsWith('.css')&&/https?:\/\//i.test(source))problems.push('CSS con recursos remotos.');for(const m of source.matchAll(/fetch\s*\(\s*(['"])(.*?)\1/g))if(m[2]!=='/data/catalogo.json')problems.push('Solicitud no permitida: '+m[2])}
for(const entry of await readdir(root))if(/^\.env(?:\.|$)|\.(pem|key)$/i.test(entry))problems.push('No se permite material de acceso en esta carpeta: '+entry);
if(problems.length){console.error(problems.join('\n'));process.exit(1)}
console.log('Revisión automática: archivos permitidos, catálogo revisado y sin conexiones externas automáticas. La revisión de rostros y contexto sigue siendo humana.');
