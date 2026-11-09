import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContadorVidas } from './componentes/contador-vidas/contador-vidas';
import { JuegosService } from './servicios/juegos';

@Component({
  selector: 'app-root',   // es la etiqueta que aparece en index.html
  // Todo lo que use app.html tiene que estar aquí; si falta, da error de elemento desconocido
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ContadorVidas],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private juegosService = inject(JuegosService);

  // protected = accesible desde el HTML pero no desde fuera de la clase.
  // Son las MISMAS signals del servicio, así que la cabecera se actualiza sola.
  protected total = this.juegosService.total;
  protected totalFavoritos = this.juegosService.totalFavoritos;
}