import { Component } from '@angular/core';
import { Card } from '../../../shared/components/card/card';
import type { Product } from '../../../core/models/Product.model';
import { ProductService } from '../../../core/services/api/product.service';
import { ProductItem } from './components/product-item/product-item';
import { ReactiveFormsModule, FormBuilder, type FormGroup } from '@angular/forms';
import { ItensNotFound } from '../../../shared/components/itens-not-found/itens-not-found';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { Button } from '../../../shared/components/button/button';
import { Router } from '@angular/router';
import { HomeLayout } from '../../../layouts/home-layout/home-layout';

@Component({
  selector: 'app-products-page',
  imports: [Card, ProductItem, ReactiveFormsModule, ItensNotFound, SearchInput, Pagination, Button],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
})
export class ProductsPage {
  searchForm: FormGroup;

  products: Product[] = [];
  filteredProducts: Product[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 1;
  filter: string = '';

  constructor(
    public productService: ProductService,
    private layout: HomeLayout,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.getProducts(this.currentPage, this.pageSize, { filter: this.filter });
  }

  onSearch(term: string) {
    this.filter = term?.toLowerCase() ?? '';
    this.getProducts(this.currentPage, this.pageSize, { filter: this.filter });
  }

  onSearchSubmit() {
    this.filter = this.searchForm.value.search?.toLowerCase() ?? '';
    this.getProducts(this.currentPage, this.pageSize, { filter: this.filter });
  }

  changePage(page: number) {
    if (this.currentPage === page) return;

    this.layout.scrollToTop();

    this.currentPage = page;
    this.getProducts(page, this.pageSize, { filter: this.filter });
  }

  changePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.getProducts(this.currentPage, this.pageSize, { filter: this.filter });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  private getProducts(
    page: number,
    pageSize: number,
    opts?: {
      filter?: string;
      id?: string;
      name?: string;
    },
  ) {
    this.productService.get(page - 1, pageSize, opts).subscribe({
      next: (response) => {
        this.products = response.content;
        this.filteredProducts = response.content;
        this.totalItems = response.totalElements;
      },
    });
  }
}
