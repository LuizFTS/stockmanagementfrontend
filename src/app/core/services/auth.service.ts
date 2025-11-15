import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import type { ResponseStatus } from '../models/ResponseStatus.model';

interface Payload {
  sub: string;
  email: string;
  exp: number;
  iat: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl: string = 'http://localhost:8080';
  private readonly tokenKey: string = 'auth_token';

  private responseStatus = new BehaviorSubject<ResponseStatus | null>(null);
  $responseStatus = this.responseStatus.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/api/login`, { email, password })
      .subscribe({
        next: (response) => {
          localStorage.setItem(this.tokenKey, response.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.responseStatus.next({
            status: 'error',
            message: err.error.message,
          });
        },
      });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload: Payload = JSON.parse(atob(token.split('.')[1]));

      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch {
      return false;
    }
  }
}
