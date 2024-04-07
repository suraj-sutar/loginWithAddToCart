import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  constructor(private _productService: ProductService) {}

  //Get all data from the Api
  ngOnInit(): void {
    this._productService.getProduct().subscribe((res) => {
      console.log(res);
      this.products = res;
    });
  }

  // using this method we can update the cart
  addToCart(product: Product) {
    product.quantity++;
    this._productService.updateProduct(product).subscribe();
  }

  //add method for update cart item count
  updateCartCount() {
    const count = this.products.reduce((total, p) => total + p.quantity, 0);
    this._productService.updateCartItemCount(count);
  }
}
