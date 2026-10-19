import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareasService } from './servicios/tareas';
import { Tarea } from './interfaces/tarea';
import { TareaItemComponent } from './componentes/tarea-item/tarea-item';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, TareaItemComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private tareasService = inject(TareasService);

  // 1. Signals de estado principal
  tareas = signal<Tarea[]>([]);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);
  nuevoTitulo = signal<string>('');

  // 2. Signals Derivadas (computed)
  totalTareas = computed(() => this.tareas().length);
  completadas = computed(() => this.tareas().filter((t) => t.completed).length);
  porcentaje = computed(() => {
    if (this.totalTareas() === 0) return 0;
    return Math.round((this.completadas() / this.totalTareas()) * 100);
  });

  constructor() {
    // 3. Reacción automática con effect() (Sincronización/Auditoría)
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        console.log(`[Efecto Automático]: Estado de tareas actualizado. Total actual:
        ${this.totalTareas()}`);
        localStorage.setItem('tareas_backup', JSON.stringify(this.tareas()));
      }
    });
  }
  ngOnInit(): void {
    this.cargarTareas();
  }

  // Operación Lectura (GET)
  cargarTareas(): void {
    this.cargando.set(true);
    this.tareasService.getTareas().subscribe({
      next: (data) => {
        // Cogemos las primeras 8 tareas para facilitar las pruebas
        this.tareas.set(data.slice(0, 20));
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con el servidor.');
        this.cargando.set(false);
      },
    });
  }

  // Operación Crear (POST)
  agregarTarea(): void {
    if (!this.nuevoTitulo().trim()) return;
    const nuevaTarea: Omit<Tarea, 'id'> = {
      userId: 1,
      title: this.nuevoTitulo(),
      completed: false,
    };
    this.tareasService.crearTarea(nuevaTarea).subscribe({
      next: (tareaCreada) => {
        // Asignamos un ID temporal único para la demostración visual
        const tareaConId = { ...tareaCreada, id: Date.now() };
        this.tareas.update((lista) => [tareaConId, ...lista]);
        this.nuevoTitulo.set('');
      },
    });
  }

  // Operación Modificar (PATCH)
  toggleTarea(id: number): void {
    const tareaActual = this.tareas().find((t) => t.id === id);
    if (!tareaActual) return;
    this.tareasService.cambiarEstado(id, !tareaActual.completed).subscribe({
      next: () => {
        this.tareas.update((lista) =>
          lista.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
        );
      },
    });
  }

  // Operación Eliminar (DELETE)
  eliminarTarea(id: number): void {
    this.tareasService.eliminarTarea(id).subscribe({
      next: () => {
        this.tareas.update((lista) => lista.filter((t) => t.id !== id));
      },
    });
  }
}
