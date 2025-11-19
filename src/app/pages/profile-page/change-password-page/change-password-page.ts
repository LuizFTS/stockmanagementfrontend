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
import { UserService } from '../../../core/services/user.service';
import { MessageNotificationComponent } from '../../../shared/components/message-notification-component/message-notification-component';
import { PasswordInput } from '../../../shared/components/password-input/password-input';
import { Card } from '../../../shared/components/card/card';
import { BackButton } from '../../../shared/components/back-button/back-button';

interface Message {
  status: string;
  message: string;
}

@Component({
  selector: 'app-change-password-page',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    Button,
    BackButton,
    MessageNotificationComponent,
    ReactiveFormsModule,
    PasswordInput,
    Card,
  ],
  templateUrl: './change-password-page.html',
  styleUrl: './change-password-page.scss',
})
export class ChangePasswordPage {
  messageDisplayed: Message = { status: '', message: '' };
  isLoading: boolean = false;
  passwordForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
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
          this.messageDisplayed = {
            status: 'success',
            message: 'Senha alterada com sucesso!',
          };
          this.isLoading = false;
        },
        error: (err) => {
          this.messageDisplayed = {
            status: 'error',
            message: err.error.message ?? 'Tente novamente mais tarde',
          };
          this.isLoading = false;
        },
      });
    this.showMessageHandle();
  }

  showMessageHandle() {
    setTimeout(() => {
      this.messageDisplayed.message = '';
      this.messageDisplayed.status = '';
    }, 5000);
    this.isLoading = false;
  }

  private passwordsMatchValidator(form: FormGroup) {
    const pass = form.get('newPassword')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsNotMatching: true };
  }
}
