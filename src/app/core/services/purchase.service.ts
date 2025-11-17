import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Purchase } from '../models/Purchase.model';
import type { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PurchaseService {
  private readonly apiUrl: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.apiUrl}/purchases`);
  }
}
