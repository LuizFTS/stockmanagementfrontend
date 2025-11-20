import { Component } from '@angular/core';
import type { Purchase } from '../../../core/models/Purchase.model';
import { PurchaseService } from '../../../core/services/purchase.service';
import { TransactionItem } from '../../../shared/components/transaction-item/transaction-item';
import { Card } from '../../../shared/components/card/card';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { ItensNotFound } from '../../../shared/components/itens-not-found/itens-not-found';

@Component({
  selector: 'app-purchase-history-page',
  imports: [TransactionItem, Card, SearchInput, ItensNotFound],
  templateUrl: './purchase-history-page.html',
  styleUrl: './purchase-history-page.scss',
})
export class PurchaseHistoryPage {
  purchases: Purchase[] = [];
  filteredPurchases: Purchase[] = [];

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit() {
    this.purchaseService.getPurchases().subscribe({
      next: (response) => {
        this.purchases = response;
        this.filteredPurchases = response;
        console.log(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSearch(term: string) {
    const value = term?.toLowerCase() ?? '';

    this.filteredPurchases = this.purchases.filter((p) => {
      return (
        p.supplier.name.toLowerCase().includes(value) || p.buyer.name.toLowerCase().includes(value)
      );
    });
  }
}
