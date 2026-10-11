# TabDim

![TabDim: el brillo, pestaña a pestaña](promocional-1400x560.png)

Son las dos de la mañana. Abres una web y, por lo visto, has solicitado un interrogatorio.

TabDim baja el brillo de cada pestaña por separado. Porque que una web haya decidido convertirse en un faro no significa que las demás tengan que pagar las consecuencias.

Del **10 % al 100 %**, al momento. Dos pestañas de la misma web pueden tener brillos distintos: sí, incluso ellas tienen derecho a discrepar. El brillo se mantiene al recargar o visitar otra web dentro de la misma pestaña. El icono muestra el nivel de brillo y el control tiene modo oscuro, por aquello de predicar con el ejemplo.

**TabDim 1.1.1 está pendiente de aprobación en Chrome Web Store.** La extensión ya está enviada; ahora le toca a Google. Aquí quedará el enlace cuando esté disponible. Mientras tanto, el código está a la vista para quien prefiera mirar debajo del capó.

## Así se ve

![Control en modo claro](control-claro.png)
![Control en modo oscuro](control-oscuro.png)

## Cómo funciona

Pulsa el icono de TabDim y ajusta el brillo de la pestaña que estás viendo.

También puede abrirse una ventana de control desde el menú de clic derecho de la pestaña, en la barra superior de Chrome. Por ejemplo: si la abres para YouTube y luego te vas a otra pestaña, el deslizador seguirá ajustando YouTube.

Si Chrome no permite añadir esa opción al menú de la barra, TabDim intenta añadirla al menú de clic derecho dentro de la página. Esa alternativa se probó en Chromium 148; el menú de la barra sigue pendiente de comprobación en el Chrome instalado.

TabDim oscurece la página con una capa negra que deja pasar los clics. Puedes seguir escribiendo y desplazándote con normalidad. Los estilos originales de la web no cambian y las pestañas nuevas empiezan al 100 %.

No funciona en páginas donde Chrome bloquea las extensiones, como sus ajustes o la tienda. Algunos vídeos en pantalla completa, vídeos en una ventana flotante (Picture-in-Picture) y elementos como diálogos pueden quedar por encima de la capa y conservar su brillo.

## Revisar y probar el código

Los archivos de la extensión están en la raíz y los iconos en `icons/`. Para probarla, descarga el repositorio o `TabDim.zip`, extrae el ZIP y abre `chrome://extensions`, activa **Modo de desarrollador** y pulsa **Cargar descomprimida**. Elige la carpeta que contiene `manifest.json`. Necesitas Chrome 123 o posterior.

- [Manual y permisos](MANUAL.md)
- [Pruebas realizadas y limitaciones](VERIFICACION.md)
- [Descripción y permisos de la ficha de la tienda](FICHA.md)
- [Política de privacidad](PRIVACIDAD.md)

`TabDim-fuentes.zip` reúne el proyecto, las pruebas y los recursos gráficos. `TabDim-WebStore-1.1.1.zip` es la copia de la versión enviada a Google.

## Privacidad

Todo funciona en tu navegador. Sin anuncios, sin analítica y sin enviar datos a servidores. Bajar el brillo no debería requerir una relación comercial con tu historial. TabDim usa el título para identificar la pestaña en el control; no guarda qué páginas visitas.

El brillo se conserva mientras la pestaña siga abierta. Se borra al cerrarla, reiniciar Chrome, desactivar TabDim o pulsar «Recargar» en sus detalles de extensiones. Recargar la página no borra el ajuste. La preferencia de modo claro u oscuro sí se conserva.

Las pruebas automatizadas se hicieron en Chromium 148. Las comprobaciones que siguen pendientes están detalladas en el [informe de pruebas](VERIFICACION.md).

Hecha por [Vixovi](https://github.com/Vixovi). Para dudas o problemas: [Vixovi@proton.me](mailto:Vixovi@proton.me).
