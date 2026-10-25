import {createServer} from 'node:http';
import {readFile,stat,realpath} from 'node:fs/promises';
import path from 'node:path';
const root=await realpath(path.resolve(import.meta.dirname,'../dist'));
const index=await readFile(path.join(root,'index.html'),'utf8');
const script=index.match(/<script\b[^>]*\bsrc="([^"]+)"/i)?.[1]||'/assets/index.js';
const base=script.slice(0,script.lastIndexOf('/assets/')+1)||'/';
const rules=await readFile(path.join(root,'_headers'),'utf8');
const headers={};let global=false;
for(const line of rules.split(/\r?\n/)){if(!line.trim())continue;if(!line.startsWith(' ')){global=line==='/*';continue}if(global){const at=line.indexOf(':');headers[line.slice(0,at).trim()]=line.slice(at+1).trim()}}
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.pdf':'application/pdf','.ttf':'font/ttf','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
  try{
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{...headers,Allow:'GET, HEAD'});return res.end()}
    let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(base!=='/'&&pathname==='/'){res.writeHead(302,{...headers,Location:base});return res.end()}
    if(!pathname.startsWith(base))throw Error();
    pathname='/'+pathname.slice(base.length);
    const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
    if(!file.startsWith(root+path.sep)||pathname==='/_headers')throw Error();
    const info=await stat(file);if(!info.isFile())throw Error();
    const actual=await realpath(file);if(!actual.startsWith(root+path.sep))throw Error();
    const body=await readFile(actual);res.writeHead(200,{...headers,'Content-Type':mime[path.extname(actual)]||'application/octet-stream','Content-Length':body.length,'Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:body);
  }catch{res.writeHead(404,{...headers,'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(root,'404.html')))}
});
server.listen(4173,'127.0.0.1',()=>console.log('Vista previa: http://127.0.0.1:4173'+base));
