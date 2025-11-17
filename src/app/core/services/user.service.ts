import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { User } from '../models/User.model';
import { BehaviorSubject, map, tap, type Observable } from 'rxjs';
import type { ResponseStatus } from '../models/ResponseStatus.model';
import type { UpdateUser } from '../models/UpdateUserRequest.model';
import type { RegisterUserRequest } from '../models/RegisterUserRequest.model';
import { capitalize } from '../../shared/utils/capitalize';

interface UserCreated {
  message: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly apiUrl: string = 'http://localhost:8080';
  private userSubject = new BehaviorSubject<User | null>(null);
  $user = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadUser(): void {
    this.http.get<User>(`${this.apiUrl}/api/user`).subscribe({
      next: (response) => {
        let user: User = response;
        user.firstName = capitalize(user.firstName.toLowerCase());
        user.lastName = capitalize(user.lastName.toLowerCase());
        user.email = user.email.toLowerCase();

        this.userSubject.next(user);
      },
    });
  }

  registerUser(data: RegisterUserRequest): Observable<UserCreated> {
    return this.http.post<UserCreated>(`${this.apiUrl}/api/register`, data);
  }

  changeUserPassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/api/user/reset-password`, {
      currentPassword,
      newPassword,
    });
  }

  changeUserInformation(updateData: UpdateUser): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/api/user/update-data`, updateData);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  getUserFullName(): Observable<string> {
    return this.$user.pipe(map((user) => `${user?.firstName} ${user?.lastName}`));
  }
}
