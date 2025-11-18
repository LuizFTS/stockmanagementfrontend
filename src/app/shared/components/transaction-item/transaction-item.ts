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

  @Input() itens: { qt: number; index: number } = { qt: 0, index: 0 };

  lastItem: boolean = false;
  firstItem: boolean = false;

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  ngOnInit() {
    this.lastItem = this.itens.index === this.itens.qt - 1;
    this.firstItem = this.itens.index === 0;
  }

  formatValue(value: number): string {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
