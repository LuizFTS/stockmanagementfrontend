import { Component, Input, type OnChanges } from '@angular/core';

@Component({
  selector: 'stk-product-item',
  imports: [],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem implements OnChanges {
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() costPrice: number = 0;
  @Input() salePrice: number = 0;
  @Input() createdAt: string = '';
  @Input() saldo: number = 0;

  @Input() index: number = 0;

  firstItem: boolean = false;

  ngOnChanges() {
    this.firstItem = this.index === 0;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  formatValue(value: number): string {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
