import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // This ensures that the service is available globally
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';  // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  // Function to check user credentials against DB
  checkUserCredentials(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/check-credentials`, { username, password });
  }

  // Save user info to cookies (consider using a token instead of password)
  saveUserToCookies(username: string, token: string): void {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1); // Cookie expires in 1 year
    document.cookie = `username=${username}; expires=${expires.toUTCString()}; path=/`;
    document.cookie = `authToken=${token}; expires=${expires.toUTCString()}; path=/`;
  }

  // Get user info from cookies (including token)
  getUserFromCookies(): { username: string, authToken: string } | null {
    const cookies = document.cookie.split(';');
    let username = '';
    let authToken = '';
    cookies.forEach(cookie => {
      const [key, value] = cookie.trim().split('=');
      if (key === 'username') {
        username = value;
      }
      if (key === 'authToken') {
        authToken = value;
      }
    });
    return username && authToken ? { username, authToken } : null;
  }

  // Remove user info from cookies
  clearUserCookies(): void {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  }
}
