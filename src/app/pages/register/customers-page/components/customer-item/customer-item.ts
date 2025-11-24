import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Button } from '../../../../../shared/components/button/button';
import { Router } from '@angular/router';
import { Formatter } from '../../../../../shared/utils/Formatter';

@Component({
  selector: 'stk-customer-item',
  imports: [MatIcon, Button],
  templateUrl: './customer-item.html',
  styleUrl: './customer-item.scss',
})
export class CustomerItem {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() taxId: string = '';
  @Input() phone: string = '';
  @Input() email: string = '';
  @Input() index: number = 0;

  firstItem: boolean = false;

  constructor(private router: Router) {}

  ngOnChanges() {
    this.firstItem = this.index === 0;
  }

  navigate(path: string[]) {
    this.router.navigate(path);
  }

  capitalize(str: string) {
    return Formatter.capitalize(str);
  }

  formatTaxId(value: string) {
    return Formatter.taxId(value);
  }

  formatPhone(value: string) {
    return Formatter.phone(value);
  }
}
