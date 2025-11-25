import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MessageNotificationComponent } from '../../../shared/components/message-notification-component/message-notification-component';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { Button } from '../../../shared/components/button/button';
import { TextInput } from '../../../shared/components/text-input/text-input';
import { PasswordInput } from '../../../shared/components/password-input/password-input';
import { BackButton } from '../../../shared/components/back-button/back-button';
import type { ResponseStatus } from '../../../core/models/ResponseStatus.model';
import { Router } from '@angular/router';

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    MessageNotificationComponent,
    Button,
    BackButton,
    TextInput,
    PasswordInput,
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  private readonly tokenKey: string = 'auth_token';
  messageDisplayed: ResponseStatus = { status: '', message: '' };
  newUser: NewUser | null = null;
  isLoading: boolean = false;

  newUserForm: FormGroup;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.newUserForm = this.createNewUserForm();
  }

  private createNewUserForm(): FormGroup {
    return this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
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

  registerHandle() {
    if (this.newUserForm.invalid) return;

    this.isLoading = true;
    const formValue = this.newUserForm.value;

    const registerData = {
      firstName: formValue.firstName.toLowerCase(),
      lastName: formValue.lastName.toLowerCase(),
      email: formValue.email.toLowerCase(),
      password: formValue.password,
    };

    this.userService.registerUser(registerData).subscribe({
      next: () => {
        this.isLoading = false;
        this.auth.login(registerData.email, registerData.password).subscribe({
          next: (response) => {
            localStorage.setItem(this.tokenKey, response.token);
            this.router.navigate(['/home']);
          },
        });
      },
      error: (err) => {
        this.messageDisplayed = {
          status: 'error',
          message: err.error?.message ?? 'Tente novamente mais tarde',
        };
        this.isLoading = false;
        this.showMessageHandle();
      },
    });
  }

  private passwordsMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsNotMatching: true };
  }
  private showMessageHandle() {
    setTimeout(() => {
      this.messageDisplayed = { status: '', message: '' };
    }, 5000);
  }
}
