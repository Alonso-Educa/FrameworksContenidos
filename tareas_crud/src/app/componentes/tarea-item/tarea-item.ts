import { Component, input, output } from '@angular/core';
import { Tarea } from '../../interfaces/tarea';

@Component({
  selector: 'app-item-tarea',
  standalone: true,
  template: `
    <div class="item-card" [class.completada]="tarea().completed">
      <span>{{ tarea().title }}</span>
      <div class="acciones">
        <button (click)="onToggle.emit(tarea().id)">
          {{ tarea().completed ? 'Desmarcar' : 'Completar' }}
        </button>
        <button class="btn-borrar" (click)="onDelete.emit(tarea().id)">Eliminar</button>
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
export class TareaItemComponent {
  // Input requerido usando la API Signal Input
  tarea = input.required<Tarea>();
  // Outputs para emitir eventos hacia el padre
  onToggle = output<number>();
  onDelete = output<number>();
}
