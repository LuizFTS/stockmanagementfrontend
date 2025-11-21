import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmModal } from './shared/components/confirm-modal/confirm-modal';
import { ConfirmationModalService } from './core/services/confirmation-modal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatDialogModule, ConfirmModal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('stockmanagementfrontend');
  modalService = inject(ConfirmationModalService);

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    this.setTheme(mediaQuery.matches);

    mediaQuery.addEventListener('change', (e) => {
      this.setTheme(e.matches);
    });

    if (this.auth.isLoggedIn()) {
      /* this.router.navigate(['home']); */
      this.router.navigate(['suppliers']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  private setTheme(prefersDark: boolean): void {
    if (prefersDark) {
      document.body.setAttribute('data-theme', 'light');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }
}
