import { Component, input, output } from '@angular/core';
import { Mision } from '../../interfaces/mision';

@Component({
  selector: 'app-mision-item',
  template: `
    <div class="item" [class.hecha]="mision().completed">
      <span>{{ mision().title }}</span>
      <div class="acciones">
        <button class="btn btn-secundario" (click)="onToggle.emit(mision().id)">
          {{ mision().completed ? 'Desmarcar' : 'Completar' }}
        </button>
        <button class="btn btn-peligro" (click)="onDelete.emit(mision().id)">Eliminar</button>
      </div>
    </div>
  `,
  styles: [`
    .item { display: flex; justify-content: space-between; align-items: center; gap: 1rem; background: #fff; border: 1px solid var(--borde); border-radius: 8px; padding: .6rem .9rem; margin-bottom: .5rem; }
    .item.hecha span { text-decoration: line-through; color: #888; }
    .acciones { display: flex; gap: .4rem; flex-shrink: 0; }
  `],
})
export class MisionItem {
  mision = input.required<Mision>();   // padre → hijo
  onToggle = output<number>();         // hijo → padre: "cambia el estado de este id"
  onDelete = output<number>();         // hijo → padre: "borra este id"
}