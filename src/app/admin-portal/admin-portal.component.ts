import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../product.service';
import { Book } from '../models/book';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


interface User {
  id?: number;
  username: string;
  email: string;
  phone: string;
  password?: string; 
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'suspended';
}

interface Product {
  id: number;
  name: string;
  author: string;
  description: string;
  publication: string;
  price: number;
  category: string;
  imageUrl?: string;
  popularity: number;
  rating: number;
}

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {
  selectedImage: File | null = null;  
  githubImageUrl: string = '';        


  // Sidebar state
  isSidebarCollapsed: boolean = false;

  // Product properties
  bookTitle: string = '';
  author: string = '';
  description: string = '';
  publication: string = '';
  price: number = 0;
  genre: string = 'Fiction';
  popularity: number = 0;
  imageUrl:String='';
  rating:number=0;
  books: Book[] = [];;

  // Search term for product search
  productSearchTerm: string = ''; 

  // Search term for user search
  userSearchTerm: string = ''; // Added this property
   // Method to handle file selection
   onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }
  // Method to handle GitHub URL input 
  onImageUrlChange(event: any): void {
    this.githubImageUrl = event.target.value;
  }
  
 

  // User properties
  users: User[] = [];
 

  newUser: User = {
    username: '',
    email: '',
    phone: '',
    password: '',
    role: 'user',
    status: 'active'
  };

  isModalVisible = false;
  editingUser: User | null = null;
  viewMode: 'dashboard' | 'users' = 'dashboard'; 

  constructor(private http: HttpClient, private authService: AuthService, private productService: ProductService,private userService: UserService,public router: Router) {}
  
  

  // Method to toggle sidebar visibility
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  // Method to switch between views
  switchView(mode: 'dashboard' | 'users') {
    this.viewMode = mode;
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
  
  

  // Product management methods
  addProduct(form: NgForm) {
    if (form.valid) {
      const formData = new FormData();
      formData.append('title', this.bookTitle);
      formData.append('author', this.author);
      formData.append('description', this.description);
      formData.append('publication', this.publication);
      formData.append('price', this.price.toString());
      formData.append('genre', this.genre);
      formData.append('popularity', this.popularity.toString());
      formData.append('rating',this.rating.toString());
      
  
      const fileInput = document.getElementById('image') as HTMLInputElement;
      const file = fileInput?.files?.[0];
  
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      } else {
        formData.append('imageUrl', this.githubImageUrl); 
      }
  
      console.log('Form Data:', [...(formData as any).entries()]);

  
      this.http.post('http://localhost:8080/products', formData, {
        headers: new HttpHeaders(),
        observe: 'response'
      })
      .subscribe(
        (response: any) => {
          console.log('Product added:', response);
          this.books.push(response.body);
          form.reset();
          this.imageUrl = '';
        },
        error => {
          console.error('Error adding product:', error);
        }
      );
    }
  }
  ngOnInit() {
    this.loadBooks();
    this.loadUsers(); 
  }
  loadBooks() {
    this.productService.getProducts().subscribe(
      (data: Book[]) => {  
        this.books = data;
      },
      (error: any) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  
  
  removeProduct(productId: number, index: number) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.http.delete(`http://localhost:8080/products/${productId}`).subscribe(
        () => {
          this.books.splice(index, 1);
          console.log('Product deleted successfully');
        },
        error => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
  loadUsers() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        console.log("Users fetched successfully:", this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  
 
  

  // User management methods
  showAddUserModal() {
    this.editingUser = null;
    this.resetNewUser();
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.editingUser = null;
    this.resetNewUser();
  }

  resetNewUser() {
    this.newUser = {
      username: '',
      email: '',
      phone: '',
      password:'',
      role: 'user',
      status: 'active'
    };
  }


  addUser() {
    if (!this.newUser.username || !this.newUser.email || !this.newUser.phone || !this.newUser.password) {
      alert("Please fill in all required fields.");
      return;
    }
  
    this.userService.addUser(this.newUser).subscribe(
      () => {
        alert("User added successfully!");
        this.closeModal();  
        this.loadUsers();    
      },
      (error) => {
        alert("Error adding user. Please try again.");
        console.error("Error adding user:", error);
      }
    );
  }
  
  
  
  

  editUser(user: User) {
    this.editingUser = user;
    this.newUser = { ...user };
    this.isModalVisible = true;
  }
  deleteUser(userId: number) {
    if (!userId) {
      alert("Invalid user ID!");
      return;
    }
  
    this.userService.deleteUser(userId).subscribe(
      () => {
        alert("User deleted successfully!");
        this.loadUsers(); 
      },
      (error) => {
        alert("Error deleting user. Please try again.");
        console.error("Error deleting user:", error);
      }
    );
  }
  
  
  
}