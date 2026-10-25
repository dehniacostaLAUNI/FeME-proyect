# Saberes energéticos · La Uni × FeME

Edición bilingüe de aprendizaje comunitario, preparada para un repositorio **privado** y alojamiento público de archivos estáticos en Cloudflare Pages. La versión completa con registros originales permanece separada.

## Trabajar en el sitio

Requiere Node.js 22.13 o posterior y pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm run dev
pnpm run build
pnpm run preview
```

`dist` es el único directorio que se publica. No subir el directorio de trabajo completo, `.git`, `node_modules`, originales o credenciales al alojamiento. La guía de administración en PDF está en `administracion` y no forma parte del sitio público.

## Publicación revisada

Se utiliza un proyecto de **carga directa** de Cloudflare Pages. Un push a main o un pull request ejecuta comprobaciones sin publicar. El flujo **Publicar versión revisada** se ejecuta manualmente sobre main y exige marcar la revisión de contenidos.

Configurar en GitHub, Settings > Secrets and variables > Actions:

- Secret `CLOUDFLARE_API_TOKEN`: token de la cuenta con Cloudflare Pages: Edit.
- Secret `CLOUDFLARE_ACCOUNT_ID`: identificador de esa cuenta.
- Variable `CF_PAGES_PROJECT`: nombre neutral del proyecto de carga directa.

No escribir estos valores en archivos, commits o chats. No activar analíticas, Zaraz, integración Git ni vistas previas automáticas en Cloudflare. El flujo comprueba que el proyecto no esté conectado a una integración Git antes de publicar.

También se puede subir el ZIP compilado directamente desde el panel de Cloudflare Pages. Las instrucciones vigentes del proveedor están en [Cloudflare Direct Upload](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/).

## Evidencias

No hay carga pública de archivos ni formulario de contacto. Los originales se conservan fuera del repositorio. Preparar copias revisadas, sin rostros, voces, datos de contacto, coordenadas, fondos reconocibles ni metadatos personales. No enlazar una carpeta completa de originales desde esta edición.

1. Guardar la copia revisada en `public/evidence/` con un nombre neutral. Imágenes WebP sin EXIF/XMP o PDF revisado, máximo 25 MiB por archivo.
2. Añadir una entrada a `public/data/catalogo.json`, conservando `version: 1` y `items` como lista:

```json
{
  "id": "actividad-01",
  "title": {"es": "Registro del taller", "en": "Workshop record"},
  "body": {"es": "Descripción general sin datos identificables.", "en": "General description without identifying information."},
  "category": "talleres",
  "file": "/evidence/actividad-01.webp",
  "mime": "image/webp",
  "reviewedForPublication": true
}
```

3. Ejecutar build, abrir la vista previa y revisar ambos idiomas y los archivos. La marca de revisión requiere comprobar realmente el contenido; el programa no reconoce todos los rostros o localizaciones.
4. Publicar manualmente solo tras esa revisión.

## Privacidad y límites

Recursos locales, fuentes con sus licencias, ausencia de analíticas y conexiones externas automáticas, política de referencia `no-referrer`, CSP restrictiva y sin mapas de código fuente. Idioma y lista de revisión se guardan únicamente en el navegador. Las guías públicas en PDF incluyen los dos logos y autoría institucional.

Las comprobaciones detectan archivos no permitidos, ciertos metadatos y conexiones remotas, pero no garantizan anonimato. Los proveedores pueden procesar IP y registros técnicos. Mantener el repositorio privado no elimina asociaciones institucionales ya públicas ni registros previos.

## Derechos

Las marcas La Uni y FeME pertenecen a sus titulares. No se concede una licencia general de redistribución de marcas o fotografías. Las fuentes conservan sus licencias OFL en `public/assets/fonts`. Los ejemplos técnicos son educativos y requieren adaptación y validación profesional antes de cualquier instalación.
