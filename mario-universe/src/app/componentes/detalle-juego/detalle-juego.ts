import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { JuegosService } from '../../servicios/juegos';

@Component({
  selector: 'app-detalle-juego',
  template: `
    @if (servicio.cargando()) {
      <p class="aviso">Cargando ficha...</p>
    } @else {
      <!-- "as j" guarda el resultado en una variable local de la plantilla -->
      @if (juego(); as j) {
        <article class="ficha">
          @if (j.imagenUrl) {
            <img [src]="j.imagenUrl" [alt]="j.titulo" />
          }
          <h2>{{ j.titulo }}</h2>
          <p><strong>ID:</strong> #{{ j.id }} · <strong>Plataforma:</strong> {{ j.plataforma }} · <strong>Año:</strong> {{ j.anio }}</p>
          <p>
            <strong>Categoría:</strong> {{ j.categoria }}
            @if (j.genero) { · <strong>Género:</strong> {{ j.genero }} }
          </p>
          <p class="descripcion">{{ j.descripcion }}</p>

          <div class="botones">
            <button class="btn btn-secundario" (click)="volver()">← Volver al catálogo</button>
            <button class="btn" (click)="alternarFavorito()">
              {{ esFavorito() ? '★ Quitar de favoritos' : '☆ Añadir a favoritos' }}
            </button>
          </div>

          <!-- Navegación programática entre fichas -->
          <div class="botones">
            @if (anterior(); as ant) {
              <button class="btn btn-peligro" (click)="irA(ant.id)">← {{ ant.titulo }}</button>
            }
            @if (siguiente(); as sig) {
              <button class="btn btn-peligro" (click)="irA(sig.id)">{{ sig.titulo }} →</button>
            }
          </div>
        </article>
      } @else {
        <p class="aviso error">No se encontró el juego #{{ id() }}.</p>
        <button class="btn" (click)="volver()">Volver al catálogo</button>
      }
    }
  `,
  styles: [`
    .ficha { max-width: 640px; margin: 1rem auto; background: #fff; border: 2px solid var(--rojo); border-radius: 12px; padding: 1.2rem; }
    .ficha img { width: 100%; border-radius: 8px; }
    .descripcion { background: #fff5f5; border-left: 4px solid var(--rojo); padding: .7rem; border-radius: 4px; }
    .botones { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1rem; }
  `],
})
export class DetalleJuego {
  protected servicio = inject(JuegosService);
  private router = inject(Router);   // para navegar desde el código

  // Angular rellena este input con el :id de la URL gracias a withComponentInputBinding().
  // El nombre tiene que coincidir con el de la ruta (:id → id). Llega como TEXTO.
  id = input.required<string>();

  // computed en lugar de ngOnInit: se recalcula si cambia el id o si el catálogo termina de cargar.
  protected juego = computed(() => this.servicio.juegos().find(j => j.id === Number(this.id())));
  protected esFavorito = computed(() => this.servicio.favoritos().includes(Number(this.id())));

  private indice = computed(() => this.servicio.juegos().findIndex(j => j.id === Number(this.id())));
  protected anterior = computed(() => this.servicio.juegos()[this.indice() - 1]);   // undefined si no hay
  protected siguiente = computed(() => this.servicio.juegos()[this.indice() + 1]);

  protected alternarFavorito(): void {
    this.servicio.alternarFavorito(Number(this.id()));
  }

  protected volver(): void {
    this.router.navigate(['/juegos']);
  }

  protected irA(id: number): void {
    this.router.navigate(['/juegos', id]);   // equivale a /juegos/5
  }
}