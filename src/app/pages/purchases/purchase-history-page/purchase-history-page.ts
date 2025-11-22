import { Component, inject } from '@angular/core';
import type { Purchase } from '../../../core/models/Purchase.model';
import { PurchaseService } from '../../../core/services/purchase.service';
import { TransactionItem } from '../../../shared/components/transaction-item/transaction-item';
import { Card } from '../../../shared/components/card/card';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { ItensNotFound } from '../../../shared/components/itens-not-found/itens-not-found';
import { Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-purchase-history-page',
  imports: [TransactionItem, Card, SearchInput, ItensNotFound, Button, Pagination],
  templateUrl: './purchase-history-page.html',
  styleUrl: './purchase-history-page.scss',
})
export class PurchaseHistoryPage {
  private router = inject(Router);
  purchases: Purchase[] = [];
  filteredPurchases: Purchase[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 1;
  filter: string = '';

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit() {
    this.getPurchases(1, 10);
  }

  onSearch(term: string) {
    this.filter = term?.toLowerCase() ?? '';
    this.getPurchases(this.currentPage, this.pageSize, { filter: this.filter });
  }

  changePage(page: number) {
    if (this.currentPage === page) return;
    this.currentPage = page;
    this.getPurchases(this.currentPage, this.pageSize, { filter: this.filter });
  }

  changePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.getPurchases(this.currentPage, this.pageSize, { filter: this.filter });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  private getPurchases(
    page: number,
    pageSize: number,
    opts?: {
      filter?: string;
      id?: string;
      taxId?: string;
      name?: string;
    },
  ) {
    this.purchaseService.get(page - 1, pageSize, opts).subscribe({
      next: (response) => {
        this.purchases = response.content;
        this.filteredPurchases = response.content;
        this.totalItems = response.totalElements;
      },
    });
  }
}
