# TwoLifes

## Integrantes del equipo

- Emmanuel Eduardo [@Devmmanuel](https://github.com/devmmanuel)
- Javier Tapia [@TapiaXavier](https://github.com/tapiaXavier)
- Ana Castillo [@canastillo](https://github.com/canastillo)
- Antonio [@acast23](https://github.com/acast23)

## Descripción del proyecto 

API en la que se puede consultar datos de videojuegos. 
Los usuarios pueden comprar y vender videojuegos de segunda mano, especificando título, plataforma, idioma y precio. 
La información disponible del videojuego son título, fecha de lanzamiento, plataformas disponibles, idiomas disponibles, sinopsis, clasificación y género. Los usuarios pueden dejar opiniones sobre los videojuegos. 
Asi como calificar a los vendedores y dejar sus opiniones.

Para crear una plataforma interactiva para que todo tipo de videjuegos pueden tener una continuidad de uso para usuarios interesados en obtenerlos.

## Desarrollo del proyecto 

### Historias de Usuario

- “Como anunciante, quiero anunciar que vendo un videojuego para obtener dinero de algo que ya no necesito”
- “Como anunciante, quiero poder modificar mis anuncios para bajar o subir el precio de un videojuego”
- “Como anunciante, quiero eliminar mis anuncios cuando ya no me interese vender”
- “Como anunciante, quiero visualizar todos mis anuncios pasados y actuales”

- “Como comprador, quiero ver los videojuegos en venta para ver si está un videojuego que quiero”
- “Como comprador, quiero poder confirmar una compra para obtener un videojuego que quiero a un precio más bajo”
- “Como comprador, quiero calificar a un vendedor para que los demás compradores sepan si es de confiar o no”
- “Como comprador, quiero dejar una reseña sobre el vendedor para que los demás compradores sepan mi experiencia”
- “Como comprador, quiero visualizar todos los anuncios que he solicitado comprar, para saber cuáles han sido aceptadas y cuáles no”
- “Como comprador, quiero ingresar en un buscador la búsqueda de algún videojuego, para obtener un resultado más rápido y preciso”
- “Como comprador, quisiera agrupar la vista de elementos por género”

- “Como administrado, quisiera tener el control de gestionar a todos los usuarios“

### Diagrama de Casos de Uso


### Reglas de negocio 

- Para que ocurra una venta, un comprador debe indicar que le interesa un videojuego que un anunciante esté vendiendo. El anunciante debe entonces aceptar la solicitud del comprador.
- El anunciante no puede modificar el precio de los videojuegos si hay solicitudes pendientes.
Una solicitud pendiente es una solicitud que el anunciante no ha aceptado ni rechazado.
- El anunciante no puede modificar el precio de los videojuegos si ya ha aceptado una solicitud.
- El anunciante no puede eliminar el anuncio si ha aceptado una solicitud.
- El comprador no puede anular una solicitud si el anunciante ya la ha aceptado.
- El anunciante puede dar de baja una solicitud, al aceptarla, solo si, el comprador no cumple con las especificaciones de compra


## Estrucutura del proyecto 

### Entidades 
La entidades que interactuan dentro del proyecto son: 
* 
