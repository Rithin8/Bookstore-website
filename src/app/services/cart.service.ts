import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8080/cart';
  

  constructor(private http: HttpClient) {}

  getCartItems(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${userId}`);
  }

  updateCartItem(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${cartItemId}`, { quantity });
  }

  addToCart(userId: number, bookId: number, quantity: number): Observable<{ message: string }> {
    const url = `${this.apiUrl}/add?userId=${userId}&bookId=${bookId}&quantity=${quantity}`;
    return this.http.post<{ message: string }>(url, {});
  }

  removeFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${cartItemId}`);
  }

  clearCart(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear/${userId}`);
  }
}