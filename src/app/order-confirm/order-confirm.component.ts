import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {
  orderId: string = '';
  order: Order | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      if (this.orderId) {
        this.loadOrderDetails();
      }
    });
  }

  loadOrderDetails() {
    console.log("Fetching order details...");
  
    this.orderService.trackOrder(this.orderId).subscribe(
      (data) => {
        console.log("Order data received:", data);
  
        if (!data) {
          console.error("No order data received!");
          this.loading = false;
          return;
        }
  
        this.order = data;
        this.loading = false;
        console.log("Loading state set to false ");
      },
      (error) => {
        console.error("Error fetching order:", error);
        this.loading = false;
      }
    );
  }
  

  getTotalPrice(): number {
    return this.order?.items?.reduce(
      (total, item) => total + (item.unitPrice * item.quantity), 0
    ) || 0;
  }
  goBack() {
    this.router.navigate(['/home']); // Navigate to home
  }
}