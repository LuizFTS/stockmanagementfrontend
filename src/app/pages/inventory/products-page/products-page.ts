import { Component, inject } from '@angular/core';
import { Card } from '../../../shared/components/card/card';
import type { Product } from '../../../core/models/Product.model';
import { ProductService } from '../../../core/services/product.service';
import { ProductItem } from './components/product-item/product-item';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ItensNotFound } from '../../../shared/components/itens-not-found/itens-not-found';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { Button } from '../../../shared/components/button/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-page',
  imports: [Card, ProductItem, ReactiveFormsModule, ItensNotFound, SearchInput, Pagination, Button],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
})
export class ProductsPage {
  private router = inject(Router);
  searchControl = new FormControl('');

  products: Product[] = [];
  filteredProducts: Product[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 1;
  filter: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProductsByPage(this.filter, this.currentPage, this.pageSize);
  }

  onSearch(term: string) {
    this.filter = term?.toLowerCase() ?? '';
    this.getProductsByPage(this.filter, this.currentPage, this.pageSize);
  }

  changePage(page: number) {
    if (this.currentPage === page) return;
    this.currentPage = page;
    this.getProductsByPage(this.filter, page, this.pageSize);
  }

  changePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.getProductsByPage(this.filter, this.currentPage, this.pageSize);
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  private getProductsByPage(filter: string, page: number, pageSize: number) {
    this.productService.getProductsByPage(filter, page - 1, pageSize).subscribe({
      next: (response) => {
        this.products = response.content;
        this.filteredProducts = response.content;
        this.totalItems = response.totalElements;
      },
    });
  }
}
