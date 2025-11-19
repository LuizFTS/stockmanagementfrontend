import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'stk-transaction-item',
  imports: [MatIcon],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss',
})
export class TransactionItem {
  @Input() nameInfo: { type: string; name: string } = { type: '', name: '' };
  @Input() date: string = '';
  @Input() value: number = 0;

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
}
