import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { PageableResponse } from '../../models/response/PageableResponse.model';
import type { Supplier } from '../../models/Supplier.model';
import type { AddSupplierRequest } from '../../models/request/AddSupplierRequest.model';
import type { CreatedResponse } from '../../models/response/CreatedResponse.model';
import type { UpdateSupplierRequest } from '../../models/request/UpdateSupplierRequest.model';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private readonly apiUrl: string = 'http://localhost:8080/api/suppliers';

  constructor(private http: HttpClient) {}

  get(
    page: number,
    pageSize: number,
    isActive: boolean,
    opts?: {
      filter?: string;
      id?: string;
      taxId?: string;
      name?: string;
    },
  ): Observable<PageableResponse<Supplier[]>> {
    const filterQuery = opts?.filter ? `filter=${opts?.filter}` : null;
    const idQuery = opts?.id ? `id=${opts?.id}` : null;
    const taxIdQuery = opts?.taxId ? `taxId=${opts?.taxId}` : null;
    const nameQuery = opts?.name ? `name=${opts?.name}` : null;

    const query = [filterQuery, idQuery, taxIdQuery, nameQuery].filter((q) => q !== null).join('&');

    return this.http.get<PageableResponse<Supplier[]>>(`${this.apiUrl}?${query}`, {
      params: {
        isActive,
        page,
        size: pageSize,
        sort: 'name,asc',
      },
    });
  }

  create(supplierData: AddSupplierRequest): Observable<CreatedResponse<Supplier>> {
    return this.http.post<CreatedResponse<Supplier>>(`${this.apiUrl}`, supplierData);
  }

  update({ id, email, phone }: UpdateSupplierRequest): Observable<PageableResponse<Supplier>> {
    return this.http.put<PageableResponse<Supplier>>(`${this.apiUrl}/${id}`, { phone, email });
  }

  deactivate({ id, taxId }: { id?: string; taxId?: string }): Observable<void> {
    const idQuery = id ? `id=${id}` : null;
    const taxIdQuery = taxId ? `taxId=${taxId}` : null;

    const query = [idQuery, taxIdQuery].filter((q) => q !== null).join('&');

    return this.http.delete<void>(`${this.apiUrl}?${query}`);
  }

  reactivate(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/reactivate/${id}`, {});
  }

  autocomplete(query: string, isActive: boolean) {
    return this.http.get<String[]>(`${this.apiUrl}/autocomplete`, {
      params: { q: query, limit: 10, isActive },
    });
  }
}
