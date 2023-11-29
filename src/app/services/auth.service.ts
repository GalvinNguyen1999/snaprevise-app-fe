import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8017/v1/auth';
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private userSubject  = new BehaviorSubject<User | null>(null);

  isLoggedIn$ = this.isLoggedIn.asObservable();
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
  
    if (storedUser && storedToken && !this.isLoggedIn.getValue()) {
      const user: User = JSON.parse(storedUser);
      this.userSubject.next(user);
      this.isLoggedIn.next(true);
    }
  }

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/sign-up`, userDetails);
  }

  loginUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/sign-in`, userDetails)
      .pipe(
        tap((response: any) => {
          if (response) {
            this.setIsLoggedIn(true);
            this.setUser(response.user);
            this.setAuthCookie(response.token);
  
            if (response.user.role === 'admin') {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate(['home']);
            }
          }
        })
      );
  }

  private setAuthCookie(token: string): void {
    document.cookie = `access_token=${token};path=/;max-age=3600;SameSite=Strict;HttpOnly;Secure`;
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn);
  }

  setUser(user: User) {
    this.userSubject.next(user);
  }
}
