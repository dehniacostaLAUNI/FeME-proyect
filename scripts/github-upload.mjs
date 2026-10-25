import {spawnSync} from 'node:child_process';
import {existsSync,realpathSync} from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const repository='dehniacostaLAUNI/FeME-proyect';
const env={...process.env,GIT_TERMINAL_PROMPT:'0',GCM_INTERACTIVE:'never'};
function git(args,input,quiet=false){const r=spawnSync('git',args,{cwd:root,env,input,encoding:'utf8',windowsHide:true});if(r.status!==0)throw Error(quiet?'GitHub requiere autenticar Git Credential Manager.':(r.stderr?.trim()||'No se pudo completar la operación de Git.'));return r.stdout.trim()}
async function main(){
  const check=spawnSync(process.execPath,['scripts/privacy-check.mjs'],{cwd:root,encoding:'utf8'});if(check.status!==0)throw Error('La comprobación de publicación debe pasar antes de subir archivos.');
  // The credential stays in process memory and is never written or printed.
  const fields=git(['credential','fill'],'protocol=https\nhost=github.com\nusername=dehniacostaLAUNI\n\n',true);
  const token=fields.split(/\r?\n/).find(x=>x.startsWith('password='))?.slice(9);if(!token)throw Error('Falta la autenticación de GitHub.');
  const headers={Authorization:'Bearer '+token,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'};
  const api='https://api.github.com/repos/'+repository;
  const r=await fetch(api,{headers});if(!r.ok)throw Error('La sesión no tiene acceso al repositorio elegido.');let repo=await r.json();
  if(!repo.permissions?.admin)throw Error('La cuenta debe administrar el repositorio elegido.');
  if(!repo.private){const change=await fetch(api,{method:'PATCH',headers,body:JSON.stringify({private:true})});if(!change.ok)throw Error('No se pudo dejar privado el repositorio. No se subió ningún archivo.');repo=await change.json();}
  if(!repo.private)throw Error('El repositorio debe ser privado antes de subir.');
  console.log('Repositorio privado confirmado.');
  const remote='https://github.com/'+repository+'.git';
  const refs=git(['-c','credential.username=dehniacostaLAUNI','ls-remote',remote]);
  if(refs)throw Error('El repositorio ya contiene historial. Se conserva intacto; revisar antes de actualizar.');
  if(!existsSync(path.join(root,'.git')))git(['init','--initial-branch=main','.']);
  if(realpathSync(git(['rev-parse','--show-toplevel']))!==realpathSync(root))throw Error('La carpeta debe tener su propio repositorio aislado.');
  git(['config','user.name','La Uni - FeME']);git(['config','user.email','publication@project.invalid']);
  const allowed=['.github','public','src','scripts','administracion','README.md','.gitignore','index.html','package.json','pnpm-lock.yaml','tsconfig.json','vite.config.ts'];
  git(['add','--',...allowed]);
  for(const file of git(['diff','--cached','--name-only']).split('\n').filter(Boolean))if(!allowed.some(a=>file===a||file.startsWith(a+'/')))throw Error('Hay archivos ajenos a la publicación en el área de preparación.');
  git(['commit','-m','Prepare reviewed public edition']);
  if(git(['remote']).split('\n').includes('origin')){if(git(['remote','get-url','origin'])!==remote)throw Error('El remoto existente apunta a otro destino.');}else git(['remote','add','origin',remote]);
  git(['-c','credential.username=dehniacostaLAUNI','push','--set-upstream','origin','main']);
  const head=git(['rev-parse','HEAD']);const remoteHead=git(['ls-remote',remote,'refs/heads/main']).split(/\s+/)[0];
  const final=await fetch(api,{headers});if(!final.ok||!(await final.json()).private||remoteHead!==head)throw Error('No se pudo verificar el resultado final.');
  console.log('Carga verificada en repositorio privado. Commit: '+head);
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
