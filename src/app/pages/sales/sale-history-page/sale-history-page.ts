import { Component, inject } from '@angular/core';
import type { Sale } from '../../../core/models/Sale.model';
import { SaleService } from '../../../core/services/sale.service';
import { TransactionItem } from '../../../shared/components/transaction-item/transaction-item';
import { Card } from '../../../shared/components/card/card';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { ItensNotFound } from '../../../shared/components/itens-not-found/itens-not-found';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale-history-page',
  imports: [TransactionItem, Card, SearchInput, ItensNotFound, Pagination],
  templateUrl: './sale-history-page.html',
  styleUrl: './sale-history-page.scss',
})
export class SaleHistoryPage {
  private router = inject(Router);

  sales: Sale[] = [];
  filteredSales: Sale[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 1;
  filter: string = '';

  constructor(private saleService: SaleService) {}

  ngOnInit() {
    this.getSales(1, 10);
  }

  onSearch(term: string) {
    this.filter = term?.toLowerCase() ?? '';
    this.getSales(this.currentPage, this.pageSize, { filter: this.filter });
  }

  changePage(page: number) {
    if (this.currentPage === page) return;
    this.currentPage = page;
    this.getSales(this.currentPage, this.pageSize, { filter: this.filter });
  }

  changePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.getSales(this.currentPage, this.pageSize, { filter: this.filter });
  }

  private getSales(
    page: number,
    pageSize: number,
    opts?: {
      filter?: string;
      id?: string;
      taxId?: string;
      name?: string;
    },
  ) {
    this.saleService.get(page - 1, pageSize, opts).subscribe({
      next: (response) => {
        this.sales = response.content;
        this.filteredSales = response.content;
        this.totalItems = response.totalElements;
      },
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
