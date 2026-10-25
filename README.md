# Saberes energéticos · La Uni × FeME

Micrositio bilingüe de aprendizaje comunitario, talleres solares y réplica de experiencias. Coordinación académica: Dra. Luz Dehni Acosta Moyado. Universidades La Uni, Ingeniería Ambiental, en colaboración con FeME.

Edición para **GitHub Pages** con código público. Contiene materiales seleccionados para difusión. Los registros originales y la administración de evidencias permanecen separados; no se incluyen aquí.

## Trabajar en el sitio

Requiere Node.js 22.13 o posterior y pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm run dev
pnpm run build
pnpm run preview
```

La ruta base es `/FeME-proyect/`. Para otro repositorio o dominio, ajustar `SITE_BASE` y el flujo. `dist` es el único directorio que se publica como web. No subir originales, credenciales, `.git` o `node_modules` al alojamiento.

## Publicar una versión revisada

GitHub, Settings > Pages > Source: **GitHub Actions**. En Actions > **Publicar versión revisada** > Run workflow, seleccionar main y marcar reviewed tras revisar todo el contenido. El flujo instala dependencias, comprueba, compila y publica únicamente dist. Usa el token temporal de GitHub Actions; no requiere tokens personales ni otro servicio.

Un push o pull request ejecuta verificaciones, sin publicar. La publicación es manual para revisar nuevas evidencias.

## Privacidad

- Sin analíticas, publicidad, formularios, cuentas de visitantes, geolocalización ni acceso a cámara o micrófono.
- Logos y fuentes locales; sin recursos externos automáticos. Los enlaces externos se abren con `noreferrer` solo al elegirlos.
- CSP y `no-referrer` mediante metaetiquetas. `_headers` se usa en la vista previa local y solo es efectivo en alojamientos compatibles; GitHub Pages no permite personalizar todas las cabeceras HTTP.
- Sin nombres del alumnado, contactos privados, direcciones ni coordenadas. El video expresamente autorizado se sirve localmente, con subtítulos integrados en inglés y sin reproducción automática. Su contenedor no incluye etiquetas de ubicación. Los demás registros de la Colectiva permanecen privados.
- Fotografías institucionales de La Uni seleccionadas para este sitio y recodificadas sin EXIF/XMP/GPS. El botón + ahorra espacio; **no controla el acceso**. Las imágenes del repositorio y sus URL son públicas.
- Guías PDF con ambos logos y autoría institucional. Idioma y lista de revisión permanecen en el navegador.

La autoría profesional y la cuenta de GitHub son públicas por decisión de su titular. Los proveedores pueden procesar IP y datos de conexión para entregar y proteger el servicio. Esta configuración no garantiza anonimato absoluto ni elimina información publicada previamente en otros sitios.

## Añadir evidencias

Conservar los originales fuera del repositorio. Preparar copias sin contactos, coordenadas, fondos identificables ni metadatos personales. Rostros y voces requieren autorización específica del archivo y destino; el permiso del video no se extiende a otros archivos. No enlazar carpetas de originales.

1. Guardar la copia revisada en `public/evidence/`, con nombre neutral. Se admiten WebP sin EXIF/XMP y PDF revisados; máximo 25 MiB por archivo.
2. Añadir un elemento a `items` en `public/data/catalogo.json`:

```json
{
  "id": "actividad-01",
  "title": {"es": "Registro del taller", "en": "Workshop record"},
  "body": {"es": "Descripción general sin datos sensibles.", "en": "General description without sensitive information."},
  "category": "talleres",
  "file": "/evidence/actividad-01.webp",
  "mime": "image/webp",
  "reviewedForPublication": true
}
```

3. Revisar ambos idiomas, abrir los archivos y ejecutar build. La marca de revisión exige comprobar realmente el contenido; los controles automáticos no reconocen todas las personas o localizaciones.
4. Publicar manualmente tras la revisión.

## Derechos y fuentes

Las marcas La Uni y FeME pertenecen a sus titulares. No se concede una licencia general de redistribución de marcas o fotografías. Las fuentes conservan sus licencias OFL en `public/assets/fonts`. Los ejemplos técnicos son educativos y requieren adaptación y validación profesional antes de una instalación.

[GitHub Pages con flujos personalizados](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) · [Vite en GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages)

## Cuadernos y presentaciones

La biblioteca contiene 22 PDFs diferentes: guía de co-creación, siete fichas por sección y tres cuadernos de taller, cada uno en español e inglés. `src/learning.json` define los destinos y la checklist explicada. Las descargas se verifican para rechazar rutas y bytes duplicados. Ambos Genially se abren sólo mediante enlaces externos elegidos por la persona visitante.

El archivo `scripts/reviewed-media.json` identifica los bytes del video y sus subtítulos revisados. Cambiarlos requiere revisar de nuevo contenido, autorización y metadatos antes de actualizar los hashes.
