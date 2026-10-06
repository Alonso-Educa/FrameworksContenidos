import { Component, input, output } from '@angular/core';
@Component({
  selector: 'app-tarea-item',
  imports: [],
  template: `
    <div class="tarjeta-tarea">
      <span class="texto-tarea">{{ tarea() }}</span>
      <button class="btn-borrar" (click)="onBorrarClicked()">Eliminar</button>
    </div>
  `,
  // estilos del ejercicio anterior
  styles: [
    `
      .tarjeta-tarea {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      }
      .texto-tarea {
        color: #1e293b;
        font-size: 1rem;
      }
      .btn-borrar {
        background-color: #ef4444;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
      }
      .btn-borrar:hover {
        background-color: #dc2626;
      }
    `,
  ],
})
export class TareaItem {
  // Recibe la tarea del componente padre utilizando input.required<string>().
  tarea = input.required<string>();

  // Muestra la tarea en su plantilla HTML dentro de una tarjeta con diseño limpio.
  mostrarTarea = output.apply(this.tarea);

  // Incluya un botón de "Eliminar".
  onEliminar = output<number>();

  index = input.required<number>();
  // Emita un evento hacia arriba utilizando output<number>() al hacer clic en el botón de borrar, enviando el índice de la tarea.
  onBorrarClicked() {
    this.onEliminar.emit(this.index());
  }
}
