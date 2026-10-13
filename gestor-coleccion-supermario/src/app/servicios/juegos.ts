import { computed, Injectable, signal } from '@angular/core';

// decorado con @Injectable({ providedIn: 'root' }) para que sea global (Singleton).
@Injectable({
  providedIn: 'root',
})
export class Juegos {
  // array inicial de al menos 5 juegos.
  _juegos = signal<string[][]>([
    ['New Super Mario Bros', 'Nintendo DS', '2006', 'Principal'],
    ['Mario Party 9', 'Wii', '2012', 'Spin-Off'],
    ["Yoshi's New Island", 'Nintendo 3DS', '2014', 'Spin-Off'],
    ['Super Mario Odissey', 'Nintendo Switch', '2017', 'Principal'],
    ['Super Mario 64', 'Nintendo 64', '1996', 'Principal'],
  ]);

  readonly juegos = this._juegos.asReadonly();

  // método público para añadir un nuevo juego a la lista.
  anadirJuego(nuevoJuego: string[]) {
    if (nuevoJuego.length == 0) return;
    else if (
      nuevoJuego[0] == '' ||
      nuevoJuego[1] == '' ||
      nuevoJuego[2] == '' ||
      nuevoJuego[3] == ''
    )
      return;
    this._juegos.update((listaJuegos) => [...listaJuegos, nuevoJuego]);
  }

  // método público para eliminar un juego pasándole su índice.
  eliminarJuego(index: number) {
    this._juegos.update((listaJuegos) => listaJuegos.filter((_, i) => i !== index));
  }
}