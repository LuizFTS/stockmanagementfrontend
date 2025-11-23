import { Component, inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from '../../../../../shared/utils/CustomValidators';
import { Stepper } from '../../../../../shared/components/stepper/stepper';
import { SupplierTaxId } from '../supplier-tax-id/supplier-tax-id';
import { Card } from '../../../../../shared/components/card/card';
import { SupplierGeneralInformation } from '../supplier-general-information/supplier-general-information';
import { SupplierService } from '../../../../../core/services/supplier.service';
import { MessageNotificationComponent } from '../../../../../shared/components/message-notification-component/message-notification-component';
import { Router } from '@angular/router';
import { Formatter } from '../../../../../shared/utils/Formatter';
import type { ResponseStatus } from '../../../../../core/models/ResponseStatus.model';

@Component({
  selector: 'app-add-new-supplier-page',
  imports: [
    Stepper,
    SupplierTaxId,
    Card,
    SupplierGeneralInformation,
    ReactiveFormsModule,
    MessageNotificationComponent,
  ],
  templateUrl: './add-new-supplier-page.html',
  styleUrl: './add-new-supplier-page.scss',
})
export class AddNewSupplierPage {
  private router = inject(Router);
  supplierForm: FormGroup;
  currentStep: number = 1;
  totalSteps: number = 2;

  isLoading: boolean = false;
  messageDisplayed: ResponseStatus = { status: '', message: '' };

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
  ) {
    this.supplierForm = this.newSupplierForm();
  }

  private newSupplierForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      taxId: ['', [Validators.required, CustomValidators.cnpj()]],
    });
  }

  onAddNewSupplier() {
    if (this.supplierForm.invalid) return;
    this.isLoading = true;

    const formValue = this.supplierForm.value;

    const updateData = {
      taxId: formValue.taxId.replace(/\D/g, ''),
      name: Formatter.capitalize(formValue.name.toLowerCase()),
      phone: formValue.phone.replace(/\D/g, ''),
      email: formValue.email,
    };

    this.supplierService.create(updateData).subscribe({
      next: () => {
        this.messageDisplayed = {
          status: 'success',
          message: 'Fornecedor cadastrado!',
        };

        setTimeout(() => {
          this.navigate('/suppliers');
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
