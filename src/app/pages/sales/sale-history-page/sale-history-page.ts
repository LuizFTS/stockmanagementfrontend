import { Component } from '@angular/core';
import type { Sale } from '../../../core/models/Sale.model';
import { SaleService } from '../../../core/services/api/sale.service';
import { TransactionItem } from '../../../shared/components/transaction-item/transaction-item';
import { ItensNotFound } from '../../../shared/components/itens-not-found/itens-not-found';
import { Router } from '@angular/router';
import { HomeLayout } from '../../../layouts/home-layout/home-layout';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../../core/services/api/customer.service';
import { ListPageLayout } from '../../../layouts/list-page-layout/list-page-layout';

@Component({
  selector: 'app-sale-history-page',
  imports: [TransactionItem, ItensNotFound, ReactiveFormsModule, ListPageLayout],
  templateUrl: './sale-history-page.html',
  styleUrl: './sale-history-page.scss',
})
export class SaleHistoryPage {
  sales: Sale[] = [];
  filteredSales: Sale[] = [];

  searchForm: FormGroup;

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 1;
  filter: string = '';

  constructor(
    public customerService: CustomerService,
    private saleService: SaleService,
    private layout: HomeLayout,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.getSales(1, 10);
  }

  onSearch(term: string) {
    this.filter = term?.toLowerCase() ?? '';
    this.getSales(this.currentPage, this.pageSize, { filter: this.filter });
  }

  onSearchSubmit() {
    this.filter = this.searchForm.value.search?.toLowerCase() ?? '';
    this.getSales(this.currentPage, this.pageSize, { filter: this.filter });
  }

  changePage(page: number) {
    if (this.currentPage === page) return;

    this.layout.scrollToTop();

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
