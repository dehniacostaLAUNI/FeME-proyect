const {CLOUDFLARE_ACCOUNT_ID:account,CLOUDFLARE_API_TOKEN:token,CF_PAGES_PROJECT:project}=process.env;
if(!account||!token||!project||!/^[a-z0-9][a-z0-9-]{0,57}$/.test(project))throw Error('Configura los secretos de Cloudflare y el nombre del proyecto.');
const endpoint='https://api.cloudflare.com/client/v4/accounts/'+encodeURIComponent(account)+'/pages/projects';
const headers={Authorization:'Bearer '+token,'Content-Type':'application/json'};
const current=await fetch(endpoint+'/'+project,{headers});
if(current.status===404){const r=await fetch(endpoint,{method:'POST',headers,body:JSON.stringify({name:project,production_branch:'production'})});if(!r.ok)throw Error('No se pudo crear el proyecto de alojamiento.');console.log('Proyecto de alojamiento creado.')}else if(!current.ok)throw Error('No se pudo comprobar el proyecto de alojamiento.');else {const data=await current.json();if(!data.success||data.result?.source)throw Error('Usa un proyecto de carga directa, sin integración Git que cree vistas públicas automáticas.');console.log('Proyecto de alojamiento disponible.');}
