Pregunta 1:
ng new biblioteca-daw --routing=true --style=css
cd biblioteca-daw
ng g c componentes/catalogo
ng g s servicios/deseos
ng serve --open

Pregunta 2:
Funciona

Pregunta 3:
node_modules/: Contiene las dependencias del proyecto. No se sube a GitHub ya que es una carpeta muy pesada que contiene miles de elementos.
package.json: Contiene las versiones de las dependencias del proyecto.
src/main.ts: Se encarga de desplegar la aplicación.
src/app/app.config.ts: Contiene la configuración para las rutas y los servicios globales de Angular.
src/app/app.routes.ts: Contiene el listado de rutas del proyecto y cómo/cuándo navegar entre ellas.
src/index.html: Contiene la configuración básica del html que se ve, normalmente no se toca.