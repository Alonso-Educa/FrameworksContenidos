import { Component, inject, signal } from '@angular/core';
import { Tareas } from './servicios/tareas';
import { TareaItem } from './componentes/tarea-item/tarea-item';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TareaItem], // <-- IMPORTANTE: Importamos el componente hijo aquí
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Inyecta el servicio TareasService en el AppComponent utilizando la función moderna inject().
  private tareasService = inject(Tareas);
  // Conecta la lista de tareas del servicio con el componente padre.
  listaTareas = this.tareasService._tareas;
  // Prepara una Signal local y un formulario básico (input de texto + botón) en la
  // plantilla del padre para dar de alta nuevas tareas interactivamente.
  nuevaTareaInput = signal('');
  actualizarTexto(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.nuevaTareaInput.set(valor);
  }
  agregar() {
    this.tareasService.anadirTarea(this.nuevaTareaInput());
    this.nuevaTareaInput.set(''); // Limpiamos el input
  }
  borrar(index: number) {
    this.tareasService.eliminarTarea(index);
  }
}