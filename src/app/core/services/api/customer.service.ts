import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { PageableResponse } from '../../models/response/PageableResponse.model';
import type { Customer } from '../../models/Customer.model';
import type { AddCustomerRequest } from '../../models/request/AddCustomerRequest.model';
import type { UpdateCustomerRequest } from '../../models/request/UpdateCustomerRequest.model';
import type { CreatedResponse } from '../../models/response/CreatedResponse.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly apiUrl: string = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  get(
    page: number,
    pageSize: number,
    opts?: {
      filter?: string;
      id?: string;
      taxId?: string;
      name?: string;
    },
  ): Observable<PageableResponse<Customer[]>> {
    const filterQuery = opts?.filter ? `filter=${opts?.filter}` : null;
    const idQuery = opts?.id ? `id=${opts?.id}` : null;
    const taxIdQuery = opts?.taxId ? `taxId=${opts?.taxId}` : null;
    const nameQuery = opts?.name ? `name=${opts?.name}` : null;
    const pageQuery = `page=${page}`;
    const pageSizeQuery = `size=${pageSize}`;

    const query = [filterQuery, idQuery, taxIdQuery, nameQuery, pageQuery, pageSizeQuery]
      .filter((q) => q !== null)
      .join('&');

    return this.http.get<PageableResponse<Customer[]>>(`${this.apiUrl}?${query}&sort=name,asc`);
  }

  create(customerData: AddCustomerRequest): Observable<CreatedResponse<Customer>> {
    return this.http.post<CreatedResponse<Customer>>(`${this.apiUrl}`, customerData);
  }

  update({ id, email, phone }: UpdateCustomerRequest): Observable<PageableResponse<Customer>> {
    return this.http.put<PageableResponse<Customer>>(`${this.apiUrl}/${id}`, { phone, email });
  }

  deactivate({ id, taxId }: { id?: string; taxId?: string }): Observable<void> {
    const idQuery = id ? `id=${id}` : null;
    const taxIdQuery = taxId ? `taxId=${taxId}` : null;

    const query = [idQuery, taxIdQuery].filter((q) => q !== null).join('&');

    return this.http.delete<void>(`${this.apiUrl}?${query}`);
  }

  autocomplete(query: string) {
    return this.http.get<String[]>(`${this.apiUrl}/autocomplete`, {
      params: { q: query, limit: 10 },
    });
  }
}
