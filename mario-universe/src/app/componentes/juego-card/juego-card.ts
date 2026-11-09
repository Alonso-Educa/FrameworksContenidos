import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Juego } from '../../interfaces/juego';

// Componente "tonto": no sabe de dónde vienen los datos. Solo pinta y avisa al padre.
@Component({
  selector: 'app-juego-card',
  imports: [RouterLink],   // necesario para usar [routerLink] en esta plantilla
  template: `
    <article class="card" [class.favorita]="favorito()">
      @if (juego().imagenUrl) {
        <img [src]="juego().imagenUrl" [alt]="juego().titulo" />
      } @else {
        <div class="sin-imagen">?</div>
      }

      <div class="cuerpo">
        <h3>{{ juego().titulo }}</h3>
        <p class="meta">{{ juego().plataforma }} · {{ juego().anio }}</p>

        <div>
          @switch (juego().categoria) {
            @case ('Principal') { <span class="badge principal">Principal</span> }
            @case ('Spin-off') { <span class="badge spinoff">Spin-off</span> }
          }
          @if (juego().genero) {
            <span class="badge genero">{{ juego().genero }}</span>
          }
        </div>

        <div class="acciones">
          <!-- Navegación declarativa con parámetro: genera /juegos/5 -->
          <a class="enlace" [routerLink]="['/juegos', juego().id]">Ver ficha →</a>

          <!-- .emit(valor) envía el aviso al padre, que lo recibe en (onToggleFavorito) -->
          <button class="btn btn-secundario" (click)="onToggleFavorito.emit(juego().id)">
            {{ favorito() ? '★ Favorito' : '☆ Favorito' }}
          </button>
          <button class="btn btn-peligro" (click)="onEliminar.emit(juego().id)">Eliminar</button>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .card { background: #fff; border: 2px solid var(--borde); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; height: 100%; }
    .card.favorita { border-color: var(--amarillo); box-shadow: 0 0 0 3px #ffd50066; }
    img, .sin-imagen { width: 100%; height: 150px; object-fit: cover; background: #dde3f0; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
    .cuerpo { padding: .8rem; display: flex; flex-direction: column; gap: .4rem; flex: 1; }
    h3 { margin: 0; font-size: 1.05rem; }
    .meta { margin: 0; color: #666; font-size: .9rem; }
    .acciones { margin-top: auto; display: flex; flex-wrap: wrap; gap: .4rem; align-items: center; }
    .enlace { color: var(--rojo); font-weight: 700; text-decoration: none; margin-right: auto; }
  `],
})
export class JuegoCard {
  // ENTRADAS (padre → hijo). Son signals de solo lectura: se leen con paréntesis.
  juego = input.required<Juego>();   // obligatorio: si el padre no lo pasa, no compila
  favorito = input(false);           // opcional, con valor por defecto

  // SALIDAS (hijo → padre). El tipo es lo que se envía en .emit()
  onToggleFavorito = output<number>();
  onEliminar = output<number>();
}