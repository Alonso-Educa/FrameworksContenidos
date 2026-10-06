import { Injectable, signal } from '@angular/core';

// decorado con @Injectable({ providedIn: 'root' }) para que sea global (Singleton).
@Injectable({
  providedIn: 'root',
})
export class Juegos {
  // array inicial de al menos 5 juegos.
  _juegos = signal<string[][]>([
  ['Titulo1','Plataforma1','Anio1','isPrincipal1'],
  ['Titulo2','Plataforma2','Anio2','isPrincipal2'],
  ['Titulo3','Plataforma3','Anio3','isPrincipal3'],
  ['Titulo4','Plataforma4','Anio4','isPrincipal4'],
  ['Titulo5','Plataforma5','Anio5','isPrincipal5'],
]);

  readonly juegos = this._juegos.asReadonly();
  
  // método público para añadir un nuevo juego a la lista.
  anadirJuego(nuevoJuego: string[]) {
    if (nuevoJuego.length==0) return;
    else if (nuevoJuego[0] == '' || nuevoJuego[1] == '' || nuevoJuego[2] == '' || nuevoJuego[3] == '') return;
    this._juegos.update((listaJuegos) => [...listaJuegos, nuevoJuego]);
  }

  // método público para eliminar un juego pasándole su índice.
  eliminarJuego(index: number) {
    this._juegos.update((listaJuegos) => listaJuegos.filter((_, i) => i !== index));
  }
}