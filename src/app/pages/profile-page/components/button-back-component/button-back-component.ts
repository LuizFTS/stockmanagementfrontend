import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'stk-button-back',
  imports: [MatIcon],
  templateUrl: './button-back-component.html',
  styleUrl: './button-back-component.scss',
})
export class ButtonBackComponent {
  @Input() path: string = '';

  private router = inject(Router);

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
