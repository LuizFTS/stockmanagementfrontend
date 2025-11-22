import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Button } from '../../../../../shared/components/button/button';
import { Router } from '@angular/router';

@Component({
  selector: 'stk-customer-item',
  imports: [MatIcon, Button],
  templateUrl: './customer-item.html',
  styleUrl: './customer-item.scss',
})
export class CustomerItem {
  private router = inject(Router);
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() taxId: string = '';
  @Input() phone: string = '';
  @Input() email: string = '';
  @Input() index: number = 0;

  firstItem: boolean = false;

  ngOnChanges() {
    this.firstItem = this.index === 0;
  }

  navigate(path: string[]) {
    this.router.navigate(path);
  }
}
