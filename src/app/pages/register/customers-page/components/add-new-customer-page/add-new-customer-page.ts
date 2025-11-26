import { Component, inject } from '@angular/core';
import { Stepper } from '../../../../../shared/components/stepper/stepper';
import { CustomerTaxId } from '../customer-tax-id/customer-tax-id';
import { Card } from '../../../../../shared/components/card/card';
import { CustomerGeneralInformation } from '../customer-general-information/customer-general-information';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../../../../core/services/api/customer.service';
import { CustomValidators } from '../../../../../shared/utils/CustomValidators';
import { ResponseMessageService } from '../../../../../core/services/response-message.service';

@Component({
  selector: 'stk-add-new-customer-page',
  imports: [Stepper, CustomerTaxId, Card, CustomerGeneralInformation, ReactiveFormsModule],
  templateUrl: './add-new-customer-page.html',
  styleUrl: './add-new-customer-page.scss',
})
export class AddNewCustomerPage {
  customerForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', { validators: Validators.required }),
    phone: new FormControl<string>('', { validators: Validators.required }),
    email: new FormControl<string>('', { validators: [Validators.required, Validators.email] }),
    taxId: new FormControl<string>('', {
      validators: [Validators.required, CustomValidators.cpfOrCnpj()],
    }),
  });
  currentStep: number = 1;
  totalSteps: number = 2;

  isLoading: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private responseMessageService: ResponseMessageService,
  ) {}

  onAddNewCustomer() {
    if (this.customerForm.invalid) return;
    this.isLoading = true;

    const formValue = this.customerForm.value;

    const updateData = {
      taxId: formValue.taxId.replace(/\D/g, ''),
      name: formValue.name.toLowerCase(),
      phone: formValue.phone.replace(/\D/g, ''),
      email: formValue.email,
    };

    this.customerService.create(updateData).subscribe({
      next: () => {
        this.responseMessageService.success('Cliente cadastrado!');

        this.navigate('/customers');
        this.isLoading = false;
      },
      error: (err) => {
        this.responseMessageService.error(err.error.message ?? 'Tente novamente mais tarde');
        this.isLoading = false;
      },
    });
  }

  nextStep() {
    this.currentStep++;
  }

  back() {
    this.currentStep--;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
