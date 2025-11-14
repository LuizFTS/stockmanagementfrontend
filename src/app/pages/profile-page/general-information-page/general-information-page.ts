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
import { ButtonBackComponent } from '../components/button-back-component/button-back-component';
import { MessageNotificationComponent } from '../../../shared/components/message-notification-component/message-notification-component';

interface Message {
  status: string;
  message: string;
}

@Component({
  selector: 'app-general-information-page',
  imports: [ReactiveFormsModule, Button, ButtonBackComponent, MessageNotificationComponent],
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
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
      };

      this.userService.changeInformation(updateData);

      this.userService.$responseStatus.subscribe((response) => {
        this.userService.loadUser();
        if (response) {
          this.messageDisplayed = response;
        }
      });
    }
    this.showMessageHandle();
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  showMessageHandle() {
    setTimeout(() => {
      this.messageDisplayed.message = '';
      this.messageDisplayed.status = '';
    }, 5000);
    this.isLoading = false;
  }
}
