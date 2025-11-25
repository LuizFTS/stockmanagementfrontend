import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  Validators,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { UserService } from '../../../core/services/api/user.service';
import { PasswordInput } from '../../../shared/components/password-input/password-input';
import { Card } from '../../../shared/components/card/card';
import { BackButton } from '../../../shared/components/back-button/back-button';
import { ResponseMessageService } from '../../../core/services/response-message.service';

@Component({
  selector: 'app-change-password-page',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    Button,
    BackButton,
    ReactiveFormsModule,
    PasswordInput,
    Card,
  ],
  templateUrl: './change-password-page.html',
  styleUrl: './change-password-page.scss',
})
export class ChangePasswordPage {
  isLoading: boolean = false;
  passwordForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private responseMessageService: ResponseMessageService,
  ) {
    this.passwordForm = this.changePasswordForm();
  }

  private changePasswordForm(): FormGroup {
    return this.fb.group(
      {
        currentPassword: [
          '',
          [Validators.required, Validators.minLength(8), Validators.maxLength(25)],
        ],
        newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
        confirmPassword: [
          '',
          [Validators.required, Validators.minLength(8), Validators.maxLength(25)],
        ],
      },
      {
        validators: this.passwordsMatchValidator,
      },
    );
  }

  onChangePassword() {
    if (this.passwordForm.invalid) return;

    this.isLoading = true;
    const formValue = this.passwordForm.value;

    this.userService
      .changeUserPassword(formValue.currentPassword, formValue.newPassword)
      .subscribe({
        next: () => {
          this.responseMessageService.success('Senha alterada com sucesso!');
          this.isLoading = false;
        },
        error: (err) => {
          this.responseMessageService.error(err.error.message ?? 'Tente novamente mais tarde');
          this.isLoading = false;
        },
      });
  }

  private passwordsMatchValidator(form: FormGroup) {
    const pass = form.get('newPassword')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsNotMatching: true };
  }
}
