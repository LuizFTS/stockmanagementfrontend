import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { UserService } from '../../../core/services/user.service';
import { ButtonBackComponent } from '../components/button-back-component/button-back-component';
import { MessageNotificationComponent } from '../../../shared/components/message-notification-component/message-notification-component';

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
  ],
  templateUrl: './change-password-page.html',
  styleUrl: './change-password-page.scss',
})
export class ChangePasswordPage {
  currentPassword: PasswordData = {
    type: 'current',
    data: '',
    isValid: false,
    errorMessage: '',
    visible: false,
  };
  newPassword: PasswordData = {
    type: 'new',
    data: '',
    isValid: false,
    errorMessage: '',
    visible: false,
  };
  confirmPassword: PasswordData = {
    type: 'confirm',
    data: '',
    isValid: false,
    errorMessage: '',
    visible: false,
  };
  messageDisplayed: Message = { status: '', message: '' };
  isLoading: boolean = false;

  constructor(private userService: UserService) {}

  onChangePassword() {
    this.isLoading = true;
    this.userService.changePassword(this.currentPassword.data, this.newPassword.data);

    this.userService.$responseStatus.subscribe((response) => {
      if (response) {
        this.messageDisplayed = response;

        if (response.status === 'success') {
          this.currentPassword.data = '';
          this.newPassword.data = '';
          this.confirmPassword.data = '';
        }
      }
    });

    this.showMessageHandle();
  }

  turnInputVisible(id: number) {
    if (id === 0) this.currentPassword.visible = !this.currentPassword.visible;
    if (id === 1) this.newPassword.visible = !this.newPassword.visible;
    if (id === 2) this.confirmPassword.visible = !this.confirmPassword.visible;
  }

  validatePassword(password: PasswordData) {
    if (
      password.type === this.confirmPassword.type &&
      this.newPassword.data !== this.confirmPassword.data
    ) {
      this.confirmPassword.isValid = false;
      this.confirmPassword.errorMessage = 'As senhas não coincidem';
      return;
    }

    if (
      password.type === this.confirmPassword.type &&
      this.confirmPassword.data === this.currentPassword.data &&
      this.newPassword.data === this.currentPassword.data
    ) {
      this.confirmPassword.isValid = false;
      this.confirmPassword.errorMessage = 'A senha deve ser diferente da atual';
      return;
    }

    if (password.data.length === 0) {
      password.isValid = false;
      password.errorMessage = 'Senha inválida';
      return;
    }

    if (password.data.length < 8) {
      password.isValid = false;
      password.errorMessage = 'Senha muito curta';
    } else if (password.data.length > 50) {
      password.isValid = false;
      password.errorMessage = 'Senha muito longa';
    } else {
      password.isValid = true;
      password.errorMessage = '';
    }
  }

  showMessageHandle() {
    setTimeout(() => {
      this.messageDisplayed.message = '';
      this.messageDisplayed.status = '';
    }, 5000);
    this.isLoading = false;
  }
}
