import { Component, ViewChild, type ElementRef } from '@angular/core';
import { Card } from '../../../shared/components/card/card';
import type { Product } from '../../../core/models/Product.model';
import { ProductService } from '../../../core/services/product.service';
import { ProductItem } from './components/product-item/product-item';
import { MatIcon } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ItensNotFound } from '../../../shared/components/itens-not-found/itens-not-found';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-products-page',
  imports: [Card, ProductItem, ReactiveFormsModule, ItensNotFound, SearchInput, Pagination],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
})
export class ProductsPage {
  searchControl = new FormControl('');

  products: Product[] = [];
  filteredProducts: Product[] = [];

  currentPage: number = 1;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.filteredProducts = response;
      },
    });
  }

  onSearch(term: string) {
    const value = term?.toLowerCase() ?? '';

    this.filteredProducts = this.products.filter((p) => {
      return p.name.toLowerCase().includes(value) || p.description.toLowerCase().includes(value);
    });
  }

  changePage(page: number) {
    if (this.currentPage === page) return;
    console.log(page);
    this.currentPage = page;
  }
}
