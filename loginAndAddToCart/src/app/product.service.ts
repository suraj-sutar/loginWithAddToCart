import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _httpClient: HttpClient) {}

  apiUrl = 'http://localhost:3000/products';

  //here we are use behaviorSubject for cart count
  cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  //using this method we can get data from api Url
  getProduct(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.apiUrl);
  }

  //using this method you can add or update date into that api url
  updateProduct(product: Product): Observable<Product[]> {
    const newUrl = `${this.apiUrl}/${product.id}`;
    return this._httpClient.put<Product[]>(newUrl, product);
  }

  // here we add method for update count of item
  updateCartItemCount(count: number) {
    this.cartItemCountSubject.next(count);
  }
}
