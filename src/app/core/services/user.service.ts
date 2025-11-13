import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { User } from '../models/User.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl: string = 'http://localhost:8080';
  private userSubject = new BehaviorSubject<User | null>(null);
  $user = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadUser(): void {
    this.http.get<User>(`${this.apiUrl}/api/user`).subscribe({
      next: (response) => {
        this.userSubject.next(response);
      },
      error: (err) => {
        console.error('Erro ao carregar usuário');
      },
    });
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
