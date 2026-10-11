# TabDim — ficha de Chrome Web Store

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

Son las dos de la mañana. Abres una web y, por lo visto, has solicitado un interrogatorio.

TabDim baja el brillo de cada pestaña por separado. Porque que una web haya decidido convertirse en un faro no significa que las demás tengan que pagar las consecuencias.

Ajusta el brillo del 10 % al 100 %, al momento. Dos pestañas de la misma web pueden tener valores distintos: sí, incluso ellas tienen derecho a discrepar. El ajuste se mantiene al recargar y cambiar de página dentro de esa pestaña.

El icono muestra el nivel de brillo. El control tiene modo claro y oscuro, por aquello de predicar con el ejemplo.

En las versiones compatibles de Chrome, el menú de clic derecho de la pestaña abre una ventana que sigue controlándola aunque te vayas a otra. Si Chrome no admite ese menú, la opción aparece al hacer clic derecho dentro de la página.

TabDim coloca una capa negra transparente sobre la web. Los clics, la escritura y el scroll siguen funcionando; los estilos originales se quedan como estaban. Las pestañas nuevas empiezan al 100 % y los ajustes se borran al reiniciar Chrome o recargar/desactivar la extensión.

Sin cuentas, anuncios ni analítica. Todo funciona en tu navegador y no se envían datos a servidores. Bajar el brillo no debería requerir una relación comercial con tu historial.

Chrome bloquea su uso en páginas protegidas, como chrome:// y la propia tienda. Algunos vídeos o iframes en pantalla completa, ventanas Picture-in-Picture y elementos de la capa superior pueden quedar fuera del oscurecimiento.

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

## Instrucciones de revisión
No se requiere cuenta ni credenciales para usar la extensión. Abrir dos pestañas de una página HTTP/HTTPS, asignar brillos distintos desde el icono y comprobar recarga, navegación y restablecimiento. En Chrome compatible, usar el menú tab en una pestaña inactiva y comprobar que la ventana mantiene ese objetivo. En chrome://version debe aparecer un aviso. Cerrar una pestaña con control abierto debe desactivarlo.

## Estado de publicación

TabDim 1.1.1 está enviada a Chrome Web Store y pendiente de aprobación. Las pruebas realizadas y las comprobaciones pendientes están en [VERIFICACION.md](VERIFICACION.md).
