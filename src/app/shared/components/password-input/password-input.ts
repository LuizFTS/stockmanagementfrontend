import { Component, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  type AbstractControl,
  type FormGroup,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'stk-password-input',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
})
export class PasswordInput {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() control: AbstractControl | null = null;
  @Input() errorMessages: { [key: string]: string } = {};
  @Input() parentForm: FormGroup | null = null;
  @Input() formLevelErrors: string[] = [];

  visible = false;
  value: string = '';
  disabled: boolean = false;

  toggleVisibility(): void {
    this.visible = !this.visible;
  }

  get isValid(): boolean {
    return !!(this.control && !this.control.invalid);
  }

  get isInvalid(): boolean {
    return !!(this.control?.invalid && this.control?.dirty);
  }

  get currentError(): string | null {
    if (this.control?.errors && this.control?.dirty) {
      const errorKey = Object.keys(this.control.errors)[0];
      if (this.errorMessages[errorKey]) {
        return this.errorMessages[errorKey];
      }
    }

    if (this.parentForm?.errors && this.control?.dirty) {
      for (const errorKey of this.formLevelErrors) {
        if (this.parentForm.errors[errorKey] && this.errorMessages[errorKey]) {
          return this.errorMessages[errorKey];
        }
      }
    }

    return null;
  }
}
