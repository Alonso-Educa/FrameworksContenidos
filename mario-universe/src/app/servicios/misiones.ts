import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Mision } from '../interfaces/mision';

// El servicio encapsula TODA la lógica de red. Los componentes no conocen la URL.
@Injectable({ providedIn: 'root' })
export class MisionesService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  // GET: leer. pipe(map) se queda solo con las 8 primeras para facilitar las pruebas.
  getMisiones(): Observable<Mision[]> {
    return this.http.get<Mision[]>(this.apiUrl).pipe(map(todas => todas.slice(0, 8)));
  }

  // POST: crear. Omit<Mision, 'id'> = una misión sin id (lo asigna el servidor).
  crear(nueva: Omit<Mision, 'id'>): Observable<Mision> {
    return this.http.post<Mision>(this.apiUrl, nueva);
  }

  // PATCH: modificar solo un campo.
  cambiarEstado(id: number, completed: boolean): Observable<unknown> {
    if (!this.existeEnServidor(id)) return of(null);   // of() crea un Observable que emite al instante
    return this.http.patch<Mision>(`${this.apiUrl}/${id}`, { completed });
  }

  // DELETE: borrar.
  eliminar(id: number): Observable<unknown> {
    if (!this.existeEnServidor(id)) return of(null);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // JSONPlaceholder es una API de pruebas: acepta los POST pero NO guarda nada.
  // Solo los ids 1-200 existen de verdad; para las misiones creadas aquí (ids locales)
  // un PATCH o un DELETE darían error, así que las resolvemos sin llamar al servidor.
  private existeEnServidor(id: number): boolean {
    return id <= 200;
  }
}