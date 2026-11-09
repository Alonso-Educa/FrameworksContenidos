import { Component, OnInit, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JuegosService } from '../../servicios/juegos';
import { Juego } from '../../interfaces/juego';

@Component({
  selector: 'app-detalle-juego',
  standalone: true,
  template: `
<div class="contenedor-detalle">
@if (cargando()) {
<p>Obteniendo detalles del juego #{{ id() }}...</p>
} @else if (juego()) {
<div class="ficha">
<h2>{{ juego()?.titulo }}</h2>
<p><strong>ID de recurso:</strong> #{{ juego()?.id }}</p>
<p><strong>Plataforma:</strong> {{ juego()?.plataforma }}</p>
<p><strong>Año de lanzamiento:</strong> {{ juego()?.anio }}</p>
<p><strong>Categoría:</strong> {{ juego()?.categoria }}</p>
<p class="descripcion">{{ juego()?.descripcion }}</p>
<!-- Navegación Programática -->
<button (click)="volverAlCatalogo()" class="btn-volver">
← Volver al Catálogo
</button>
</div>
} @else {
<p>No se pudo encontrar el videojuego solicitado.</p>
<button (click)="volverAlCatalogo()">Volver</button>
}
</div>
`,
  styles: [`
.contenedor-detalle { max-width: 600px; margin: 2rem auto; padding: 1rem; }
.ficha { border: 2px solid #e60012; border-radius: 10px; padding: 1.5rem;
background: #fff5f5; }
.descripcion { background: #fff; padding: 10px; border-radius: 4px; border-left: 4px
solid #e60012; }
.btn-volver { background: #e60012; color: white; border: none; padding: 10px 18px;
border-radius: 5px; cursor: pointer; font-weight: bold; margin-top: 1rem; }
`]
})
export class DetalleJuegoComponent implements OnInit {
  private juegosService = inject(JuegosService);
  private router = inject(Router); // Servicio para navegación por código TS
  // Recibe el parámetro :id de la URL automáticamente gracias a withComponentInputBinding()
  id = input.required<string>();
  juego = signal<Juego | null>(null);
  cargando = signal<boolean>(true);
  ngOnInit(): void {
    // Convertimos el ID de cadena a número y solicitamos los datos a la API
    const juegoId = Number(this.id());
    this.juegosService.getJuegoPorId(juegoId).subscribe({
      next: (datos) => {
        this.juego.set(datos ?? null);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar la ficha:', err);
        this.cargando.set(false);
      }
    });
  }
  // Método de Navegación Programática
  volverAlCatalogo(): void {
    this.router.navigate(['/juegos']);
  }
}