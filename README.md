# TabDim

![TabDim: el brillo, pestaña a pestaña](promocional-1400x560.png)

Hay webs que, de noche, parecen un foco en la cara. TabDim te deja bajar el brillo de esa pestaña y seguir con el resto como estaban.

Cada pestaña tiene su propio ajuste, aunque hayas abierto la misma web dos veces. Mueve el deslizador entre el **10 % y el 100 %** y verás el cambio al momento. Si te pasas, pulsa **Restablecer**.

El ajuste se mantiene al recargar o cambiar de página en esa pestaña. El icono muestra el nivel de brillo, y el botón de sol/luna cambia la apariencia del control.

**TabDim 1.1.1 está pendiente de aprobación en Chrome Web Store.** Cuando esté disponible, aquí encontrarás el enlace para instalarla. Mientras tanto, este repositorio está abierto para quien quiera echar un vistazo al código.

## Así se ve

![Control en modo claro](control-claro.png)
![Control en modo oscuro](control-oscuro.png)

## Cómo funciona

Pulsa el icono de TabDim para ajustar la pestaña que estás viendo. Si tu versión de Chrome lo permite, también puedes abrir el control desde el menú de clic derecho de una pestaña. Esa ventana sigue controlando la misma pestaña aunque cambies a otra. En las versiones sin ese menú, la opción aparece al hacer clic derecho dentro de la página.

TabDim coloca una capa negra transparente sobre la página. Puedes seguir haciendo clic, escribiendo y desplazándote; los estilos de la web se quedan como estaban. Las pestañas nuevas empiezan al 100 %.

Chrome bloquea las extensiones en algunas páginas, como `chrome://` y la propia tienda. Algunos vídeos en pantalla completa, ventanas Picture-in-Picture y elementos que la web coloca por encima de todo pueden quedar fuera de la capa.

## Revisar y probar el código

Los archivos de la extensión están en la raíz y los iconos en `icons/`. Para probarla, descarga el repositorio o `TabDim.zip`, abre `chrome://extensions`, activa **Modo de desarrollador** y pulsa **Cargar descomprimida**. Elige la carpeta que contiene `manifest.json`. Necesitas Chrome 123 o posterior.

- [Manual y permisos](MANUAL.md)
- [Pruebas realizadas y limitaciones](VERIFICACION.md)
- [Descripción y permisos de la ficha de la tienda](FICHA.md)
- [Política de privacidad](PRIVACIDAD.md)

`TabDim-fuentes.zip` reúne el proyecto, las pruebas y los recursos gráficos. `TabDim-WebStore-1.1.1.zip` es la copia de la versión enviada a Google.

## Privacidad

Todo funciona en tu navegador. TabDim no envía datos a servidores ni incluye anuncios o analítica. Usa el título de la pestaña para identificarla en el control, pero no guarda tu historial.

El brillo se guarda durante la sesión y se borra al cerrar la pestaña, reiniciar Chrome o recargar/desactivar la extensión. La preferencia de modo claro u oscuro sí se conserva.

Las pruebas automatizadas se hicieron en Chromium 148. Las comprobaciones que siguen pendientes están detalladas en el [informe de pruebas](VERIFICACION.md).

Hecha por [Vixovi](https://github.com/Vixovi). Para dudas o problemas: [Vixovi@proton.me](mailto:Vixovi@proton.me).
