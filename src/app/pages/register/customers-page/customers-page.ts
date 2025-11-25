import { Component } from '@angular/core';
import { CustomerItem } from './components/customer-item/customer-item';
import { ItensNotFound } from '../../../shared/components/itens-not-found/itens-not-found';
import { Router } from '@angular/router';
import { FormBuilder, type FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { Customer } from '../../../core/models/Customer.model';
import { CustomerService } from '../../../core/services/api/customer.service';
import { HomeLayout } from '../../../layouts/home-layout/home-layout';
import { ListPageLayout } from '../../../layouts/list-page-layout/list-page-layout';

@Component({
  selector: 'app-customers-page',
  imports: [CustomerItem, ItensNotFound, ReactiveFormsModule, ListPageLayout],
  templateUrl: './customers-page.html',
  styleUrl: './customers-page.scss',
})
export class CustomersPage {
  searchForm: FormGroup;

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 1;
  filter: string = '';

  constructor(
    public customerService: CustomerService,
    private layout: HomeLayout,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.getCustomers(this.currentPage, this.pageSize, { filter: this.filter });
  }

  onSearch(term: string) {
    this.filter = term?.toLowerCase() ?? '';
    this.getCustomers(this.currentPage, this.pageSize, { filter: this.filter });
  }

  onSearchSubmit() {
    this.filter = this.searchForm.value.search?.toLowerCase() ?? '';
    this.getCustomers(this.currentPage, this.pageSize, { filter: this.filter });
  }

  changePage(page: number) {
    if (this.currentPage === page) return;

    this.layout.scrollToTop();

    this.currentPage = page;
    this.getCustomers(this.currentPage, this.pageSize, { filter: this.filter });
  }

  changePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.getCustomers(this.currentPage, this.pageSize, { filter: this.filter });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  private getCustomers(
    page: number,
    pageSize: number,
    opts?: {
      filter?: string;
      id?: string;
      taxId?: string;
      name?: string;
    },
  ) {
    this.customerService.get(page - 1, pageSize, opts).subscribe({
      next: (response) => {
        this.customers = response.content;
        this.filteredCustomers = response.content;
        this.totalItems = response.totalElements;
      },
    });
  }
}
