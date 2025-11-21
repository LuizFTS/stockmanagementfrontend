import { Component } from '@angular/core';
import type { Sale } from '../../../core/models/Sale.model';
import { SaleService } from '../../../core/services/sale.service';
import { TransactionItem } from '../../../shared/components/transaction-item/transaction-item';
import { Card } from '../../../shared/components/card/card';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { ItensNotFound } from '../../../shared/components/itens-not-found/itens-not-found';

@Component({
  selector: 'app-sale-history-page',
  imports: [TransactionItem, Card, SearchInput, ItensNotFound],
  templateUrl: './sale-history-page.html',
  styleUrl: './sale-history-page.scss',
})
export class SaleHistoryPage {
  sales: Sale[] = [];
  filteredSales: Sale[] = [];

  constructor(private saleService: SaleService) {}

  ngOnInit() {
    this.saleService.getSales().subscribe({
      next: (response) => {
        this.sales = response.content;
        this.filteredSales = response.content;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onSearch(term: string) {
    const value = term?.toLowerCase() ?? '';

    this.filteredSales = this.sales.filter((p) => {
      return (
        p.customer.name.toLowerCase().includes(value) || p.seller.name.toLowerCase().includes(value)
      );
    });
  }
}
