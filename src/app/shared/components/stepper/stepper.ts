import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'stk-stepper',
  imports: [MatIcon],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss',
})
export class Stepper {
  @Input() currentStep: number = 1;
  @Input() totalSteps: number = 1;

  get steps() {
    return Array.from({ length: this.totalSteps }, (_, i) => i + 1);
  }
}
