import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import type { FormGroup } from '@angular/forms';
import { CustomerService } from '../../../../core/services/api/customer.service';
import { SearchInput } from '../../../../shared/components/search-input/search-input';
import { ResponseMessageService } from '../../../../core/services/response-message.service';

@Component({
  selector: 'stk-search-customer-sale-step',
  imports: [Button, SearchInput],
  templateUrl: './search-customer-sale-step.html',
  styleUrl: './search-customer-sale-step.scss',
})
export class SearchCustomerSaleStep {
  @Input() form!: FormGroup;
  @Input() isLoading!: boolean;

  @Output() nextStep = new EventEmitter<void>();
  @Output() isLoadingChange = new EventEmitter<boolean>();

  filter: string = '';

  constructor(
    public customerService: CustomerService,
    private responseMessageService: ResponseMessageService,
  ) {}

  next() {
    if (this.form.get('customerName')?.invalid) return;
    this.isLoadingChange.emit(true);
    this.getCustomerByName();
  }

  onSearch(term: string) {
    this.form.patchValue({ customerName: term });
  }

  onEnter() {
    if (this.form.get('customerName')?.valid) {
      this.nextStep.emit();
    }
  }

  private getCustomerByName() {
    const name = this.form.get('customerName')?.value;

    this.customerService.get(0, 1, { name: name }).subscribe({
      next: (response) => {
        this.form.patchValue({ customerId: response.content[0].id });
        this.nextStep.emit();
      },
      error: (err) => {
        this.responseMessageService.error(err.error.message);
      },
    });
    this.isLoadingChange.emit(false);
  }
}
