import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { User } from '../models/User.model';
import { BehaviorSubject, map, type Observable } from 'rxjs';
import type { UpdateUser } from '../models/request/UpdateUserRequest.model';
import type { RegisterUserRequest } from '../models/request/RegisterUserRequest.model';
import type { PageableResponse } from '../models/response/PageableResponse.model';
import { Formatter } from '../../shared/utils/Formatter';

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
    this.http.get<PageableResponse<User[]>>(`${this.apiUrl}/api/user`).subscribe({
      next: (response) => {
        let user: User = response.content[0];
        user.firstName = Formatter.capitalize(user.firstName.toLowerCase());
        user.lastName = Formatter.capitalize(user.lastName.toLowerCase());
        user.email = user.email.toLowerCase();

        this.userSubject.next(user);
      },
    });
  }

  registerUser(data: RegisterUserRequest): Observable<UserCreated> {
    const firstName = data.firstName.toLowerCase();
    const lastName = data.lastName.toLowerCase();
    const email = data.email.toLowerCase();

    return this.http.post<UserCreated>(`${this.apiUrl}/api/register`, {
      firstName,
      lastName,
      email,
      password: data.password,
    });
  }

  changeUserPassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/api/user/reset-password`, {
      currentPassword,
      newPassword,
    });
  }

  changeUserInformation(updateData: UpdateUser): Observable<void> {
    const firstName = updateData.firstName.toLowerCase();
    const lastName = updateData.lastName.toLowerCase();
    const email = updateData.email.toLowerCase();

    return this.http.put<void>(`${this.apiUrl}/api/user/update-data`, {
      firstName,
      lastName,
      email,
    });
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  getUserFullName(): Observable<string> {
    return this.$user.pipe(map((user) => `${user?.firstName} ${user?.lastName}`));
  }
}
