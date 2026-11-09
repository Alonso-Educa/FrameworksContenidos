import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Juego } from '../interfaces/juego';

@Injectable({ providedIn: 'root' })
export class JuegosService {
    private http = inject(HttpClient);
    private apiUrl = '/juegos.json';
    // GET: Obtener todo el catálogo
    getJuegos(): Observable<Juego[]> {
        return this.http.get<Juego[]>(this.apiUrl);
    }
    // GET: Obtener un juego por ID filtrando el JSON local con RxJS
    getJuegoPorId(id: number): Observable<Juego | undefined> {
        return this.http.get<Juego[]>(this.apiUrl).pipe(
            map(juegos => juegos.find(j => j.id === id))
        );
    }
}