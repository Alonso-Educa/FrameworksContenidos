import { Component, input, output } from '@angular/core';
@Component({
  selector: 'app-juego-item',
  imports: [],
  template: `
    <div class="tarjeta-juego">
      <section class="inputs">
        <span class="titulo-juego">{{ "Título: "+juego()[0] }}</span><br>
        <span class="plataforma-juego">{{ "Plataforma: "+juego()[1] }}</span><br>
        <span class="anio-juego">{{ "Año de salida: "+juego()[2] }}</span><br>
        <span class="principal-juego">{{ "Principal/Spin-Off: "+juego()[3] }}</span><br>
      </section>
      <button class="btn-borrar" (click)="onBorrarClicked()">Eliminar</button>
    </div>
  `,
  // estilos del ejercicio anterior
  styles: [
    `
      .tarjeta-juego {
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
      .inputs {
        flex: 4;
        position: relative;
      }
      span {
        color: #1e293b;
        font-size: 1rem;
      }
      .btn-borrar {
        flex: 1;
        position: relative;
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
export class JuegoItem {
  // Recibe el juego del componente padre utilizando input.required<string[]>().
  juego = input.required<string[]>();

  // Muestra el juego en su plantilla HTML dentro de una tarjeta con diseño limpio.
  mostrarJuego = output.apply(this.juego);

  // Incluya un botón de "Eliminar".
  onEliminar = output<number>();

  index = input.required<number>();
  // Emita un evento hacia arriba utilizando output<number>() al hacer clic en el botón de borrar, enviando el índice del juego.
  onBorrarClicked() {
    this.onEliminar.emit(this.index());
  }
}
