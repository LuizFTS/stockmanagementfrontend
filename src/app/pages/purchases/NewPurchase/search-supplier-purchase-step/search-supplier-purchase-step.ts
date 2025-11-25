import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { FormGroup } from '@angular/forms';
import { Button } from '../../../../shared/components/button/button';
import { SupplierService } from '../../../../core/services/api/supplier.service';
import { SearchInput } from '../../../../shared/components/search-input/search-input';
import { ResponseMessageService } from '../../../../core/services/response-message.service';

@Component({
  selector: 'stk-search-supplier-purchase-step',
  imports: [Button, SearchInput],
  templateUrl: './search-supplier-purchase-step.html',
  styleUrl: './search-supplier-purchase-step.scss',
})
export class SearchSupplierPurchaseStep {
  @Input() form!: FormGroup;
  @Input() isLoading!: boolean;

  @Output() nextStep = new EventEmitter<void>();
  @Output() isLoadingChange = new EventEmitter<boolean>();

  constructor(
    public supplierService: SupplierService,
    public responseMessageService: ResponseMessageService,
  ) {}

  next() {
    if (this.form.get('supplierName')?.invalid) return;
    this.isLoadingChange.emit(true);
    this.getSupplierByName();
  }

  onEnter() {
    if (this.form.get('supplierName')?.valid) {
      this.nextStep.emit();
    }
  }

  onSearch(term: string) {
    this.form.patchValue({ supplierName: term });
  }

  private getSupplierByName() {
    const name = this.form.get('supplierName')?.value;

    this.supplierService.get(0, 1, { name: name }).subscribe({
      next: (response) => {
        this.form.patchValue({ supplierId: response.content[0].id });
        this.nextStep.emit();
      },
      error: (err) => {
        this.responseMessageService.error(err.error.message ?? 'Tente novamente mais tarde');
      },
    });
    this.isLoadingChange.emit(false);
  }
}
