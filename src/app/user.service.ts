import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user';  
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient,private router: Router) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }
  logout() {
    localStorage.removeItem('userRole'); 
  }
  

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  getRole(): string | null {
    return localStorage.getItem('role'); 
  }

  setRole(role: string) {
    localStorage.setItem('role', role); 
  }

  clearRole() {
    localStorage.removeItem('role'); // Clear role on logout
  }

  addUser(user: User): Observable<any> {  
    return this.http.post(`${this.apiUrl}/add`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${userId}`);
  }
}
