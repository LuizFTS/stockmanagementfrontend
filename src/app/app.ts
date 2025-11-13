import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('stockmanagementfrontend');

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    this.setTheme(mediaQuery.matches);
    this.userService.loadUser();

    mediaQuery.addEventListener('change', (e) => {
      this.setTheme(e.matches);
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  private setTheme(prefersDark: boolean): void {
    if (prefersDark) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }
}
