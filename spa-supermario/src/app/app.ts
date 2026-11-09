import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), // Activa vinculación URL -> input()
    provideHttpClient() // Habilita el cliente HTTP global
  ]
};

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('spa-supermario');
}

