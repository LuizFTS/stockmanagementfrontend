import { Component } from '@angular/core';
import { SupplierItem } from './components/supplier-item/supplier-item';
import { type FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import type { Supplier } from '../../../core/models/Supplier.model';
import { SupplierService } from '../../../core/services/api/supplier.service';
import { ItensNotFound } from '../../../shared/components/itens-not-found/itens-not-found';
import { Router } from '@angular/router';
import { HomeLayout } from '../../../layouts/home-layout/home-layout';
import { ListPageLayout } from '../../../layouts/list-page-layout/list-page-layout';

@Component({
  selector: 'app-suppliers-page',
  imports: [SupplierItem, ItensNotFound, ReactiveFormsModule, ListPageLayout],
  templateUrl: './suppliers-page.html',
  styleUrl: './suppliers-page.scss',
})
export class SuppliersPage {
  searchForm: FormGroup;

  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 1;
  filter: string = '';

  constructor(
    public supplierService: SupplierService,
    private layout: HomeLayout,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.getSuppliers(this.currentPage, this.pageSize, { filter: this.filter });
  }

  onSearch(term: string) {
    this.filter = term?.toLowerCase() ?? '';
    this.getSuppliers(this.currentPage, this.pageSize, { filter: this.filter });
  }

  onSearchSubmit() {
    this.filter = this.searchForm.value.search?.toLowerCase() ?? '';
    this.getSuppliers(this.currentPage, this.pageSize, { filter: this.filter });
  }

  changePage(page: number) {
    if (this.currentPage === page) return;

    this.layout.scrollToTop();

    this.currentPage = page;
    this.getSuppliers(this.currentPage, this.pageSize, { filter: this.filter });
  }

  changePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.getSuppliers(this.currentPage, this.pageSize, { filter: this.filter });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  private getSuppliers(
    page: number,
    pageSize: number,
    opts?: {
      filter?: string;
      id?: string;
      taxId?: string;
      name?: string;
    },
  ) {
    this.supplierService.get(page - 1, pageSize, opts).subscribe({
      next: (response) => {
        this.suppliers = response.content;
        this.filteredSuppliers = response.content;
        this.totalItems = response.totalElements;
      },
    });
  }
}
