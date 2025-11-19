import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'stk-back-button',
  imports: [MatIcon],
  templateUrl: './back-button.html',
  styleUrl: './back-button.scss',
})
export class BackButton {
  @Input() path: string = '';

  private router = inject(Router);

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
