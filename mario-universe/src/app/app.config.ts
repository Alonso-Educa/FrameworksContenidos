import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

// Aquí se registran los servicios globales de Angular.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),                 // lo genera el CLI, déjalo
    provideRouter(routes, withComponentInputBinding()),   // el :id de la URL llegará a un input()
    provideHttpClient(),                                  // sin esto, HttpClient da error NullInjector
  ],
};