import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Book } from '../models/book';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { OrderItem } from '../models/order';
import { UserService } from '../user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  selectedSort: string = 'Default Sorting';
  categories = ['Fiction', 'Non-Fiction', 'Science & Technology', 'Self-Help', 'Mystery & Thriller'];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  books: Book[] = [];

  constructor(public cartService: CartService,
     public productService: ProductService, 
     private router: Router, 
     private orderService: OrderService,
    public userService :UserService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.productService.getProducts().subscribe(
      (data) => {
        console.log("Books received in Angular:", data);
        this.books = data;
      },
      (error) => {
        console.error("Error fetching books:", error);
      }
    );
  }

  navigateToBookDetails(bookId: number): void {
    this.router.navigate(['/book', bookId]);
  }

  addToCart(book: Book): void {
    const userId = Number(localStorage.getItem('userId')); // Get user ID from storage
    if (!userId) {
      alert('Please log in to add books to the cart.');
      return;
    }
  
    this.cartService.addToCart(1, book.id, 1).subscribe(
      () => alert(`${book.name} added to cart!`),
      error => console.error('Error adding book to cart:', error)
    );
  }
    
  
  getBooksByCategory(category: string): Book[] {
    return this.books
      .filter(book => book.category === category)
      .sort((a, b) => {
        switch (this.selectedSort) {
          case 'price low':
            return a.price - b.price;
          case 'price high':
            return b.price - a.price;
          case 'popularity':
            return b.popularity - a.popularity;
          default:
            return 0;
        }
      });
  }

  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedSort = select.value;
  }

  getStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = Array(5).fill(0);

    return stars.map((_, index) => {
      if (index < fullStars) return 2;
      if (index === fullStars && hasHalfStar) return 1;
      return 0;
    });
  }
  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role'); // Clear role
    this.router.navigate(['/login']);
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

  getProductImageUrl(imageUrl: string | undefined): string {
    if (!imageUrl) {
      return 'assets/default-image.jpg';
    } else if (imageUrl.startsWith('http')) {
      return imageUrl;
    } else {
      return `http://localhost:8080/products/images/${imageUrl}`;
    }
  }
  searchProducts() {
    if (this.searchQuery.trim() === '') {
      this.loadBooks(); 
    } else {
      this.productService.searchProducts(this.searchQuery).subscribe(data => {
        this.books = data;
      });
    }
  }
  
}