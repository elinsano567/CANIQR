CANQR - SISTEMA AUTOMATICO
==========================
Este proyecto usa Netlify Functions + Netlify Blobs, sin Supabase.

FUNCIONAMIENTO
1. registrar.html recibe los datos.
2. crear-mascota guarda los datos y la foto.
3. Se genera un ID unico.
4. mascota.html?id=ID muestra la ficha.
5. mascota.js genera un QR real con la URL publica.
6. El QR se puede descargar como PNG.

ESTRUCTURA
index.html
registrar.html
registrar.js
mascota.html
mascota.js
styles.css
package.json
netlify.toml
netlify/functions/crear-mascota.mjs
netlify/functions/obtener-mascota.mjs
netlify/functions/foto-mascota.mjs

COMO PUBLICAR
1. Descomprime el ZIP.
2. Sube la carpeta a un repositorio de GitHub.
3. En Netlify elige importar el repositorio.
4. Netlify detectara netlify.toml e instalara @netlify/blobs.
5. Despliega.
6. Abre TU-SITIO.netlify.app/registrar.html.

IMPORTANTE
Esta primera version permite registros publicos. Para una version comercial conviene agregar CAPTCHA, limites de registros, inicio de sesion y funciones para editar/eliminar mascotas.
El telefono queda visible en la ficha porque se utiliza para llamar y WhatsApp.
No coloques claves privadas en el codigo.

DOCUMENTACION
Netlify Functions: https://docs.netlify.com/build/functions/get-started/
Netlify Blobs: https://docs.netlify.com/build/data-and-storage/netlify-blobs/
