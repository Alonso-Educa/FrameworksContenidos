import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../interfaces/tarea';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  // 1. Inyección limpia del cliente HTTP
  private http = inject(HttpClient);
  // 2. Endpoint de la API REST pública
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  // GET: Obtener todas las tareas del servidor
  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl);
  }
  // POST: Enviar una nueva tarea al backend
  crearTarea(nuevaTarea: Omit<Tarea, 'id'>): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, nuevaTarea);
  }
  // PATCH: Modificar únicamente el estado 'completed' de una tarea
  cambiarEstado(id: number, completed: boolean): Observable<Tarea> {
    return this.http.patch<Tarea>(`${this.apiUrl}/${id}`, { completed });
  }
  // DELETE: Eliminar una tarea por ID en el servidor
  eliminarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
