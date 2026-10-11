# TabDim — borrador para Chrome Web Store

## Nombre
TabDim

## Desarrollador y soporte
Nombre público: Vixovi.

GitHub: https://github.com/Vixovi

Repositorio público: https://github.com/Vixovi/TabDim

URL de política de privacidad: https://github.com/Vixovi/TabDim/blob/main/PRIVACIDAD.md

Correo público de soporte: Vixovi@proton.me

## Descripción breve
Oscurece cada pestaña de forma independiente con un control de brillo del 10 % al 100 %.

## Descripción completa
Controla el brillo visual de cada pestaña con TabDim. Dos pestañas de la misma web pueden tener brillos distintos.

Abre el control desde el icono de la extensión. En las versiones de Chrome compatibles, también puedes hacer clic derecho sobre una pestaña de la barra superior y elegir «Ajustar brillo de esta pestaña». La ventana independiente permanece vinculada a esa pestaña aunque actives otra. En versiones sin ese contexto de menú, la opción está disponible al hacer clic derecho dentro de la página.

• Brillo del 10 % al 100 %, en pasos de 1 %.
• Cambios en tiempo real y botón Restablecer.
• Conserva el ajuste al recargar o navegar en la misma pestaña.
• Controles en español y accesibles con teclado.
• Apariencia clara u oscura seleccionable y recordada.
• Icono con indicador de nivel que refleja el brillo de cada pestaña.
• Sin cuentas, analítica, anuncios ni servicios externos.

TabDim superpone una capa negra que deja pasar los clics, sin cambiar los filtros CSS de la web. No cambia el brillo del monitor. Las pestañas nuevas empiezan al 100 %. Los ajustes se borran al reiniciar Chrome o recargar/desactivar la extensión.

Chrome impide usarla en páginas protegidas como chrome:// y Chrome Web Store. Vídeos o iframes en pantalla completa, Picture-in-Picture y otros elementos de la capa superior pueden quedar fuera del oscurecimiento.

## Propósito único
Permitir ajustar de forma independiente el brillo visual de cada pestaña del navegador mediante una capa negra local que no intercepta la interacción.

## Justificación de permisos
storage: guardar temporalmente el brillo por ID de pestaña en storage.session, sincronizar los controles abiertos y conservar la preferencia claro/oscuro en storage.local. No se transmite ni sincroniza con servidores.

contextMenus: abrir el control de la pestaña seleccionada desde su menú nativo, con alternativa en el menú de la página cuando el contexto tab no está disponible.

tabs: obtener el título mostrado al usuario y la pestaña activa, y detectar el cierre y navegación de la pestaña objetivo. No se guarda historial de navegación.

scripting: aplicar la capa a documentos ya abiertos y recuperar la aplicación cuando el script del documento no está disponible.

Acceso a hosts HTTP, HTTPS y file: reaplicar el ajuste al recargar y navegar, incluso a otro dominio dentro de la misma pestaña. La autorización temporal activeTab no cubre esta función. El acceso a archivos requiere que el usuario lo habilite en Chrome.

## Datos y código
Sin código remoto. No se recopilan ni transmiten datos a servidores. El título y la URL que proporciona Chrome se usan localmente para la función; no se guarda un historial ni se leen formularios o contenido de la página. El brillo y el ID de pestaña se guardan temporalmente en session.

Revisar las definiciones exactas del formulario de privacidad del panel antes de marcar sus casillas: no confundir el acceso local a metadatos con recolección o transmisión externa.

## Instrucciones de revisión
No se requiere cuenta ni credenciales para usar la extensión. Abrir dos pestañas de una página HTTP/HTTPS, asignar brillos distintos desde el icono y comprobar recarga, navegación y restablecimiento. En Chrome compatible, usar el menú tab en una pestaña inactiva y comprobar que la ventana mantiene ese objetivo. En chrome://version debe aparecer un aviso. Cerrar una pestaña con control abierto debe desactivarlo.

## Pendiente antes de enviar
Cuenta de desarrollador registrada según confirmación del propietario. Identidad y correo público confirmados: Vixovi, Vixovi@proton.me.

Pendientes: URL pública de política de privacidad; imagen promocional 440 × 280; al menos una captura real 1280 × 800 o 640 × 400. Confirmar las pruebas manuales pendientes de VERIFICACION.md. La aprobación depende de Google.
