import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Product } from '../models/Product.model';
import { HttpClient } from '@angular/common/http';
import type { ProductPageable } from '../models/ProductPageable.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiUrl: string = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getProductsByPage(
    filter: string = '',
    page: number,
    pageSize: number,
  ): Observable<ProductPageable> {
    return this.http.get<ProductPageable>(
      `${this.apiUrl}?filter=${filter}&page=${page}&size=${pageSize}&sort=name,asc`,
    );
  }
}
