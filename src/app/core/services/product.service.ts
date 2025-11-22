import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Product } from '../models/Product.model';
import { HttpClient } from '@angular/common/http';
import type { PageableResponse } from '../models/PageableResponse.model';
import type { AddProductRequest } from '../models/request/AddProductRequest.model';
import type { CreatedResponse } from '../models/CreatedResponse.model';
import type { UpdateProductRequest } from '../models/request/UpdateProductRequest.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiUrl: string = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  get(
    page: number,
    pageSize: number,
    opts?: {
      filter?: string;
      id?: string;
      name?: string;
    },
  ): Observable<PageableResponse<Product[]>> {
    const filterQuery = opts?.filter ? `filter=${opts?.filter}` : null;
    const idQuery = opts?.id ? `id=${opts?.id}` : null;
    const nameQuery = opts?.name ? `name=${opts?.name}` : null;
    const pageQuery = `page=${page}`;
    const pageSizeQuery = `size=${pageSize}`;

    const query = [filterQuery, idQuery, nameQuery, pageQuery, pageSizeQuery]
      .filter((q) => q !== null)
      .join('&');

    return this.http.get<PageableResponse<Product[]>>(`${this.apiUrl}?${query}&sort=name,asc`);
  }

  create(productData: AddProductRequest): Observable<CreatedResponse<Product>> {
    return this.http.post<CreatedResponse<Product>>(`${this.apiUrl}`, productData);
  }

  update({
    id,
    name,
    description,
    costPrice,
    salePrice,
  }: UpdateProductRequest): Observable<PageableResponse<Product>> {
    return this.http.put<PageableResponse<Product>>(`${this.apiUrl}/${id}`, {
      name,
      description,
      costPrice,
      salePrice,
    });
  }

  deactivate({ id }: { id?: string }): Observable<void> {
    const idQuery = id ? `id=${id}` : null;

    const query = [idQuery].filter((q) => q !== null).join('&');

    return this.http.delete<void>(`${this.apiUrl}?${query}`);
  }
}
