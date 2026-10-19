import { computed, Injectable, signal, effect } from '@angular/core';

// decorado con @Injectable({ providedIn: 'root' }) para que sea global (Singleton).
@Injectable({ providedIn: 'root' })
export class Juegos {
  private _juegos = signal<string[][]>(this.cargar());
  readonly juegos = this._juegos.asReadonly();
  readonly totalJuegos = computed(() => this._juegos().length);

  constructor() {
    effect(() => {
      const lista = this._juegos();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('juegos', JSON.stringify(lista));
      }
    });
  }

  private cargar(): string[][] {
    if (typeof localStorage !== 'undefined') {
      const guardado = localStorage.getItem('juegos');
      if (guardado) {
        try {
          return JSON.parse(guardado);
        } catch {
          /* se usa la lista inicial */
        }
      }
    }
    // array inicial de al menos 5 juegos.
    return [
      ['New Super Mario Bros', 'Nintendo DS', '2006', 'Principal'],
      ['Mario Party 9', 'Wii', '2012', 'Spin-Off'],
      ["Yoshi's New Island", 'Nintendo 3DS', '2014', 'Spin-Off'],
      ['Super Mario Odissey', 'Nintendo Switch', '2017', 'Principal'],
      ['Super Mario 64', 'Nintendo 64', '1996', 'Principal'],
    ];
  }

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
