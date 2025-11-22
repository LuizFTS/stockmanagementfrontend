import { Component, inject, Input, type OnChanges } from '@angular/core';
import { Button } from '../../../../../shared/components/button/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'stk-product-item',
  imports: [MatIcon, Button],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem implements OnChanges {
  private router = inject(Router);
  @Input() id: string = '';
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

  navigate(path: string[]) {
    this.router.navigate(path);
  }
}
