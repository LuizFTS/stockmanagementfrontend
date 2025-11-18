import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, type AbstractControl } from '@angular/forms';

@Component({
  selector: 'stk-text-input',
  imports: [ReactiveFormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
})
export class TextInput {
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() id: string = '';
  @Input() control: AbstractControl | null = null;
  @Input() errorMessages: { [key: string]: string } = {};

  get isValid(): boolean {
    return !!(this.control && !this.control.invalid);
  }

  get isInvalid(): boolean {
    return !!(this.control?.invalid && this.control?.dirty);
  }

  get currentError(): string | null {
    if (!this.control?.errors || !this.control?.dirty) return null;
    const errorKey = Object.keys(this.control.errors)[0];
    return this.errorMessages[errorKey];
  }
}
