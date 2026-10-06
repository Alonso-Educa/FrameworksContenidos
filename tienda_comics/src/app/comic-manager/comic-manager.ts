import { Component, signal } from '@angular/core';

interface Comic {
  id: number;
  titulo: string;
  precio: number;
  stock: number;
}

@Component({
  selector: 'app-comic-manager',
  imports: [],
  templateUrl: './comic-manager.html',
  styleUrl: './comic-manager.css',
})
export class ComicManager {
  // Signal para controlar el modo de vista
  mostrarModoCompacto = signal<boolean>(false);
  // Signal con el listado inicial de cómics
  comics = signal<Comic[]>([
    { id: 101, titulo: 'The Amazing Spider-Man #1', precio: 15.99, stock: 3 },
    { id: 102, titulo: 'Batman: The Dark Knight Returns', precio: 22.5, stock: 0 },
    { id: 103, titulo: 'Watchmen', precio: 18.0, stock: 5 },
  ]);

  aumentarStock(idComic: number): void {
    this.comics.update((listaActual) =>
      listaActual.map((item) => (item.id === idComic ? { ...item, stock: item.stock + 1 } : item)),
    );
  }
  venderComic(idComic: number): void {
    this.comics.update((listaActual) =>
      listaActual.map((item) =>
        item.id === idComic && item.stock > 0 ? { ...item, stock: item.stock - 1 } : item,
      ),
    );
  }
  toggleVista(): void {
    this.mostrarModoCompacto.update((estadoActual) => !estadoActual);
  }
  vaciarAlmacen(): void {
    this.comics.update((listaActual) =>
      listaActual.map((item) =>
        item.id ? { ...item, stock: 0 } : item,
      ),
    );
  }
}
