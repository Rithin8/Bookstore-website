import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addProducts(bookData: FormData): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, bookData);
  }

  updateProducts(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  deleteProducts(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  searchProducts(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search/${keyword}`);
  }
  getBookById(productId: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${productId}`); 
  }
  
  

}