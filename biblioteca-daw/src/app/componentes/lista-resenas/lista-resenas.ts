import { Component, input, output, signal} from '@angular/core';
import { Resena } from '../../interfaces/resena';

@Component({
  selector: 'app-lista-resenas',
  standalone: true,
  template: `
    <div class="item-card">
      <span>{{ resena().title }}</span>
      <div class="acciones">
        <button class="btn-borrar" (click)="onDelete.emit(resena().id)">Eliminar</button>
      </div>
    </div>
  `,
  styles: [
    `
.item-card { display: flex; justify-content: space-between; padding: 8px; margin-
bottom: 6px; border: 1px solid #ccc; border-radius: 4px; }

.completada span { text-decoration: line-through; color: gray; }
.btn-borrar { background-color: #ff4d4d; color: white; border: none; padding: 4px
8px; border-radius: 3px; cursor: pointer; }
`,
  ],
})
export class ListaResenasComponent {
  cargando = signal<boolean>(true);
  error = signal<boolean>(false);

  // Input requerido usando la API Signal Input
  resena = input.required<Resena>();
  // Outputs para emitir eventos hacia el padre
  onDelete = output<number>();
}
