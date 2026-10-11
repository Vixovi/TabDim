# Verificación realizada — 11 de octubre de 2026

Actualización 1.1.1: botón sol/luna alineado con el título inspeccionado en captura del modo oscuro. Cambio a oscuro por clic y vuelta a claro mediante Enter, persistencia y sincronización comprobadas con la suite completa de Chromium.

Actualización 1.1.0: suite completa superada en Chromium 148, incluidos iconos dibujados con píxeles distintos a 100/55/10 %, títulos de acción independientes a 40/75 %, selector claro/oscuro, persistencia tras recargar el control y sincronización de apariencia entre ventanas. Capturas de ambos temas generadas y modo oscuro inspeccionado visualmente. El dibujo del icono se aplica con `chrome.action.setIcon({tabId, imageData})`; no se ha inspeccionado visualmente su cambio en la barra nativa del Chrome instalado. La preferencia de tema se guarda en `storage.local`, por separado del brillo temporal en `storage.session`.

Pruebas de navegador automatizadas: Chromium **148.0.7778.96**, headless, extensión MV3 cargada en perfil aislado. Código final ejecutado con Playwright local. Las pruebas no utilizan servicios externos.

| Comprobación | Resultado y alcance |
| --- | --- |
| Dos pestañas de misma URL | Superada: 40 %/75 %, comprobación de opacidad real en cada documento. |
| Pestaña nueva | Superada: sin capa, 100 %. |
| Objetivo inactivo | Superada para ventana con tabId fijo; activar otra pestaña no cambia el destino. Clic nativo pendiente. |
| Recarga/navegación | Superada: conserva 30 % después de recarga y navegación a otra ruta HTTP. Cambio a otro dominio no ejecutado. |
| Suspensión del worker | Superada: detenido con CDP `ServiceWorker.stopAllWorkers`; reabrir control recupera 30 % desde session. |
| Interacción | Superada: botón, escritura y scroll reales con capa activa. |
| Iframes | Superada: iframe cargado, sin capa interna. No se probaron iframes entre dominios ni reproducción multimedia. |
| Página dinámica | Superada: eliminar capa desde el DOM provoca su recuperación. |
| Pantalla completa | Superada: contenedor HTML, capa movida al elemento fullscreen y conservada al salir. Vídeo/iframe fullscreen pendientes. |
| Controles simultáneos | Superada: dos ventanas del mismo tabId sincronizadas. |
| Restablecer | Superada: elimina la capa. |
| Página protegida | Superada: `chrome://version` muestra aviso. No se probaron Web Store ni visor PDF. |
| Cierre | Superada: controles desactivados, aviso y clave eliminada de session. |
| Alternativa de menú | Superada en Chromium 148: API rechaza `tab` y registra `page`. |
| Menú tab | API simulada: creación y evento con pestaña inactiva ID 417 correctos. No equivale a prueba del menú real. |

Chrome instalado **154.0.8037.99** fue detectado por la versión del ejecutable. Intentar cargar la extensión en Chrome instalado con flags de automatización no produjo un service worker de extensión: la comprobación terminó por timeout. Por ello **no se ha verificado en Chrome instalado** el menú nativo ni el resto del comportamiento de la extensión. La compatibilidad esperada del contexto `tab` está respaldada por documentación oficial y se comprueba en ejecución mediante la creación real del menú.

No se han verificado visualmente interfaz, contraste percibido, lectura con lector de pantalla, vídeo en reproducción, Picture-in-Picture, páginas locales, permisos restringidos, cierre de navegador, ni navegación a otro dominio. La interfaz usa HTML semántico, slider nativo, foco visible y avisos accesibles; eso es implementación, no una certificación de accesibilidad.

Scripts reproducibles disponibles en la entrega fuente: `tests/browser.cjs`, `tests/menu.cjs`, salida `tests/resultados.txt`. Requieren Playwright; la extensión no. `TEST_CHROME` permite elegir un ejecutable que admita carga de extensiones por flags. Ejecutar desde la carpeta padre de `brillo-por-pestana`. Los cuatro JavaScript de la extensión también pasaron `node --check`.
