import { Component, signal, computed } from '@angular/core';
import { Libro } from '../../interfaces/libro';

@Component({
  selector: 'app-catalogo',
  imports: [],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo {
  // Datos de prueba
  libros = signal<Libro[]>([
    { id: 1, titulo: 'El nombre de la rosa', autor: 'Umberto Eco', paginas: 512, leido: true },
    { id: 2, titulo: 'El sueño eterno', autor: 'Raymond Chandler', paginas: 288, leido: false },
    { id: 3, titulo: 'Crimen y castigo', autor: 'Fiódor Dostoyevski', paginas: 576, leido: false },
    {
      id: 4,
      titulo: 'Los hombres que no aman a las mujeres',
      autor: 'Stieg Larsson',
      paginas: 624,
      leido: true,
    },
  ]);
  cargando = signal<boolean>(false);

  vaciarCatalogo(): void {
    this.libros.set([]);
  }

  cambiarLeido(idLibro: number): void {
    this.libros.update((listaActual) =>
      listaActual.map((item) =>
        item.id === idLibro ? { ...item, leido: !item.leido} : item,
      ),
    );
  }

  // Signal para controlar el modo de vista
  mostrarModoCompacto = signal<boolean>(false);
  toggleVista(): void {
    this.mostrarModoCompacto.update((estadoActual) => !estadoActual);
  }

  // Señales Derivadas con computed()
  totalLibros = computed(() => this.libros().length);
  totalLeidos = computed(() => this.libros().filter(l => l.leido === true).length);
  paginasPendientes = computed(() => this.libros().filter(l => l.leido == false).reduce((ac, {paginas}) => ac + paginas, 0));
}