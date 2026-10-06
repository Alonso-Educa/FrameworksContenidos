import { Injectable, signal } from '@angular/core';

// decorado con @Injectable({ providedIn: 'root' }) para que sea global (Singleton).
@Injectable({
  providedIn: 'root',
})
export class Tareas {
  // array inicial de almenos 3 cadenas de texto (tareas de ejemplo).
  _tareas = signal<string[]>([
    'Tarea inicial 1 de frameworks',
    'Tarea inicial 2 de diseño de interfaces web',
    'Tarea inicial 3 de entorno servidor y cliente',
    'Tarea inicial 4 de despliegue',
  ]);

  readonly tareas = this._tareas.asReadonly();
  
  // método público para añadir una nueva tarea a la lista.
  anadirTarea(nuevaTarea: string) {
    if (nuevaTarea.trim() === '') return;
    this._tareas.update((listaTareas) => [...listaTareas, nuevaTarea]);
  }

  // método público para eliminar una tarea pasándole su índice.
  eliminarTarea(index: number) {
    this._tareas.update((listaTareas) => listaTareas.filter((_, i) => i !== index));
  }
}
