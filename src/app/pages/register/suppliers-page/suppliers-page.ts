import { Component } from '@angular/core';
import { Stepper } from '../../../shared/components/stepper/stepper';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CnpjValidator } from '../../../shared/utils/CnpjValidator';
import { SupplierTaxId } from './components/supplier-tax-id/supplier-tax-id';
import { Card } from '../../../shared/components/card/card';
import { SupplierGeneralInformation } from './components/supplier-general-information/supplier-general-information';

@Component({
  selector: 'app-suppliers-page',
  imports: [Stepper, SupplierTaxId, Card, SupplierGeneralInformation],
  templateUrl: './suppliers-page.html',
  styleUrl: './suppliers-page.scss',
})
export class SuppliersPage {
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
