import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { PageableResponse } from '../models/PageableResponse.model';
import type { Customer } from '../models/Customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly apiUrl: string = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  get(
    filter: string = '',
    page: number,
    pageSize: number,
  ): Observable<PageableResponse<Customer[]>> {
    return this.http.get<PageableResponse<Customer[]>>(
      `${this.apiUrl}?filter=${filter}&page=${page}&size=${pageSize}&sort=name,asc`,
    );
  }
}
