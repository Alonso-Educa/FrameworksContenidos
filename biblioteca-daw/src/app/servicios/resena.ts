import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Resena } from '../interfaces/resena';

@Injectable({ providedIn: 'root' })
export class ResenasService {
  // 1. Inyección limpia del cliente HTTP
  private http = inject(HttpClient);
  // 2. Endpoint de la API REST pública
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  // GET: Obtener todas las resenas del servidor
  getResenas(): Observable<Resena[]> {
    return this.http.get<Resena[]>(this.apiUrl);
  }
  // GET: Obtener una resena por ID filtrando el JSON local con RxJS
    getResenaPorId(id: number): Observable<Resena | undefined> {
        return this.http.get<Resena[]>(this.apiUrl).pipe(
            map(resenas => resenas.find(r => r.id === id))
        );
    }
  // DELETE: Eliminar una resena por ID en el servidor
  eliminarResena(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


