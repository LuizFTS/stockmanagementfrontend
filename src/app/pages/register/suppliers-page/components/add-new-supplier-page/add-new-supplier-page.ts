import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CnpjValidator } from '../../../../../shared/utils/CnpjValidator';
import { Stepper } from '../../../../../shared/components/stepper/stepper';
import { SupplierTaxId } from '../supplier-tax-id/supplier-tax-id';
import { Card } from '../../../../../shared/components/card/card';
import { SupplierGeneralInformation } from '../supplier-general-information/supplier-general-information';
import { BackButton } from '../../../../../shared/components/back-button/back-button';

@Component({
  selector: 'app-add-new-supplier-page',
  imports: [Stepper, SupplierTaxId, Card, SupplierGeneralInformation, BackButton],
  templateUrl: './add-new-supplier-page.html',
  styleUrl: './add-new-supplier-page.scss',
})
export class AddNewSupplierPage {
  supplierForm: FormGroup;
  currentStep: number = 1;
  totalSteps: number = 2;

  constructor(private fb: FormBuilder) {
    this.supplierForm = this.newSupplierForm();
  }

  private newSupplierForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cnpj: ['', [Validators.required, CnpjValidator.cnpj()]],
    });
  }

  nextStep() {
    this.currentStep++;
  }

  back() {
    this.currentStep--;
  }
}
