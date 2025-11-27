import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/api/product.service';
import { InventoryService } from '../../../core/services/api/inventory.service';
import type { InventoryMovement } from '../../../core/models/InventoryMovement.model';
import { ResponseMessageService } from '../../../core/services/response-message.service';
import { CustomValidators } from '../../../shared/utils/CustomValidators';
import { FilterComponent } from './components/filter-component/filter-component';
import { Card } from '../../../shared/components/card/card';
import { Formatter } from '../../../shared/utils/Formatter';
import { MatIcon } from '@angular/material/icon';
import { TableComponent } from './components/table-component/table-component';

@Component({
  selector: 'app-inventory-movement-page',
  imports: [ReactiveFormsModule, FilterComponent, TableComponent, Card, MatIcon],
  templateUrl: './inventory-movement-page.html',
  styleUrl: './inventory-movement-page.scss',
})
export class InventoryMovementPage {
  inventoryMovements: InventoryMovement[] = [];
  isLoading: boolean = false;
  filter: string = '';

  constructor(
    public productService: ProductService,
    private inventoryService: InventoryService,
    private ResponseMessageService: ResponseMessageService,
  ) {}

  searchProductForm = new FormGroup(
    {
      search: new FormControl<string>('', { validators: Validators.required }),
      productId: new FormControl<string>('', { validators: Validators.required }),
      startPeriod: new FormControl<string>('', { validators: Validators.required }),
      endPeriod: new FormControl<string>('', { validators: Validators.required }),
    },
    {
      validators: CustomValidators.periodValidator(),
    },
  );

  onSearchSubmit() {
    if (this.searchProductForm.invalid) return;
    this.isLoading = true;

    const productId = this.searchProductForm.value.productId;
    const startPeriod = this.searchProductForm.value.startPeriod;
    const endPeriod = this.searchProductForm.value.endPeriod;

    if (!productId || !startPeriod || !endPeriod) return;

    const data = {
      productId,
      startPeriod,
      endPeriod,
    };

    this.inventoryService.get(data.productId, data.startPeriod, data.endPeriod).subscribe({
      next: (response) => {
        this.inventoryMovements = response;
        console.log(this.inventoryMovements);
        this.isLoading = false;
      },
      error: (err) => {
        this.ResponseMessageService.error(
          err.error.message ?? 'Erro ao buscar movimentação do estoque',
        );
        this.isLoading = false;
      },
    });
  }

  currentMovementValue(
    previousBalance: number,
    currentBalance: number,
  ): { value: string; class: string } {
    if (currentBalance > previousBalance)
      return { value: `+${currentBalance - previousBalance}`, class: 'positive' };
    return { value: `-${previousBalance - currentBalance}`, class: 'negative' };
  }

  formatDate(date: string) {
    return Formatter.date(date);
  }

  formatHour(date: string) {
    return Formatter.hours(date);
  }

  formatCurrence(value: number) {
    return Formatter.priceToString(value);
  }

  formatCapitalize(text: string) {
    return Formatter.capitalize(text);
  }
}
