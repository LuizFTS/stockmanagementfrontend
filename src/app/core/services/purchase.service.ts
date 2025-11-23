import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Purchase } from '../models/Purchase.model';
import type { Observable } from 'rxjs';
import type { PageableResponse } from '../models/response/PageableResponse.model';

@Injectable({ providedIn: 'root' })
export class PurchaseService {
  private readonly apiUrl: string = 'http://localhost:8080/api/purchases';

  constructor(private http: HttpClient) {}

  get(
    page: number,
    pageSize: number,
    opts?: {
      filter?: string;
      id?: string;
    },
  ): Observable<PageableResponse<Purchase[]>> {
    const filterQuery = opts?.filter ? `filter=${opts?.filter}` : null;
    const idQuery = opts?.id ? `id=${opts?.id}` : null;
    const pageQuery = `page=${page}`;
    const pageSizeQuery = `size=${pageSize}`;

    const query = [filterQuery, idQuery, pageQuery, pageSizeQuery]
      .filter((q) => q !== null)
      .join('&');

    return this.http.get<PageableResponse<Purchase[]>>(
      `${this.apiUrl}?${query}&sort=createdAt,desc`,
    );
  }
}
