import { Component, inject, Input, type OnChanges } from '@angular/core';
import { Button } from '../../../../../shared/components/button/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Formatter } from '../../../../../shared/utils/Formatter';

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

  formatValue(value: number): string {
    return Formatter.priceToString(value);
  }

  capitalize(str: string) {
    return Formatter.capitalize(str);
  }

  navigate(path: string[]) {
    this.router.navigate(path);
  }
}
