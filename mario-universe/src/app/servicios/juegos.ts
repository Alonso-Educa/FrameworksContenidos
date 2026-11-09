import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Juego } from '../interfaces/juego';

// Claves con las que guardamos datos en el localStorage del navegador
const CLAVE_JUEGOS = 'mario.juegos';
const CLAVE_FAVORITOS = 'mario.favoritos';

// SERVICIO = clase que guarda estado y lógica compartida, fuera del árbol de componentes.
// providedIn: 'root' → Angular crea UNA sola instancia (singleton) para toda la app,
// así que cabecera, lista y detalle comparten exactamente los mismos datos.
@Injectable({ providedIn: 'root' })
export class JuegosService {
  // Inyección de dependencias: pedimos a Angular el cliente HTTP (activado en app.config.ts)
  private http = inject(HttpClient);

  // ===== ESTADO: signals privadas, solo el servicio puede modificarlas =====
  private _juegos = signal<Juego[]>([]);
  private _favoritos = signal<number[]>(this.leer<number[]>(CLAVE_FAVORITOS) ?? []);
  private _cargando = signal(true);
  private _error = signal<string | null>(null);

  // ===== LECTURA PÚBLICA: asReadonly() permite leer pero no hacer set() ni update() =====
  readonly juegos = this._juegos.asReadonly();
  readonly favoritos = this._favoritos.asReadonly();
  readonly cargando = this._cargando.asReadonly();
  readonly error = this._error.asReadonly();

  // ===== SEÑALES DERIVADAS: computed() se recalcula solo cuando cambian sus dependencias =====
  readonly total = computed(() => this.juegos().length);
  readonly totalSpinOffs = computed(() => this.juegos().filter(j => j.categoria === 'Spin-off').length);
  readonly totalFavoritos = computed(() => this.favoritos().length);

  constructor() {
    // Arranque: si hay catálogo guardado lo usamos; si no, lo pedimos al "servidor"
    const guardados = this.leer<Juego[]>(CLAVE_JUEGOS);
    if (guardados) {
      this._juegos.set(guardados);
      this._cargando.set(false);
    } else {
      this.cargarDesdeApi();
    }

    // EFFECT 1: cada vez que cambian los favoritos se guardan solos en localStorage
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(this._favoritos()));
      }
    });

    // EFFECT 2: lo mismo con el catálogo, pero SOLO cuando ya cargó bien.
    // Si guardáramos el array vacío inicial, al recargar la página perderíamos el catálogo.
    effect(() => {
      if (this._cargando() || this._error()) return;
      if (typeof localStorage !== 'undefined') {
        console.log(`[Efecto Automático]: Catálogo de juegos actualizado. Total actual: ${this.total()}`);
        localStorage.setItem(CLAVE_JUEGOS, JSON.stringify(this._juegos()));
      }
    });
  }

  // ===== PETICIÓN HTTP (GET) =====
  // juegos.json está en la carpeta public/, por eso la URL es simplemente 'juegos.json'.
  // Un Observable no hace nada hasta que alguien llama a .subscribe().
  cargarDesdeApi(): void {
    this._cargando.set(true);
    this._error.set(null);

    this.http.get<Juego[]>('juegos.json')
      // pipe(map(...)) transforma la respuesta antes de que llegue al subscribe: ordenamos por año
      .pipe(map(lista => [...lista].sort((a, b) => a.anio - b.anio)))
      .subscribe({
        next: datos => {
          this._juegos.set(datos);
          this._cargando.set(false);
        },
        error: () => {
          this._error.set('No se pudo cargar el catálogo.');
          this._cargando.set(false);
        },
      });
  }

  // ===== OPERACIONES SOBRE EL ESTADO (siempre creando arrays nuevos, nunca push) =====
  // Omit<Juego, 'id'> = un Juego sin id (el id lo genera el servicio)
  agregar(nuevo: Omit<Juego, 'id'>): void {
    const id = Math.max(0, ...this._juegos().map(j => j.id)) + 1;
    this._juegos.update(lista => [...lista, { ...nuevo, id }]);
  }

  eliminar(id: number): void {
    this._juegos.update(lista => lista.filter(j => j.id !== id));
    this._favoritos.update(favs => favs.filter(f => f !== id));
  }

  alternarFavorito(id: number): void {
    this._favoritos.update(favs => (favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]));
  }

  // Borra lo guardado y vuelve a pedir el catálogo original al JSON
  restaurarCatalogo(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(CLAVE_JUEGOS);
    }
    this._favoritos.set([]);
    this.cargarDesdeApi();
  }

  // Lee y convierte de texto a objeto; devuelve null si no existe o está corrupto
  private leer<T>(clave: string): T | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    try {
      const bruto = localStorage.getItem(clave);
      return bruto ? (JSON.parse(bruto) as T) : null;
    } catch {
      return null;
    }
  }
}