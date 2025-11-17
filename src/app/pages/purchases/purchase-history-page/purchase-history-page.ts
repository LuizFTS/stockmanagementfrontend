import { Component } from '@angular/core';
import type { Purchase } from '../../../core/models/Purchase.model';
import { MatIcon } from '@angular/material/icon';
import { PurchaseService } from '../../../core/services/purchase.service';

@Component({
  selector: 'app-purchase-history-page',
  imports: [MatIcon],
  templateUrl: './purchase-history-page.html',
  styleUrl: './purchase-history-page.scss',
})
export class PurchaseHistoryPage {
  purchases: Purchase[] = [];

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit() {
    this.purchaseService.getPurchases().subscribe({
      next: (response) => {
        this.purchases = response;
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
