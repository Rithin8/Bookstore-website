
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('authToken'); 
    this.router.navigate(['/login']); // Redirect to login
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); 
  }
}
