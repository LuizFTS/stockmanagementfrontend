import { Component, EventEmitter, Input, Output, ViewChild, type ElementRef } from '@angular/core';
import { ReactiveFormsModule, type AbstractControl } from '@angular/forms';

@Component({
  selector: 'stk-text-input',
  imports: [ReactiveFormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
})
export class TextInput {
  @ViewChild('innerInput', { static: true }) innerInput!: ElementRef<HTMLInputElement>;
  @Input() label!: string;
  @Input() type!: string;
  @Input() id!: string;
  @Input() control!: AbstractControl | null;
  @Input() errorMessages!: { [key: string]: string };

  @Output() keydown = new EventEmitter<KeyboardEvent>();

  onKeyDown(event: KeyboardEvent) {
    this.keydown.emit(event);
  }

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

  focus() {
    this.innerInput.nativeElement.focus();
  }

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (this.type === 'number') {
      const value = input.value.replace(/[^0-9,]/g, '');
      input.value = value;
      this.control?.setValue(value);
    }
  }
}
