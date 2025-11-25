import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Sale } from '../../models/Sale.model';
import type { PageableResponse } from '../../models/response/PageableResponse.model';
import type { CreatedResponse } from '../../models/response/CreatedResponse.model';
import type { AddSaleRequest } from '../../models/request/AddSaleRequest.model';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private readonly apiUrl: string = 'http://localhost:8080/api/sales';

  constructor(private http: HttpClient) {}

  create(request: AddSaleRequest): Observable<CreatedResponse<Sale[]>> {
    return this.http.post<CreatedResponse<Sale[]>>(this.apiUrl, request);
  }

  get(
    page: number,
    pageSize: number,
    opts?: {
      filter?: string;
      id?: string;
    },
  ): Observable<PageableResponse<Sale[]>> {
    const filterQuery = opts?.filter ? `filter=${opts?.filter}` : null;
    const idQuery = opts?.id ? `id=${opts?.id}` : null;
    const pageQuery = `page=${page}`;
    const pageSizeQuery = `size=${pageSize}`;

    const query = [filterQuery, idQuery, pageQuery, pageSizeQuery]
      .filter((q) => q !== null)
      .join('&');

    return this.http.get<PageableResponse<Sale[]>>(`${this.apiUrl}?${query}&sort=createdAt,desc`);
  }
}
