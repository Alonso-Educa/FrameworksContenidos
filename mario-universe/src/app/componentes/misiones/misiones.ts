import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Mision } from '../../interfaces/mision';
import { MisionesService } from '../../servicios/misiones';
import { MisionItem } from '../mision-item/mision-item';

@Component({
  selector: 'app-misiones',
  imports: [FormsModule, MisionItem],
  templateUrl: './misiones.html',
  styleUrl: './misiones.css',
})
export class Misiones implements OnInit {
  private servicio = inject(MisionesService);

  // Aquí el estado vive en el componente (en el catálogo vivía en el servicio)
  protected misiones = signal<Mision[]>([]);
  protected cargando = signal(true);
  protected error = signal<string | null>(null);
  protected nuevoTitulo = signal('');

  // Métricas derivadas
  protected total = computed(() => this.misiones().length);
  protected completadas = computed(() => this.misiones().filter(m => m.completed).length);
  protected porcentaje = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.completadas() / this.total()) * 100)
  );

  constructor() {
    // effect: reacción automática cada vez que cambian total o completadas (auditoría en consola)
    effect(() => {
      console.log(`[effect] Misiones: ${this.completadas()} de ${this.total()} completadas`);
    });
  }

  // ngOnInit se ejecuta una vez, cuando el componente está listo: sitio ideal para el primer GET
  ngOnInit(): void {
    this.cargar();
  }

  // ===== GET =====
  protected cargar(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.servicio.getMisiones().subscribe({
      next: datos => {
        this.misiones.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con el servidor.');
        this.cargando.set(false);
      },
    });
  }

  // ===== POST =====
  protected agregar(): void {
    const titulo = this.nuevoTitulo().trim();
    if (!titulo) return;

    this.servicio.crear({ userId: 1, title: titulo, completed: false }).subscribe({
      next: respuesta => {
        // La API siempre responde con id 201, así que le damos un id local único
        const nueva: Mision = { ...respuesta, id: Date.now() };
        this.misiones.update(lista => [nueva, ...lista]);
        this.nuevoTitulo.set('');
      },
      error: () => this.error.set('No se pudo crear la misión.'),
    });
  }

  // ===== PATCH =====
  protected alternar(id: number): void {
    const actual = this.misiones().find(m => m.id === id);
    if (!actual) return;
    const nuevoEstado = !actual.completed;

    this.servicio.cambiarEstado(id, nuevoEstado).subscribe({
      // Solo cuando el servidor responde bien actualizamos la signal local
      next: () => this.misiones.update(lista =>
        lista.map(m => (m.id === id ? { ...m, completed: nuevoEstado } : m))
      ),
      error: () => this.error.set('No se pudo actualizar la misión.'),
    });
  }

  // ===== DELETE =====
  protected eliminar(id: number): void {
    this.servicio.eliminar(id).subscribe({
      next: () => this.misiones.update(lista => lista.filter(m => m.id !== id)),
      error: () => this.error.set('No se pudo eliminar la misión.'),
    });
  }
}