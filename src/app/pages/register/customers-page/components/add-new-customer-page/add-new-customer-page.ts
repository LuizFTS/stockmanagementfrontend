import { Component, inject } from '@angular/core';
import { Stepper } from '../../../../../shared/components/stepper/stepper';
import { CustomerTaxId } from '../customer-tax-id/customer-tax-id';
import { Card } from '../../../../../shared/components/card/card';
import { CustomerGeneralInformation } from '../customer-general-information/customer-general-information';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageNotificationComponent } from '../../../../../shared/components/message-notification-component/message-notification-component';
import { Router } from '@angular/router';
import { CustomerService } from '../../../../../core/services/customer.service';
import { CustomValidators } from '../../../../../shared/utils/CustomValidators';

interface Message {
  status: string;
  message: string;
}

@Component({
  selector: 'stk-add-new-customer-page',
  imports: [
    Stepper,
    CustomerTaxId,
    Card,
    CustomerGeneralInformation,
    ReactiveFormsModule,
    MessageNotificationComponent,
  ],
  templateUrl: './add-new-customer-page.html',
  styleUrl: './add-new-customer-page.scss',
})
export class AddNewCustomerPage {
  private router = inject(Router);
  customerForm: FormGroup;
  currentStep: number = 1;
  totalSteps: number = 2;

  isLoading: boolean = false;
  messageDisplayed: Message = { status: '', message: '' };

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
  ) {
    this.customerForm = this.newCustomerForm();
  }

  private newCustomerForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      taxId: ['', [Validators.required, CustomValidators.cpfOrCnpj()]],
    });
  }

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
        this.messageDisplayed = {
          status: 'success',
          message: 'Cliente cadastrado!',
        };

        setTimeout(() => {
          this.navigate('/customers');
        }, 3000);
        this.isLoading = false;
      },
      error: (err) => {
        this.messageDisplayed = {
          status: 'error',
          message: err.error.message ?? 'Tente novamente mais tarde',
        };
        this.isLoading = false;
      },
    });
    this.showMessageHandle();
  }

  showMessageHandle() {
    setTimeout(() => {
      this.messageDisplayed = { status: '', message: '' };
    }, 5000);
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
