import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { TextInput } from '../../../../shared/components/text-input/text-input';
import type { FormGroup } from '@angular/forms';
import { CustomerService } from '../../../../core/services/customer.service';

@Component({
  selector: 'stk-search-customer-sale-step',
  imports: [Button, TextInput],
  templateUrl: './search-customer-sale-step.html',
  styleUrl: './search-customer-sale-step.scss',
})
export class SearchCustomerSaleStep {
  @Input() form!: FormGroup;
  @Input() isLoading!: boolean;

  @Output() nextStep = new EventEmitter<void>();
  @Output() isLoadingChange = new EventEmitter<boolean>();
  @Output() showMessage = new EventEmitter<{ message: string; status: string }>();

  constructor(private customerService: CustomerService) {}

  next() {
    if (this.form.get('customerTaxId')?.invalid) return;
    this.isLoadingChange.emit(true);
    this.getCustomerByTaxId();
  }

  onEnter() {
    if (this.form.get('customerTaxId')?.valid) {
      this.nextStep.emit();
    }
  }

  private getCustomerByTaxId() {
    const taxId = this.form.get('customerTaxId')?.value.replace(/\D/g, '');

    this.customerService.get(0, 1, { taxId: taxId }).subscribe({
      next: (response) => {
        this.form.patchValue({ customerId: response.content[0].id });
        this.nextStep.emit();
      },
      error: (err) => {
        this.showMessage.emit({ message: err.error.message, status: 'error' });
      },
    });
    this.isLoadingChange.emit(false);
  }
}
