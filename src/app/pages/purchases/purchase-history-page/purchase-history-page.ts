import { Component } from '@angular/core';
import type { Purchase } from '../../../core/models/Purchase.model';
import { PurchaseService } from '../../../core/services/api/purchase.service';
import { TransactionItem } from '../../../shared/components/transaction-item/transaction-item';
import { ItensNotFound } from '../../../shared/components/itens-not-found/itens-not-found';
import { Router } from '@angular/router';
import { HomeLayout } from '../../../layouts/home-layout/home-layout';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { SupplierService } from '../../../core/services/api/supplier.service';
import { ListPageLayout } from '../../../layouts/list-page-layout/list-page-layout';
import { ItemSkeleton } from '../../../shared/components/skeleton/item-skeleton/item-skeleton';
import { ResponseMessageService } from '../../../core/services/response-message.service';

@Component({
  selector: 'app-purchase-history-page',
  imports: [TransactionItem, ItensNotFound, ReactiveFormsModule, ListPageLayout, ItemSkeleton],
  templateUrl: './purchase-history-page.html',
  styleUrl: './purchase-history-page.scss',
})
export class PurchaseHistoryPage {
  purchases: Purchase[] = [];
  filteredPurchases: Purchase[] = [];

  searchForm: FormGroup = new FormGroup({
    search: new FormControl<string>('', { validators: Validators.required }),
  });

  isLoading: boolean = true;

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 1;
  filter: string = '';

  constructor(
    private purchaseService: PurchaseService,
    public supplierService: SupplierService,
    private layout: HomeLayout,
    private router: Router,
    private messageService: ResponseMessageService,
  ) {}

  ngOnInit() {
    this.getPurchases(1, 10);
  }

  onSearch(term: string) {
    this.filter = term?.toLowerCase() ?? '';
    this.getPurchases(this.currentPage, this.pageSize, { filter: this.filter });
  }

  onSearchSubmit() {
    this.filter = this.searchForm.value.search?.toLowerCase() ?? '';
    this.getPurchases(this.currentPage, this.pageSize, { filter: this.filter });
  }

  changePage(page: number) {
    if (this.currentPage === page) return;

    this.layout.scrollToTop();

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
        this.isLoading = false;
      },
      error: () => {
        this.messageService.error('Erro ao buscar compras');
        this.isLoading = false;
      },
    });
  }
}
