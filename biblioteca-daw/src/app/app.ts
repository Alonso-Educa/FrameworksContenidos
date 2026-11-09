// Ejercicio 2
// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Catalogo } from './componentes/catalogo/catalogo';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, Catalogo],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('biblioteca-daw');
// }

// // Ejercicio 3
// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// import { ApplicationConfig } from '@angular/core';
// import { provideRouter, withComponentInputBinding } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { routes } from './app.routes';
// import { ListaDeseosComponent } from './componentes/lista-deseos/lista-deseos';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes, withComponentInputBinding()), // Activa vinculación URL -> input()
//     provideHttpClient() // Habilita el cliente HTTP global
//   ]
// };

// @Component({
//   imports: [RouterOutlet, ListaDeseosComponent],
//   selector: 'app-root',
//   styleUrl: './app.css',
//   templateUrl: './app.html',
// })
// export class App {
//   protected readonly title = signal('biblioteca-daw');
// }

// Ejercicio 4
import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResenasService } from './servicios/resena';
import { Resena } from './interfaces/resena';
import { ListaResenasComponent } from './componentes/lista-resenas/lista-resenas';
import { Catalogo } from './componentes/catalogo/catalogo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ListaResenasComponent, Catalogo],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private resenasService = inject(ResenasService);

  // 1. Signals de estado principal
  resenas = signal<Resena[]>([]);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);
  nuevoTitulo = signal<string>('');

  // 2. Signals Derivadas (computed)
  totalResenas = computed(() => this.resenas().length);

  constructor() {
    // 3. Reacción automática con effect() (Sincronización/Auditoría)
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        console.log(`[Efecto Automático]: Estado de resenas actualizado. Total actual:
        ${this.totalResenas()}`);
        localStorage.setItem('resenas_backup', JSON.stringify(this.resenas()));
      }
    });
  }
  ngOnInit(): void {
    this.cargarResenas();
  }

  // Operación Lectura (GET)
  cargarResenas(): void {
    this.cargando.set(true);
    this.resenasService.getResenas().subscribe({
      next: (data) => {
        // Cogemos las primeras 8 resenas para facilitar las pruebas
        this.resenas.set(data.slice(0, 20));
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo conectar con el servidor.');
        this.cargando.set(false);
      },
    });
  }

  // Operación Eliminar (DELETE)
  eliminarResena(id: number): void {
    this.resenasService.eliminarResena(id).subscribe({
      next: () => {
        this.resenas.update((lista) => lista.filter((r) => r.id !== id));
      },
    });
  }
}
