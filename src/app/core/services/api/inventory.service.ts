import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { PageableResponse } from '../../models/response/PageableResponse.model';
import type { InventoryMovement } from '../../models/InventoryMovement.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly apiUrl: string = 'http://localhost:8080/api/inventory';

  constructor(private http: HttpClient) {}

  get(productId: string, startPeriod: string, endPeriod: string): Observable<InventoryMovement[]> {
    return this.http.get<InventoryMovement[]>(this.apiUrl, {
      params: {
        productId,
        startPeriod,
        endPeriod,
      },
    });
  }
}
