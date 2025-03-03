import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

interface Order {
  orderId: string;
  book_name: string;
  status: string;
  delivery_date: string;
}

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  orderId: string = '';
  searchResult: Order | null = null;
  menuHeight: string = '0px';

  constructor(private orderService: OrderService,public userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  trackOrder(): void {
    this.orderService.trackOrder(this.orderId.trim()).subscribe(
      (data) => {
        this.searchResult = { ...data } as Order;

      },
      (error) => {
        console.error('Error tracking order', error);
        this.searchResult = null;
      }
    );
  }

  toggleMenu(): void {
    this.menuHeight = this.menuHeight === '0px' ? '200px' : '0px';
  }
  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role'); // Clear role
    this.router.navigate(['/login']);
  }
}