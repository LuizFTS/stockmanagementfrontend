import { Component } from '@angular/core';
import type { Sale } from '../../../core/models/Sale.model';
import { SaleService } from '../../../core/services/sale.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sale-history-page',
  imports: [MatIcon],
  templateUrl: './sale-history-page.html',
  styleUrl: './sale-history-page.scss',
})
export class SaleHistoryPage {
  sales: Sale[] = [];

  constructor(private saleService: SaleService) {}

  ngOnInit() {
    this.saleService.getSales().subscribe({
      next: (response) => {
        this.sales = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
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
