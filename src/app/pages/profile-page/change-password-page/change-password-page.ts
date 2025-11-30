import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  Validators,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { UserService } from '../../../core/services/api/user.service';
import { PasswordInput } from '../../../shared/components/password-input/password-input';
import { Card } from '../../../shared/components/card/card';
import { BackButton } from '../../../shared/components/back-button/back-button';
import { ResponseMessageService } from '../../../core/services/response-message.service';
import { CustomValidators } from '../../../shared/utils/CustomValidators';

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
  passwordForm: FormGroup = new FormGroup(
    {
      currentPassword: new FormControl<string>('', {
        validators: [Validators.minLength(8), Validators.maxLength(25)],
      }),
      newPassword: new FormControl<string>('', {
        validators: [Validators.minLength(8), Validators.maxLength(25)],
      }),
      confirmPassword: new FormControl<string>('', {
        validators: [Validators.minLength(8), Validators.maxLength(25)],
      }),
    },
    { validators: CustomValidators.passwordsMatchValidator() },
  );

  constructor(
    private userService: UserService,
    private responseMessageService: ResponseMessageService,
  ) {}

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
}
