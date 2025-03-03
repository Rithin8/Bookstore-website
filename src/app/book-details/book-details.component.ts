import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Book } from '../models/book';
import { UserService } from '../user.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute, 
    private bookService: BookService, 
    private cartService: CartService,
  public productService: ProductService, private router: Router, 
  private orderService: OrderService,public userService: UserService) {}



  ngOnInit() {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(bookId) && bookId > 0) {  // Ensure valid bookId
      this.bookService.getBookById(bookId).subscribe({
        next: (data) => {
          this.book = data;
        },
        error: (error) => {
          this.errorMessage = 'Book details could not be loaded.';
          console.error('Error fetching book:', error);
        }
      });
    } else {
      this.errorMessage = 'Invalid book ID.';
    }
  }

  buyNow(book: Book): void {
    const userId = Number(localStorage.getItem('userId')); 
    
    if (!userId) {
      alert('Please log in to buy books.');
      this.router.navigate(['/login']);
      return;
    }

    // Create order item
    const orderItem = {
      product: { id: book.id, name: book.name },
      quantity: 1,
      unitPrice: book.price,
      subtotal: book.price
    };

    // Navigate to checkout with the item
    this.router.navigate(['/checkout'], {
      state: { items: [orderItem] }
    });
  }

  addToCart(): void {
    const userId = Number(localStorage.getItem('userId'));
  
    if (!userId) {
      alert('Please log in to add books to the cart.');
      this.router.navigate(['/login']);
      return;
    }
  
    if (this.book) { 
      this.cartService.addToCart(userId, this.book.id, 1).subscribe(() => {
        alert(`${this.book?.name} has been added to the cart!`);
      }, error => {
        console.error('Error adding book to cart:', error);
      });
    }
  }
  
  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role'); // Clear role
    this.router.navigate(['/login']);
  }
}