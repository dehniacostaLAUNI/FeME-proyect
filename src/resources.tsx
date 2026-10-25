import learning from './learning.json';
import type {Lang} from './content';
import {publicUrl} from './urls';
import {Icon} from './visuals';
export const {resources,phases,checklist,external}=learning;
export function pdfPath(id:string,lang:Lang){
 const resource=resources.find(r=>r.id===id);
 if(!resource)throw Error('Unknown learning resource');
 return publicUrl('/assets/'+resource.slug+'-'+lang+'.pdf');
}
export function ResourceLink({id,lang,label}:{id:string;lang:Lang;label?:string}){
 const resource=resources.find(r=>r.id===id)!;
 return <a className="inline-link resource-download" href={pdfPath(id,lang)} download>{label||resource.title[lang]} · PDF<Icon name="download" size={16}/></a>;
}
export function ResourceLibrary({lang}:{lang:Lang}){
 const t=(es:string,en:string)=>lang==='es'?es:en;
 return <div className="resource-library"><span className="eyebrow">{t('BIBLIOTECA PARA REPLICAR','REPLICATION LIBRARY')}</span><h3>{t('Un cuaderno para cada propósito.','A notebook for each purpose.')}</h3><p>{t('Documentos distintos, en el idioma que estás leyendo. Cada uno conserva los logos de La Uni y FeME.','Distinct documents in your current language. Each carries the La Uni and FeME logos.')}</p>{['guide','section','workshop'].map(group=><details className="resource-group" key={group} open={group==='workshop'}><summary>{group==='guide'?t('Guía de co-creación','Co-creation guide'):group==='section'?t('Documentos por sección · 7','Documents by section · 7'):t('Cuadernos de taller · 3','Workshop notebooks · 3')}<Icon name="plus" size={18}/></summary><div className="resource-cards">{resources.filter(r=>r.group===group).map(r=><article key={r.id}><h4>{r.title[lang]}</h4><p>{r.body[lang]}</p><ResourceLink id={r.id} lang={lang} label={t('Descargar','Download')}/></article>)}</div></details>)}</div>;
}
export function WorkshopPresentations({lang}:{lang:Lang}){
 const t=(es:string,en:string)=>lang==='es'?es:en;
 return <div className="presentation-links"><div><span className="eyebrow">{t('PRESENTACIONES ORIGINALES','ORIGINAL PRESENTATIONS')}</span><h3>{t('Explora los dos Genially.','Explore both Genially presentations.')}</h3><p>{t('Materiales en español. Se abren sólo al elegir el enlace.','Materials in Spanish. Open only when you select a link.')}</p></div><div><a className="button outline" href={external.thermal} target="_blank" rel="noopener noreferrer">{t('Solar térmica · Genially','Solar thermal · Genially')}<Icon name="external" size={16}/></a><a className="button outline" href={external.photovoltaic} target="_blank" rel="noopener noreferrer">{t('Solar fotovoltaica · Genially','Solar photovoltaics · Genially')}<Icon name="external" size={16}/></a></div></div>;
}
