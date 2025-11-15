import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MessageNotificationComponent } from '../../../shared/components/message-notification-component/message-notification-component';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { Button } from '../../../shared/components/button/button';
import { ButtonBackComponent } from '../../profile-page/components/button-back-component/button-back-component';

interface Message {
  status: string;
  message: string;
}

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, MessageNotificationComponent, Button, ButtonBackComponent],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  messageDisplayed: Message = { status: '', message: '' };
  newUser: NewUser | null = null;
  isLoading: boolean = false;

  newUserForm: FormGroup;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private fb: FormBuilder,
  ) {
    this.newUserForm = this.createNewUserForm();
  }

  private createNewUserForm(): FormGroup {
    return this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: this.passwordsMatchValidator,
      },
    );
  }

  registerHandle() {
    if (this.newUserForm.valid) {
      this.isLoading = true;

      const formValue = this.newUserForm.value;

      const registerData = {
        firstName: formValue.firstName.toLowerCase(),
        lastName: formValue.lastName.toLowerCase(),
        email: formValue.email.toLowerCase(),
        password: formValue.password,
      };

      this.userService.registerUser(registerData);

      this.userService.$responseStatus.subscribe((response) => {
        if (response) {
          if (response.status === 'success') {
            this.auth.login(registerData.email, registerData.password);
          } else {
            this.messageDisplayed = response;
          }
        }
      });

      this.messageHandle();
    }
  }

  private passwordsMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;

    return pass === confirm ? null : { passwordsNotMatching: true };
  }
  private messageHandle() {
    setTimeout(() => {
      this.messageDisplayed.message = '';
      this.messageDisplayed.status = '';
    }, 5000);
    this.isLoading = false;
  }
}
