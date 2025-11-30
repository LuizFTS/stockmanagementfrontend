import { Component } from '@angular/core';
import { SupplierItem } from './components/supplier-item/supplier-item';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import type { Supplier } from '../../../core/models/Supplier.model';
import { SupplierService } from '../../../core/services/api/supplier.service';
import { ItensNotFound } from '../../../shared/components/itens-not-found/itens-not-found';
import { Router } from '@angular/router';
import { HomeLayout } from '../../../layouts/home-layout/home-layout';
import { ListPageLayout } from '../../../layouts/list-page-layout/list-page-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { ItemSkeleton } from '../../../shared/components/skeleton/item-skeleton/item-skeleton';

@Component({
  selector: 'app-suppliers-page',
  imports: [
    SupplierItem,
    ItensNotFound,
    ReactiveFormsModule,
    ListPageLayout,
    MatTabsModule,
    ItemSkeleton,
  ],
  templateUrl: './suppliers-page.html',
  styleUrl: './suppliers-page.scss',
})
export class SuppliersPage {
  searchForm: FormGroup = new FormGroup({
    search: new FormControl<string>('', { validators: Validators.required }),
  });

  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];

  selectedTabIndex: number = 0;

  isLoading: boolean = true;
  activeStatus: boolean = true;

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 1;
  filter: string = '';

  constructor(
    public supplierService: SupplierService,
    private layout: HomeLayout,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getSuppliers(this.currentPage, this.pageSize, this.activeStatus, { filter: this.filter });
  }

  onSearch(term: string) {
    this.filter = term?.toLowerCase() ?? '';
    this.getSuppliers(this.currentPage, this.pageSize, this.activeStatus, { filter: this.filter });
  }

  onSearchSubmit() {
    this.filter = this.searchForm.value.search?.toLowerCase() ?? '';
    this.getSuppliers(this.currentPage, this.pageSize, this.activeStatus, { filter: this.filter });
  }

  changePage(page: number) {
    if (this.currentPage === page) return;

    this.layout.scrollToTop();

    this.currentPage = page;
    this.getSuppliers(this.currentPage, this.pageSize, this.activeStatus, { filter: this.filter });
  }

  changePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.getSuppliers(this.currentPage, this.pageSize, this.activeStatus, { filter: this.filter });
  }

  onTabChange(index: number) {
    this.selectedTabIndex = index;
    this.activeStatus = index === 0;
    this.currentPage = 1;
    this.getSuppliers(this.currentPage, this.pageSize, this.activeStatus, { filter: this.filter });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  onReactivate() {
    this.onTabChange(0);
  }

  private getSuppliers(
    page: number,
    pageSize: number,
    active: boolean,
    opts?: {
      filter?: string;
      id?: string;
      taxId?: string;
      name?: string;
    },
  ) {
    this.supplierService.get(page - 1, pageSize, active, opts).subscribe({
      next: (response) => {
        this.suppliers = response.content;
        this.filteredSuppliers = response.content;
        this.totalItems = response.totalElements;

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
