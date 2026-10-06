import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComicManager } from './comic-manager/comic-manager';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ComicManager],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tienda_comics');
}
