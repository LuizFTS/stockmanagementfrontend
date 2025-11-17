import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Sale } from '../models/Sale.model';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private readonly apiUrl: String = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/sales`);
  }
}
