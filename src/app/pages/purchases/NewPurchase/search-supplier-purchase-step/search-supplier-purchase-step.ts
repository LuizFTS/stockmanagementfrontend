import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { Button } from '../../../../shared/components/button/button';
import { TextInput } from '../../../../shared/components/text-input/text-input';
import { SupplierService } from '../../../../core/services/supplier.service';

@Component({
  selector: 'stk-search-supplier-purchase-step',
  imports: [Button, TextInput],
  templateUrl: './search-supplier-purchase-step.html',
  styleUrl: './search-supplier-purchase-step.scss',
})
export class SearchSupplierPurchaseStep {
  @Input() form!: FormGroup;
  @Input() isLoading!: boolean;

  @Output() nextStep = new EventEmitter<void>();
  @Output() isLoadingChange = new EventEmitter<boolean>();
  @Output() showMessage = new EventEmitter<{ message: string; status: string }>();

  constructor(private supplierService: SupplierService) {}

  next() {
    if (this.form.get('supplierTaxId')?.invalid) return;
    this.isLoadingChange.emit(true);
    this.getSupplierByTaxId();
  }

  onEnter() {
    if (this.form.get('supplierTaxId')?.valid) {
      this.nextStep.emit();
    }
  }

  private getSupplierByTaxId() {
    const taxId = this.form.get('supplierTaxId')?.value.replace(/\D/g, '');

    this.supplierService.get(0, 1, { taxId: taxId }).subscribe({
      next: (response) => {
        this.form.patchValue({ supplierId: response.content[0].id });
        this.nextStep.emit();
      },
      error: (err) => {
        this.showMessage.emit({ message: err.error.message, status: 'error' });
      },
    });
    this.isLoadingChange.emit(false);
  }
}
