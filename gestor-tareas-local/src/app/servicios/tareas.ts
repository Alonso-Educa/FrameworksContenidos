import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root', // Lo hace global y Singleton automáticamente
})
export class TareasService {
  // Estado centralizado reactivo con Signals
  private _tareas = signal<string[]>([
    'Aprender componentes standalone en Angular',
    'Configurar el flujo de input y output',
    'Dominar la inyección de dependencias con inject()',
  ]);

  // Exponemos las tareas en modo de solo lectura o acceso directo
  readonly tareas = this._tareas.asReadonly();

  // Método para añadir una nueva tarea
  agregarTarea(nuevaTarea: string) {
    if (nuevaTarea.trim() === '') return;
    this._tareas.update((listaActual) => [...listaActual, nuevaTarea]);
  }
  // Método para eliminar una tarea por su índice
  eliminarTarea(index: number) {
    this._tareas.update((listaActual) => listaActual.filter((_, i) => i !== index));
  }
}

export class Tareas {}
