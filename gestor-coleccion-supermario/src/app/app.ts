import { Component, computed, inject, signal } from '@angular/core';
import { Juegos } from './servicios/juegos';
import { JuegoItem } from './componentes/juego-item/juego-item';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JuegoItem],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Inyecta el servicio JuegosService en el AppComponent utilizando la función moderna inject().
  private juegosService = inject(Juegos);
  // Conecta la lista de juegos del servicio con el componente padre.
  listaJuegos = this.juegosService._juegos;
  // Prepara una Signal local y un formulario básico (input de texto + botón) en la
  // plantilla del padre para dar de alta nuevos juegos interactivamente.
  nuevoTituloJuegoInput = signal('');
  nuevoPlataformaJuegoInput = signal('');
  nuevoAnioJuegoInput = signal('');
  nuevoPrincipalJuegoInput = signal('');

  totalTareas = computed(() => {
    return this.listaJuegos().length;
  });
  
  // Arreglar esto
  actualizarTitulo(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.nuevoTituloJuegoInput.set(valor);
  }
  actualizarPlataforma(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.nuevoPlataformaJuegoInput.set(valor);
  }
  actualizarAnio(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.nuevoAnioJuegoInput.set(valor);
  }
  actualizarPrincipal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.nuevoPrincipalJuegoInput.set(valor);
  }
  agregar() {
    this.juegosService.anadirJuego([
      this.nuevoTituloJuegoInput(),
      this.nuevoPlataformaJuegoInput(),
      this.nuevoAnioJuegoInput(),
      this.nuevoPrincipalJuegoInput(),
    ]);
    // Limpiamos los inputs
    this.nuevoTituloJuegoInput.set('');
    this.nuevoPlataformaJuegoInput.set('');
    this.nuevoAnioJuegoInput.set('');
    this.nuevoPrincipalJuegoInput.set('');
  }
  borrar(index: number) {
    this.juegosService.eliminarJuego(index);
  }
}
