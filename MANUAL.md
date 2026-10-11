# TabDim

Extensión local de Chrome, Manifest V3, sin dependencias, código remoto, analítica ni servicios externos. Cada `tabId` tiene su propio brillo: dos pestañas de la misma URL pueden usar valores distintos.

Versión 1.1.1: icono dinámico por pestaña con indicador de nivel amarillo y botón **sol/luna** a la derecha del título, dentro del popup y la ventana independiente. La luna activa el modo oscuro y el sol vuelve al claro. La preferencia se guarda en `storage.local`, se comparte entre controles y se conserva al reiniciar Chrome. Solo cambia la interfaz de TabDim.

## Instalación

1. Extrae `TabDim.zip` en una carpeta permanente. Chrome no carga ZIP directamente.
2. Abre `chrome://extensions` y activa **Modo de desarrollador**.
3. Pulsa **Cargar descomprimida** y selecciona la carpeta que contiene `manifest.json`.
4. Fija el icono desde el menú de extensiones. Pulsa el icono para ajustar la pestaña activa entre 10 % y 100 %. Usa las flechas del teclado sobre el deslizador o pulsa **Restablecer**.
5. Haz clic derecho sobre una pestaña de la barra superior y selecciona **Ajustar brillo de esta pestaña**. La ventana muestra su título y mantiene el mismo objetivo aunque actives otra pestaña.

Chrome mínimo: 123. Chrome instalado detectado durante el desarrollo: **154.0.8037.99**. El contexto `tab` está documentado actualmente y fue anunciado para Chrome 150: [referencia oficial](https://developer.chrome.com/docs/extensions/reference/api/contextMenus), [anuncio de Chromium](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/RReE8dtY4Ok/m/hOQaYDNYAwAJ).

La extensión intenta crear realmente el menú con `contexts: ['tab']`; captura tanto excepciones síncronas como `runtime.lastError`. Si falla, registra `contexts: ['page']`. En ese caso la opción aparece **dentro de la página**, no en la barra de pestañas; el popup sigue disponible. El resultado está en `chrome.storage.session`, clave `menuContext`, consultable desde la consola del service worker.

## Permisos y privacidad

- `storage`: brillo por ID en `storage.session`, resultado de compatibilidad y preferencia persistente de apariencia en `storage.local`. No sincroniza con una cuenta.
- `contextMenus`: opción nativa y alternativa en la página.
- `tabs`: leer el título de la pestaña objetivo, incluso si está protegida, consultar la activa y detectar navegación/cierre.
- `scripting`: inyectar en páginas ya abiertas antes de instalar la extensión y recuperar la comunicación con el documento principal.
- Hosts HTTP, HTTPS y archivos: aplicación automática tras navegar en la misma pestaña, incluso a otro dominio. `activeTab` solo no garantiza ese acceso después de una navegación. Chrome puede pedir acceso amplio a sitios; se utiliza exclusivamente para la capa local. Para `file://`, activa **Permitir acceso a URLs de archivo** en los detalles de la extensión.

Si restringes el acceso a sitios, las páginas sin permiso muestran un aviso; la preferencia se conserva para la siguiente página accesible. No se solicita `webNavigation`, acceso a historial, red ni permisos opcionales innecesarios.

## Funcionamiento y límites

`state.js` gestiona el estado; `worker.js`, la coordinación y los menús; `control.*`, las dos interfaces; `shade.js`, una sola capa negra en el documento principal. Opacidad = `1 - brillo / 100`, `pointer-events: none`. No se cambian filtros, estilos, textos, imágenes ni colores de la página. Al 100 % se elimina la capa y se desconecta su observador. Los iframes quedan visualmente cubiertos por la capa superior sin inyectar otra dentro de ellos.

La capa usa un popover manual para entrar en la capa superior sin bloquear interacción; recupera su posición si una página dinámica la elimina y se mueve al elemento de pantalla completa cuando es posible. Una web puede abrir después otro diálogo/popover por encima de ella o manipular deliberadamente el DOM. Un vídeo, canvas o iframe en pantalla completa puede no pintar hijos HTML superpuestos; la pantalla completa interna de un iframe y Picture-in-Picture no están garantizadas. No es posible oscurecer ventanas separadas del vídeo, controles de Chrome ni el monitor. No se modifica el contenido de la web para sortear esas limitaciones.

Chrome impide inyección en `chrome://`, Chrome Web Store, páginas de otras extensiones y otras superficies protegidas (incluido su visor PDF cuando sea un documento del navegador). Se muestra un aviso claro; el valor guardado podrá aplicarse al navegar a una página accesible. Puede verse brevemente el brillo original durante una navegación mientras llega la respuesta del worker.

El estado sobrevive a la suspensión del service worker, recarga y navegación, pero `storage.session` se borra al reiniciar el navegador, desactivar o recargar la extensión. Las pestañas nuevas y duplicadas empiezan al 100 %. Cerrar la pestaña limpia su estado y desactiva las interfaces abiertas. Las ventanas independientes cerradas no cierran la pestaña controlada.

## Verificación

Consulta `VERIFICACION.md` para resultados reales y comprobaciones manuales no ejecutadas. Los scripts de pruebas son herramientas de desarrollo y no se incluyen en la extensión ni son necesarios para instalarla.

Para pruebas manuales: abre dos pestañas iguales y asigna 35 %/80 %; usa el menú nativo sobre la inactiva; recarga y navega a otro dominio; detén el worker desde las herramientas de extensiones y vuelve a abrir el control; prueba enlaces, formularios, scroll, vídeo, iframe y pantalla completa; restablece; abre `chrome://version`; por último cierra una pestaña con su ventana de control abierta.
