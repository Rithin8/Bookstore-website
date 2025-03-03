import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  // Tabs
  selectedTab: string = 'orders';

  // Orders Data
  orders: Order[] = [];

  constructor(private orderService: OrderService,public userService: UserService, private router: Router) {}
  

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      console.error('User not logged in');
      return;
    }

    this.orderService.getUserOrders(userId).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  // Profile Data
  profile = {
    name: '',
    email: '',
    phone: '',
  };

  // Address Data
  address = {
    street: '',
    city: '',
    state: '',
    zip: '',
  };

  // Tab Selection Function
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  // Save Profile Function
  saveProfile() {
    alert('Profile saved successfully!');
    console.log('Profile Data:', this.profile);
  }

  // Save Address Function
  saveAddress() {
    alert('Address saved successfully!');
    console.log('Address Data:', this.address);
  }
  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role'); // Clear role
    this.router.navigate(['/login']);
  }
}