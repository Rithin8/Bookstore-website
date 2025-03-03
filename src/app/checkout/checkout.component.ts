import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order, OrderItem } from '../models/order';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  shippingAddress: string = '';
  paymentMethod: string = 'cash';
  orderItems: OrderItem[] = [];
  totalAmount: number = 0;

  constructor(
    public router: Router,
    private orderService: OrderService,
    public productService: ProductService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    
    const state = window.history.state;
  
    if (state && state.items && state.items.length > 0) {
      this.orderItems = state.items;
      this.calculateTotal();
    } else {
      setTimeout(() => {
        alert('Your cart is empty. Redirecting to cart...');
        this.router.navigate(['/cart']);
      }, 500); 
    }
  }

  calculateTotal(): void {
    this.totalAmount = this.orderItems.reduce(
      (sum, item) => sum + (item.unitPrice * item.quantity), 0
    );
  }

  generateOrderId(): string {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  placeOrder(): void {
    if (!this.shippingAddress) {
      alert('Please enter a shipping address.');
      return;
    }

    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      alert('Please log in to complete your purchase.');
      this.router.navigate(['/login']);
      return;
    }

    const order: Order = {
      orderId: this.generateOrderId(),
      userId: userId,
      orderDate: new Date().toISOString(),
      items: this.orderItems,
      shippingAddress: this.shippingAddress,
      totalAmount: this.totalAmount
    };

    this.orderService.placeOrder(order).subscribe(
      (response) => {
        alert('Order placed successfully!');
        this.router.navigate(['/order-confirm'], {
          queryParams: { orderId: response.orderId }
        });
      },
      (error) => {
        alert(`Failed to place order. ${error.message || 'Please try again.'}`);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}