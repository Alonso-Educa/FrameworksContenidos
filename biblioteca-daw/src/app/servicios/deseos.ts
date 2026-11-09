import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeseosService {
  private _deseos = signal<String[]>([
    'El nombre de la rosa',
    'El sueño eterno',
    'Los hombres que no aman a las mujeres',
  ]);

  public listaDeseos = this._deseos.asReadonly();

  // método público para añadir un libro a la lista.
  anadir(nuevoLibro: string) {
    if (nuevoLibro.trim() === '') return;
    this._deseos.update((listaDeseos) => [...listaDeseos, nuevoLibro]);
  }

  // método público para eliminar un libro pasándole su índice.
  eliminar(index: number) {
    this._deseos.update((listaDeseos) => listaDeseos.filter((_, i) => i !== index));
  }

  getDeseos(): Signal<String[]> {
    return this.listaDeseos;
  }
}
