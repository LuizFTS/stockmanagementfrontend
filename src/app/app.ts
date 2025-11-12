import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('stockmanagementfrontend');

  ngOnInit() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    this.setTheme(mediaQuery.matches);

    mediaQuery.addEventListener('change', (e) => {
      this.setTheme(e.matches);
    });
  }
  private setTheme(prefersDark: boolean): void {
    if (prefersDark) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }
}
