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

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, FormsModule, Button, MessageNotificationComponent, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  messageDisplayed = { status: '', message: '' };
  isLoading = false;

  loginForm: FormGroup;

  private router = inject(Router);

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.createLoginForm();
  }

  private createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const formValue = this.loginForm.value;

      this.auth.login(formValue.email.toLowerCase(), formValue.password);
      this.auth.$responseStatus.subscribe((response) => {
        if (response && response.status === 'error') {
          this.messageDisplayed.message = response.message;
          this.messageDisplayed.status = response.status;
        }
      });

      this.messageHandle();
    }
  }

  messageHandle() {
    setTimeout(() => {
      this.messageDisplayed.message = '';
      this.messageDisplayed.status = '';
    }, 5000);
    this.isLoading = false;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
