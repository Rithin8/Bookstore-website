import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent  {



  constructor(public userService: UserService, private router: Router) {}
  
  
    logout() {
      localStorage.removeItem('userId');
      localStorage.removeItem('role'); 
      this.router.navigate(['/login']);
    }
    
  
  toggleMenu() {
    const menuItems = document.getElementById('MenuItems');
    if (menuItems) {
      menuItems.style.maxHeight = menuItems.style.maxHeight === '200px' ? '0px' : '200px';
    }
  }
  categories = [
    { image: 'assets/category-1.jpg' },
    { image: 'assets/category-2.jpg' },
    { image: 'assets/category-3.jpg' },
  ];

  featuredProducts = [
    { image: 'assets/images/be.jpg', title: 'Becoming', author: 'By Michelle Obama', price: 700 },
    { image: 'assets/images/cosmos.jpg', title: 'Cosmos', author: 'Carl Sagan', price: 550 },
    { image: 'assets/images/eins.jpg', title: 'Einstein: His Life and Universe', author: 'By Walter Isaacson', price: 450 },
  ];

  latestProducts = [
    { image: 'assets/images/How.jpg', title: 'How to Die Famous', author: 'By Benjamin Deam', price: 450 },
    { image: 'assets/images/silent.jpg', title: 'The Silent Patient', author: 'By Michaelides', price: 550 },
    { image: 'assets/images/PP.jpg', title: 'Pride and Prejudice', author: 'By Jane Austen', price: 350 },
  ];

  brands = [
    { logo: 'assets/logo-pink&blue.png' },
    { logo: 'assets/logo-owl Book.png' },
  ];

}

