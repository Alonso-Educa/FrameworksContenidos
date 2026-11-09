import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../interfaces/juego';
import { JuegosService } from '../../servicios/juegos';
import { JuegoCard } from '../juego-card/juego-card';

@Component({
  selector: 'app-lista-juegos',
  imports: [FormsModule, JuegoCard],   // FormsModule → ngModel · JuegoCard → <app-juego-card>
  templateUrl: './lista-juegos.html',
  styleUrl: './lista-juegos.css',
})
export class ListaJuegos {
  // El componente no sabe de dónde vienen los datos: se los pide al servicio.
  // protected → el HTML puede usarlo (servicio.total()), pero no se expone fuera de la clase.
  protected servicio = inject(JuegosService);

  // ===== FILTROS: cada uno es una signal =====
  protected filtro = signal('');
  protected categoria = signal<'Todas' | Categoria>('Todas');
  protected soloFavoritos = signal(false);

  // ===== FILTRO COMBINADO =====
  // computed lee varias signals y se recalcula solo cuando cambia alguna de ellas.
  // Cada letra que escribes en el buscador actualiza la lista al instante.
  protected juegosFiltrados = computed(() => {
    const texto = this.filtro().trim().toLowerCase();
    const cat = this.categoria();
    const soloFavs = this.soloFavoritos();
    const favoritos = this.servicio.favoritos();

    return this.servicio.juegos().filter(j =>
      j.titulo.toLowerCase().includes(texto) &&
      (cat === 'Todas' || j.categoria === cat) &&
      (!soloFavs || favoritos.includes(j.id))
    );
  });

  // ===== FORMULARIO DE ALTA =====
  // generos es un array normal (no cambia nunca), por eso no es una signal.
  protected readonly generos = ['Plataformas', 'Carreras', 'RPG', 'Aventura', 'Fiesta'];
  protected mostrarFormulario = signal(false);
  protected nuevoTitulo = signal('');
  protected nuevaPlataforma = signal('');
  protected nuevoAnio = signal(new Date().getFullYear());
  protected nuevaCategoria = signal<Categoria>('Spin-off');
  protected nuevoGenero = signal('Plataformas');
  protected errorFormulario = signal('');

  // ===== MÉTODOS (los usa el HTML) =====
  // En las plantillas NO se pueden escribir arrow functions (v => !v), por eso estos métodos.
  protected alEscribirFiltro(evento: Event): void {
    // event.target es un elemento genérico: hay que indicar que es un <input>
    this.filtro.set((evento.target as HTMLInputElement).value);
  }

  protected alternarSoloFavoritos(): void {
    this.soloFavoritos.update(v => !v);
  }

  protected alternarFormulario(): void {
    this.mostrarFormulario.update(v => !v);
    this.errorFormulario.set('');
  }

  protected limpiarFiltros(): void {
    this.filtro.set('');
    this.categoria.set('Todas');
    this.soloFavoritos.set(false);
  }

  protected agregar(): void {
    const titulo = this.nuevoTitulo().trim();
    const plataforma = this.nuevaPlataforma().trim();

    if (!titulo || !plataforma) {
      this.errorFormulario.set('El título y la plataforma son obligatorios.');
      return;
    }

    this.servicio.agregar({
      titulo,
      plataforma,
      anio: this.nuevoAnio() || new Date().getFullYear(),   // si el campo queda vacío llega null
      categoria: this.nuevaCategoria(),
      genero: this.nuevoGenero(),
      descripcion: 'Juego añadido manualmente.',
      imagenUrl: '',   // sin imagen: la tarjeta mostrará un "?"
    });

    // Limpiamos el formulario y lo cerramos
    this.nuevoTitulo.set('');
    this.nuevaPlataforma.set('');
    this.errorFormulario.set('');
    this.mostrarFormulario.set(false);
  }

  protected esFavorito(id: number): boolean {
    return this.servicio.favoritos().includes(id);
  }

  protected alternarFavorito(id: number): void {
    this.servicio.alternarFavorito(id);
  }

  protected eliminar(id: number): void {
    this.servicio.eliminar(id);
  }
}