import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DeseosService } from '../../servicios/deseos';

@Component({
  selector: 'app-lista-deseos',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <!-- Formulario POST -->
    <div class="formulario">
      <input
        type="text"
        [ngModel]="nuevoTitulo()"
        (ngModelChange)="nuevoTitulo.set($event)"
        placeholder="Escribe un título para el deseo..."
      />
      <button (click)="anadir()">Añadir deseo</button>
    </div>
    <div class="contenedor">
      <h2>Catálogo de deseos</h2>
      <!-- Métricas calculadas con computed() -->
      <div class="panel-info">
        <p><strong>Total de Juegos:</strong> {{ totalDeseos() }}</p>
      </div>
      @if (cargando()) {
        <p class="loader">Cargas de deseos desde la API...</p>
      } @else {
        <div class="grid-deseos">
          @for (deseo of deseos(); track deseo) {
            <div class="card-deseo">
              <h3>{{ deseo }}</h3>
              <button (click)="eliminar(deseo)">Eliminar</button>
            </div>
          } @empty {
            <p>No hay deseos disponibles en el catálogo.</p>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .contenedor {
        max-width: 900px;
        margin: 0 auto;
        padding: 1rem;
      }

      .panel-info {
        display: flex;
        gap: 2rem;
        background: #e6f2ff;
        padding: 10px;
        border-radius: 6px;
      }

      .grid-deseos {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
      }
      .card-deseo {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
        background: #fff;
      }

      .btn-detalle {
        display: inline-block;
        margin-top: 10px;
        color: #d00000;
        font-weight: bold;
        text-decoration: none;
      }
      .loader {
        font-size: 1.2rem;
        color: #666;
      }
    `,
  ],
})
export class ListaDeseosComponent implements OnInit {
  private deseosService = inject(DeseosService);
  // Estados Reactivos
  deseos = signal<string[]>([]);
  nuevoTitulo = signal<string>('');
  cargando = signal<boolean>(true);
  // Señales Derivadas con computed()
  totalDeseos = computed(() => this.deseos().length);

  constructor() {
    // Reacción automática con effect()
    effect(() => {
      console.log(`[Efecto Auditoría]: El catálogo actual tiene ${this.totalDeseos()} deseos.`);
    });
  }

  ngOnInit(): void {
    // Petición HTTP al servidor
    const datos = this.deseosService.getDeseos()();
    this.deseos.set(datos.map((deseo) => String(deseo)));
    this.cargando.set(false);
  }

  anadir(): void {
    const titulo = this.nuevoTitulo().trim();
    if (!titulo) return;

    this.deseos.update((lista) => [...lista, titulo]);
    console.log('Tarjeta creada: ' + this.nuevoTitulo);
    this.nuevoTitulo.set('');
  }

  eliminar(deseo: string): void {
    this.deseos.update((lista) => lista.filter((item) => item !== deseo));
  }
}
