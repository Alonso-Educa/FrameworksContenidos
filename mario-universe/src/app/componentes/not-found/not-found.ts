import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Se descarga solo si el usuario escribe una URL que no existe (loadComponent en app.routes.ts).
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="aviso">
      <h2>404 · Esta pantalla no existe</h2>
      <p>Parece que Mario se ha caído por una tubería equivocada.</p>
      <a class="btn" routerLink="/juegos">Volver al catálogo</a>
    </div>
  `,
})
export class NotFound {}