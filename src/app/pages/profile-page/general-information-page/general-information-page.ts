import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import type { User } from '../../../core/models/User.model';
import { UserService } from '../../../core/services/api/user.service';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Button } from '../../../shared/components/button/button';
import { TextInput } from '../../../shared/components/text-input/text-input';
import { Card } from '../../../shared/components/card/card';
import { BackButton } from '../../../shared/components/back-button/back-button';
import { Formatter } from '../../../shared/utils/Formatter';
import { ResponseMessageService } from '../../../core/services/response-message.service';

@Component({
  selector: 'app-general-information-page',
  imports: [ReactiveFormsModule, Button, BackButton, TextInput, Card],
  templateUrl: './general-information-page.html',
  styleUrl: './general-information-page.scss',
})
export class GeneralInformationPage {
  isLoading: boolean = false;
  user: User | null = null;

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl<string>('', { validators: [Validators.required, Validators.email] }),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private responseMessageService: ResponseMessageService,
  ) {}

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
        firstName: Formatter.capitalize(formValue.firstName.toLowerCase()),
        lastName: Formatter.capitalize(formValue.lastName.toLowerCase()),
        email: formValue.email.toLowerCase(),
      };

      this.userService.changeUserInformation(updateData).subscribe({
        next: () => {
          this.responseMessageService.success('Dados alterados com sucesso!');
          this.isLoading = false;
          this.userService.loadUser();
        },
        error: (err) => {
          this.responseMessageService.error(err.error.message ?? 'Tente novamente mais tarde');
          this.isLoading = false;
        },
      });
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
