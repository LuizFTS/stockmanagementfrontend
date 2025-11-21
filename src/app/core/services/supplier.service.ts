import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { PageableResponse } from '../models/PageableResponse.model';
import type { Supplier } from '../models/Supplier.model';
import type { AddSupplierRequest } from '../models/request/AddSupplierRequest.model';
import type { CreatedResponse } from '../models/CreatedResponse.model';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private readonly apiUrl: string = 'http://localhost:8080/api/suppliers';

  constructor(private http: HttpClient) {}

  /**
   *
   * @param page
   * @param pageSize
   * @param filter
   * @param id
   * @param taxId
   * @param name
   * @returns
   */
  get(
    page: number,
    pageSize: number,
    filter?: string,
    id?: string,
    taxId?: string,
    name?: string,
  ): Observable<PageableResponse<Supplier[]>> {
    const filterQuery = filter ? `filter=${filter}` : null;
    const idQuery = id ? `id=${id}` : null;
    const taxIdQuery = taxId ? `taxId=${taxId}` : null;
    const nameQuery = name ? `name=${name}` : null;
    const pageQuery = `page=${page}`;
    const pageSizeQuery = `size=${pageSize}`;

    const query = [filterQuery, idQuery, taxIdQuery, nameQuery, pageQuery, pageSizeQuery]
      .filter((q) => q !== null)
      .join('&');

    return this.http.get<PageableResponse<Supplier[]>>(`${this.apiUrl}?${query}&sort=name,asc`);
  }

  create(supplierData: AddSupplierRequest): Observable<CreatedResponse<Supplier>> {
    return this.http.post<CreatedResponse<Supplier>>(`${this.apiUrl}`, supplierData);
  }
}
