import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { ProductService } from '../../../core/services/api/product.service';
import { SelectInput } from '../../../shared/components/select-input/select-input';
import { Button } from '../../../shared/components/button/button';
import { InventoryService } from '../../../core/services/api/inventory.service';
import type { InventoryMovement } from '../../../core/models/InventoryMovement.model';

@Component({
  selector: 'app-inventory-movement-page',
  imports: [SearchInput, ReactiveFormsModule, SelectInput, Button],
  templateUrl: './inventory-movement-page.html',
  styleUrl: './inventory-movement-page.scss',
})
export class InventoryMovementPage {
  searchProductForm: FormGroup;

  monthStart: string = this.currentMonth;
  yearStart: string = this.currentYear;

  monthEnd: string = this.currentMonth;
  yearEnd: string = this.currentYear;

  inventoryMovements: InventoryMovement[] = [];

  filter: string = '';

  constructor(
    private fb: FormBuilder,
    public productService: ProductService,
    private inventoryService: InventoryService,
  ) {
    this.searchProductForm = this.fb.group({
      search: [''],
      productId: [''],
      startPeriod: [this.startPeriod],
      endPeriod: [this.endPeriod],
    });
  }

  onSearch(term: string) {
    this.filter = term?.toLowerCase() ?? '';
    this.getProducts(0, 1, { filter: this.filter });
  }

  onSearchSubmit() {
    const data = {
      productId: this.searchProductForm.value.productId,
      startPeriod: this.searchProductForm.value.startPeriod,
      endPeriod: this.searchProductForm.value.endPeriod,
    };

    this.inventoryService.get(data.productId, data.startPeriod, data.endPeriod).subscribe({
      next: (response) => {
        this.inventoryMovements = response.content;
        console.log(this.inventoryMovements);
      },
    });
  }

  get months(): string[] {
    return Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  }

  get currentMonth(): string {
    const date = new Date().getMonth() + 1;
    return date.toString().padStart(2, '0');
  }

  selectMonthStart(month: string) {
    this.monthStart = month;
    this.searchProductForm.patchValue({
      ...this.searchProductForm.value,
      startPeriod: this.startPeriod,
    });
  }

  selectMonthEnd(month: string) {
    this.monthEnd = month;
    this.searchProductForm.patchValue({
      ...this.searchProductForm.value,
      endPeriod: this.endPeriod,
    });
  }

  get currentYear(): string {
    const date = new Date();
    return date.getFullYear().toString();
  }

  get years(): string[] {
    const currentYear = new Date().getFullYear();
    const years: string[] = [];
    for (let i = 0; i <= 5; i++) {
      years.push((currentYear - i).toString());
    }
    return years;
  }

  selectYearStart(year: string) {
    this.yearStart = year;
    this.searchProductForm.patchValue({
      ...this.searchProductForm.value,
      startPeriod: this.startPeriod,
    });
  }

  selectYearEnd(year: string) {
    this.yearEnd = year;
    this.searchProductForm.patchValue({
      ...this.searchProductForm.value,
      endPeriod: this.endPeriod,
    });
  }

  get startPeriod() {
    return `${this.monthStart}${this.yearStart}`;
  }

  get endPeriod() {
    return `${this.monthEnd}${this.yearEnd}`;
  }

  private getProducts(
    page: number,
    pageSize: number,
    opts?: {
      filter?: string;
      id?: string;
      name?: string;
    },
  ) {
    this.productService.get(page, pageSize, opts).subscribe({
      next: (response) => {
        this.searchProductForm.patchValue({
          ...this.searchProductForm.value,
          productId: response.content[0].id,
        });
      },
    });
  }
}
