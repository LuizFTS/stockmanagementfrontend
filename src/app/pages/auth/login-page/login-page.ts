import { CommonModule } from '@angular/common';
import { Component, ViewChild, type ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule, Button],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  email = '';
  password = '';
  errorMessageDisplayed = '';

  isEmailValid = false;

  isPasswordValid = false;

  isLoading = false;

  constructor(private auth: AuthService) {}

  ngAfterViewInit(): void {
    this.emailInput.nativeElement.focus();
  }

  login() {
    this.isLoading = true;

    if (
      !this.isEmailValid ||
      !this.isPasswordValid ||
      this.email.length === 0 ||
      this.password.length === 0
    ) {
      this.loginFailedHandle('Verifique os dados.');
      this.isLoading = false;
      return;
    }

    this.auth.login(this.email.toLowerCase(), this.password).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 0) {
          this.loginFailedHandle('Tente novamente mais tarde');
        } else {
          this.loginFailedHandle(err.error.message);
        }
        this.isLoading = false;
      },
    });
  }

  loginFailedHandle(message: string) {
    this.errorMessageDisplayed = message;

    setTimeout(() => {
      this.errorMessageDisplayed = '';
    }, 5000);
    this.isLoading = false;
  }

  validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (this.email.length === 0) {
      this.isEmailValid = false;
      return;
    }

    this.isEmailValid = regex.test(this.email);
  }

  validatePassword() {
    if (this.password.length === 0) {
      this.isPasswordValid = false;
      return;
    }

    if (this.password.length >= 8 && this.password.length < 50) {
      this.isPasswordValid = true;
    } else {
      this.isPasswordValid = false;
    }
  }
}
