import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Sale } from '../models/Sale.model';
import type { PageableResponse } from '../models/PageableResponse.model';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private readonly apiUrl: String = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getSales(): Observable<PageableResponse<Sale[]>> {
    return this.http.get<PageableResponse<Sale[]>>(`${this.apiUrl}/sales`);
  }
}
