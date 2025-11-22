import { Component, inject } from '@angular/core';
import { Card } from '../../../shared/components/card/card';
import { CustomerItem } from './components/customer-item/customer-item';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { ItensNotFound } from '../../../shared/components/itens-not-found/itens-not-found';
import { Button } from '../../../shared/components/button/button';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import type { Customer } from '../../../core/models/Customer.model';
import { CustomerService } from '../../../core/services/customer.service';

@Component({
  selector: 'app-customers-page',
  imports: [Card, CustomerItem, SearchInput, Pagination, ItensNotFound, Button],
  templateUrl: './customers-page.html',
  styleUrl: './customers-page.scss',
})
export class CustomersPage {
  private router = inject(Router);
  searchControl = new FormControl('');

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 1;
  filter: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.getCustomers(this.currentPage, this.pageSize, { filter: this.filter });
  }

  onSearch(term: string) {
    this.filter = term?.toLowerCase() ?? '';
    this.getCustomers(this.currentPage, this.pageSize, { filter: this.filter });
  }

  changePage(page: number) {
    if (this.currentPage === page) return;
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
