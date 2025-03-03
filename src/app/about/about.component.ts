import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(public userService: UserService, private router: Router) {}
  menutoggle() {
    
    let menuItems = document.getElementById("MenuItems");
    if (menuItems) {
      if (menuItems.style.maxHeight === "0px") {
        menuItems.style.maxHeight = "200px";
      } else {
        menuItems.style.maxHeight = "0px";
      }
    }
  }
  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role'); // Clear role
    this.router.navigate(['/login']);
  }
  
}
