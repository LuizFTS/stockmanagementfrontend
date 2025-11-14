import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { User } from '../models/User.model';
import { BehaviorSubject, tap } from 'rxjs';
import type { ChangePassword } from '../models/ChangePassword.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl: string = 'http://localhost:8080';
  private userSubject = new BehaviorSubject<User | null>(null);
  $user = this.userSubject.asObservable();

  private changePasswordStatus = new BehaviorSubject<ChangePassword | null>(null);
  $passwordStatus = this.changePasswordStatus.asObservable();

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

  changePassword(currentPassword: string, newPassword: string) {
    return this.http
      .put<void>(`${this.apiUrl}/api/user/reset-password`, { currentPassword, newPassword })
      .subscribe({
        next: () => {
          const response = {
            status: 'success',
            message: 'Senha alterada com sucesso!',
          };
          this.changePasswordStatus.next(response);
        },
        error: (err) => {
          const response = {
            status: 'error',
            message: err.error.message,
          };
          this.changePasswordStatus.next(response);
        },
      });
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
