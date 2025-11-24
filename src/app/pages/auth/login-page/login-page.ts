import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, type ElementRef } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Button } from '../../../shared/components/button/button';
import { Router } from '@angular/router';
import { MessageNotificationComponent } from '../../../shared/components/message-notification-component/message-notification-component';
import type { ResponseStatus } from '../../../core/models/ResponseStatus.model';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule, Button, MessageNotificationComponent, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly tokenKey: string = 'auth_token';

  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  messageDisplayed: ResponseStatus = { status: '', message: '' };
  isLoading = false;
  isPasswordVisible: boolean = false;
  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.createLoginForm();
  }

  private createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const formValue = this.loginForm.value;

      this.auth.login(formValue.email.toLowerCase(), formValue.password).subscribe({
        next: (response) => {
          localStorage.setItem(this.tokenKey, response.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.messageDisplayed = {
            status: 'error',
            message: err.error.message ?? 'Tente novamente mais tarde',
          };
          this.isLoading = false;
          this.showMessageHandle();
        },
      });
    }
  }

  showMessageHandle() {
    setTimeout(() => {
      this.messageDisplayed = { status: '', message: '' };
    }, 5000);
  }

  passwordVisible() {
    this.isPasswordVisible = !this.passwordVisible;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
