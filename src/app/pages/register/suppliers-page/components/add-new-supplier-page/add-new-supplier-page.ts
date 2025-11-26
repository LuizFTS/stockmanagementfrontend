import { Component } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CustomValidators } from '../../../../../shared/utils/CustomValidators';
import { Stepper } from '../../../../../shared/components/stepper/stepper';
import { SupplierTaxId } from '../supplier-tax-id/supplier-tax-id';
import { Card } from '../../../../../shared/components/card/card';
import { SupplierGeneralInformation } from '../supplier-general-information/supplier-general-information';
import { SupplierService } from '../../../../../core/services/api/supplier.service';
import { Router } from '@angular/router';
import { Formatter } from '../../../../../shared/utils/Formatter';
import { ResponseMessageService } from '../../../../../core/services/response-message.service';

@Component({
  selector: 'app-add-new-supplier-page',
  imports: [Stepper, SupplierTaxId, Card, SupplierGeneralInformation, ReactiveFormsModule],
  templateUrl: './add-new-supplier-page.html',
  styleUrl: './add-new-supplier-page.scss',
})
export class AddNewSupplierPage {
  supplierForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', { validators: Validators.required }),
    phone: new FormControl<string>('', { validators: Validators.required }),
    email: new FormControl<string>('', { validators: [Validators.required, Validators.email] }),
    taxId: new FormControl<string>('', {
      validators: [Validators.required, CustomValidators.cnpj()],
    }),
  });
  currentStep: number = 1;
  totalSteps: number = 2;

  isLoading: boolean = false;

  constructor(
    private supplierService: SupplierService,
    private router: Router,
    private responseMessageService: ResponseMessageService,
  ) {}

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
        this.responseMessageService.success('Fornecedor cadastrado!');

        this.navigate('/suppliers');
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
