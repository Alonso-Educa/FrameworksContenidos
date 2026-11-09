import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-contador-vidas',
  // Plantilla inline: eventos con (click), propiedades con [disabled], control de flujo con @if
  template: `
    <div class="vidas">
      <button class="btn-mini" (click)="restar()" [disabled]="vidas() === 0">−</button>
      <span>{{ corazones() || 'GAME OVER' }}</span>
      <button class="btn-mini" (click)="sumar()">+</button>
      @if (vidas() === 0) {
        <button class="btn-mini" (click)="reiniciar()">Reiniciar</button>
      }
    </div>
  `,
  styles: [`
    .vidas { display: flex; align-items: center; gap: .4rem; font-weight: 700; }
  `],
})
export class ContadorVidas {
  // Signal: variable reactiva. Se lee con paréntesis: vidas()
  protected vidas = signal(3);

  // computed: se deriva de otra signal y se recalcula sola
  protected corazones = computed(() => '♥'.repeat(this.vidas()));

  protected sumar(): void { this.vidas.update(v => v + 1); }               // update: depende del valor anterior
  protected restar(): void { this.vidas.update(v => Math.max(0, v - 1)); }
  protected reiniciar(): void { this.vidas.set(3); }                       // set: valor fijo
}