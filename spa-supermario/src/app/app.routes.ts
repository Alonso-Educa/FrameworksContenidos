import { Routes } from '@angular/router';
import { ListaJuegosComponent } from './componentes/lista-juegos/lista-juegos';
import { DetalleJuegoComponent } from './componentes/detalle-juego/detalle-juego';

export const routes: Routes = [
    // 1. Redirección inicial
    { path: '', redirectTo: 'juegos', pathMatch: 'full' },
    // 2. Ruta principal (Catálogo)
    { path: 'juegos', component: ListaJuegosComponent },
    // 3. Ruta detalle con parámetro dinámico
    { path: 'juegos/:id', component: DetalleJuegoComponent },
    // 4. Ruta comodín 404
    { path: '**', redirectTo: 'juegos' }
];