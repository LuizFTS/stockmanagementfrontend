import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import type { User } from '../../../core/models/User.model';
import { UserService } from '../../../core/services/user.service';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
  EmailValidator,
  FormControl,
} from '@angular/forms';
import { Button } from '../../../shared/components/button/button';
import { MessageNotificationComponent } from '../../../shared/components/message-notification-component/message-notification-component';
import { capitalize } from '../../../shared/utils/capitalize';
import { TextInput } from '../../../shared/components/text-input/text-input';
import { Card } from '../../../shared/components/card/card';
import { BackButton } from '../../../shared/components/back-button/back-button';

interface Message {
  status: string;
  message: string;
}

@Component({
  selector: 'app-general-information-page',
  imports: [ReactiveFormsModule, Button, BackButton, MessageNotificationComponent, TextInput, Card],
  templateUrl: './general-information-page.html',
  styleUrl: './general-information-page.scss',
})
export class GeneralInformationPage {
  messageDisplayed: Message = { status: '', message: '' };
  isLoading: boolean = false;
  user: User | null = null;

  userForm: FormGroup;

  private router = inject(Router);

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.userForm = this.updateUserForm();
  }

  private updateUserForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.userService.$user.subscribe((user) => {
      this.user = user;

      this.userForm.patchValue({
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        email: user?.email ?? '',
      });
    });
  }

  updateHandle() {
    if (this.userForm.valid) {
      this.isLoading = true;
      const formValue = this.userForm.value;

      const updateData = {
        firstName: capitalize(formValue.firstName.toLowerCase()),
        lastName: capitalize(formValue.lastName.toLowerCase()),
        email: formValue.email.toLowerCase(),
      };

      this.userService.changeUserInformation(updateData).subscribe({
        next: () => {
          this.messageDisplayed = {
            status: 'success',
            message: 'Dados alterados com sucesso!',
          };
          this.isLoading = false;
          this.userService.loadUser();
        },
        error: (err) => {
          this.messageDisplayed = {
            status: 'error',
            message: err.error.message ?? 'Tente novamente mais tarde',
          };
          this.isLoading = false;
        },
      });
    }
    this.showMessageHandle();
  }

  showMessageHandle() {
    setTimeout(() => {
      this.messageDisplayed = { status: '', message: '' };
    }, 5000);
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
