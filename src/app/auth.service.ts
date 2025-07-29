import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginResponse, RegisterResponse, User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7118/api/school';
  private token = signal<string | null>(null);

  constructor(private http: HttpClient) {
    this.token.set(this.getToken());
  }

  /**
   * User Registration
   * @param user - User object containing name, email, and password
   * @returns Observable<RegisterResponse>
   */
  register(user: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, user, {
      withCredentials: true,  // ✅ Ensure cookies and credentials are sent
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(error => {
        console.error('Registration failed:', error);
        return throwError(() => new Error('Registration failed'));
      })
    );
  }

  /**
   * User Login
   * @param email - User email
   * @param PasswordHash - User password
   * @returns Observable<LoginResponse>
   */
  login(email: string, PasswordHash: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, PasswordHash }, {
      withCredentials: true,  // ✅ Handles credentials for CORS requests
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }
  // getRoles(): Observable<{ role: string }[]> {
  //   return this.http.get<{ role: string }[]>(`${this.apiUrl}/roles`);
  // }
  getRoles(): Observable<{ role: { role: string } }[]> {
    return this.http.get<{ role: { role: string } }[]>(`${this.apiUrl}/roles`);
  }




  /**
   * Set authentication token
   * @param token - Authentication token
   */
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token.set(token);
  }

  /**
   * Get authentication token
   * @returns Token or null if not set
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Clear authentication data
   */
  logout(): void {
    localStorage.removeItem('token');
    this.token.set(null);
  }

  /**
   * Check if user is logged in
   * @returns Boolean indicating login status
   */
  isLoggedIn(): boolean {
    return !!this.token();
  }
}
