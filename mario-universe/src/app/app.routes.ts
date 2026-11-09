import { Routes } from '@angular/router';
import { ListaJuegos } from './componentes/lista-juegos/lista-juegos';
import { DetalleJuego } from './componentes/detalle-juego/detalle-juego';
import { Misiones } from './componentes/misiones/misiones';

// Tabla de rutas: URL → componente. Angular las evalúa en orden.
export const routes: Routes = [
  // 1. Al entrar en la raíz redirigimos. pathMatch 'full' es obligatorio con la ruta vacía.
  { path: '', redirectTo: 'juegos', pathMatch: 'full' },

  // 2. Rutas normales
  { path: 'juegos', component: ListaJuegos },
  { path: 'juegos/:id', component: DetalleJuego },   // :id = parámetro dinámico
  { path: 'misiones', component: Misiones },

  // 3. Comodín: SIEMPRE la última. Carga diferida: el código de NotFound
  //    solo se descarga si el usuario escribe una URL que no existe.
  { path: '**', loadComponent: () => import('./componentes/not-found/not-found').then(m => m.NotFound) },
];