import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  Validators,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { UserService } from '../../../core/services/user.service';
import { ButtonBackComponent } from '../components/button-back-component/button-back-component';
import { MessageNotificationComponent } from '../../../shared/components/message-notification-component/message-notification-component';
import { PasswordInput } from '../../../shared/components/password-input/password-input';

interface PasswordData {
  type: string;
  data: string;
  isValid: boolean;
  errorMessage: string;
  visible: boolean;
}

interface Message {
  status: string;
  message: string;
}

@Component({
  selector: 'app-change-password-page',
  imports: [
    MatIcon,
    RouterModule,
    CommonModule,
    FormsModule,
    Button,
    ButtonBackComponent,
    MessageNotificationComponent,
    ReactiveFormsModule,
    PasswordInput,
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
