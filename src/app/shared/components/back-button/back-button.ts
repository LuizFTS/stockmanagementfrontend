import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Button } from '../button/button';

@Component({
  selector: 'stk-back-button',
  imports: [MatIcon, Button],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
})
export class BackButton {
  @Input() path: string = '';

  private router = inject(Router);

  navigate() {
    if (this.path.length > 0) {
      this.router.navigate([this.path]);
    }
  }
}
