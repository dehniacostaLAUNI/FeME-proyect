export function publicUrl(file:string){
 if(!file.startsWith('/')||file.startsWith('//')||file.includes('\\'))throw Error('Local resource required');
 return import.meta.env.BASE_URL+file.slice(1);
}
