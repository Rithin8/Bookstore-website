import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cartItem';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  userId: number | null = null;
  

  constructor(private cartService: CartService, private router: Router, public userService: UserService) {}
  

  ngOnInit(): void {
    
    this.userId = Number(localStorage.getItem('userId')); 
    if (!this.userId) {
      alert('Please log in to access the cart.');
      this.router.navigate(['/login']);
      return;
    }
    this.loadCart();
  }
  addToCart(book: Book): void {
    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      alert('Please log in to add books to the cart.');
      this.router.navigate(['/login']);
      return;
    }
  }

  loadCart() {
    if (this.userId === null) {
      console.error("User ID is null. Cannot load cart.");
      return; 
    }
  
    this.cartService.getCartItems(this.userId).subscribe(
      (cartItems) => {
        console.log("Cart items received:", cartItems);
        
        this.cartItems = cartItems.map(item => ({
          ...item,
          book: item.book || item.book 
        }));
  
        this.cartItems.forEach(item => {
          if (!item.book) {
            console.warn("Warning: item.book is missing for", item);
          }
        });
  
       
        this.calculateTotals();
      },
      (error) => {
        console.error("Error loading cart:", error);
      }
    );
  }
  
  
  
  updateQuantity(item: CartItem): void {
    if (!item.id) {
      console.error('Cart item ID is missing');
      return;
    }
  
    if (item.quantity < 1) {
      this.removeFromCart(item);

      return;
    }
  
    this.cartService.updateCartItem(item.id, item.quantity).subscribe(() => {
      this.calculateTotals();
    });
  }
  validateQuantity(event: KeyboardEvent) {
    if (event.key === '-' || event.key === 'e') {
      event.preventDefault();
    }
  }
  
  

  calculateTotals(): void {
    if (!this.cartItems || this.cartItems.length === 0) {
      this.subtotal = 0;
      this.tax = 0;
      this.total = 0;
      return;
    }
  
    this.subtotal = this.cartItems.reduce((sum, item) => 
      sum + ((item.book?.price || 0) * item.quantity), 0
    );
  
    this.tax = this.subtotal * 0.05; 
    this.total = this.subtotal + this.tax;
  
    console.log("Subtotal:", this.subtotal);
    console.log("Total:", this.total);
  }
  
  removeFromCart(item: CartItem): void {
    if (!item.id) {
      console.error('Error: Cart item ID is undefined.');
      return;
    }
  
    this.cartService.removeFromCart(item.id).subscribe(() => {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
      this.calculateTotals();
      alert(`${item.book.name} has been removed from the cart.`);
    }, error => {
      console.error('Error removing item from cart:', error);
    });
  }
  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('role'); // Clear role
    this.router.navigate(['/login']);
  }
  
  
    clearCart(): void {
    this.cartService.clearCart(this.userId!).subscribe(() => {
      this.cartItems = [];
      this.calculateTotals();
    });
  }
  checkout(): void {
    if (!this.userId) {
      alert('Please log in to proceed with checkout.');
      this.router.navigate(['/login']);
      return;
    }
  
    if (this.cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }
  
    const orderItems = this.cartItems.map(item => ({
      product: {
        id: item.book.id,
        name: item.book.name
      },
      quantity: item.quantity,
      unitPrice: item.book.price || 0,
      subtotal: (item.book.price || 0) * item.quantity
    }));
  
    console.log("Passing order items to checkout:", orderItems); 
  
    this.router.navigate(['/checkout'], {
      state: { items: orderItems }
    });
  }
  
}