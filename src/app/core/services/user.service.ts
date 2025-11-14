import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { User } from '../models/User.model';
import { BehaviorSubject, tap } from 'rxjs';
import type { ResponseStatus } from '../models/ResponseStatus.model';
import type { UpdateUser } from '../models/UpdateUserRequest.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl: string = 'http://localhost:8080';
  private userSubject = new BehaviorSubject<User | null>(null);
  $user = this.userSubject.asObservable();

  private responseStatus = new BehaviorSubject<ResponseStatus | null>(null);
  $responseStatus = this.responseStatus.asObservable();

  constructor(private http: HttpClient) {}

  loadUser(): void {
    this.http.get<User>(`${this.apiUrl}/api/user`).subscribe({
      next: (response) => {
        let user: User = response;
        user.firstName = this.capitalize(user.firstName.toLowerCase());
        user.lastName = this.capitalize(user.lastName.toLowerCase());
        user.email = user.email.toLowerCase();

        this.userSubject.next(user);
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
          this.responseStatus.next(response);
        },
        error: (err) => {
          const response = {
            status: 'error',
            message: err.error.message,
          };
          this.responseStatus.next(response);
        },
      });
  }

  changeInformation(updateData: UpdateUser) {
    const formattedData: UpdateUser = {
      firstName: this.capitalize(updateData.firstName.toLowerCase()),
      lastName: this.capitalize(updateData.lastName.toLowerCase()),
      email: updateData.email.toLowerCase(),
    };
    return this.http.put<void>(`${this.apiUrl}/api/user/update-data`, formattedData).subscribe({
      next: () => {
        const response = {
          status: 'success',
          message: 'Dados alterados com sucesso!',
        };
        this.responseStatus.next(response);
      },
      error: (err) => {
        const response = {
          status: 'error',
          message: err.error.message,
        };
        this.responseStatus.next(response);
      },
    });
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  private capitalize(text: string) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
