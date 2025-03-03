import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.userService.getRole(); 

    console.log("AuthGuard Check - Role:", role);

    
    if (!role) {
      if (state.url !== '/login') { 
        this.router.navigate(['/login']);
      }
      return false;
    }
    return true;
  }
}
