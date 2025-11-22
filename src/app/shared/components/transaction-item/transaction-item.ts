import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Button } from '../button/button';

@Component({
  selector: 'stk-transaction-item',
  imports: [MatIcon, Button],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss',
})
export class TransactionItem {
  private router = inject(Router);
  @Input() nameInfo: { type: string; name: string } = { type: '', name: '' };
  @Input() date: string = '';
  @Input() value: number = 0;
  @Input() id: string = '';
  @Input() index: number = 0;

  firstItem: boolean = false;

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  ngOnInit() {
    this.firstItem = this.index === 0;
  }

  formatValue(value: number): string {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  get path(): string {
    if (this.nameInfo.type === 'Fornecedor') {
      return `/purchases/${this.id}`;
    }
    return this.id.length > 0 ? `/sales/${this.id}` : '';
  }

  navigateTo() {
    this.router.navigate([this.path]);
  }
}
