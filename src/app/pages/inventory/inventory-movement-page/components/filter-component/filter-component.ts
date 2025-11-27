import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Button } from '../../../../../shared/components/button/button';
import { SearchInput } from '../../../../../shared/components/search-input/search-input';
import { SelectInput } from '../../../../../shared/components/select-input/select-input';
import { ReactiveFormsModule, type FormGroup } from '@angular/forms';
import { ProductService } from '../../../../../core/services/api/product.service';

@Component({
  selector: 'stk-filter-component',
  imports: [Button, SearchInput, SelectInput, ReactiveFormsModule],
  templateUrl: './filter-component.html',
  styleUrl: './filter-component.scss',
})
export class FilterComponent {
  @Input() searchProductForm!: FormGroup;
  @Input() isLoading!: boolean;
  @Output() onSearchSubmit = new EventEmitter<void>();

  monthStart: string = this.currentMonth;
  yearStart: string = this.currentYear;

  monthEnd: string = this.currentMonth;
  yearEnd: string = this.currentYear;

  filter: string = '';

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.searchProductForm.patchValue({
      ...this.searchProductForm.value,
      startPeriod: this.startPeriod,
      endPeriod: this.endPeriod,
    });
  }

  onSearch(term: string) {
    this.filter = term?.toLowerCase() ?? '';
    this.getProducts(0, 1, { filter: this.filter });
  }

  onSubmit() {
    this.onSearchSubmit.emit();
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
    this.productService.get(page, pageSize, true, opts).subscribe({
      next: (response) => {
        this.searchProductForm.patchValue({
          ...this.searchProductForm.value,
          productId: response.content[0].id,
        });
      },
    });
  }
}
