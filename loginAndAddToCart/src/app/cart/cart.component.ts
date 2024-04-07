import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Subscription, count } from 'rxjs';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  products: Product[] = [];

  //here we add property for cart Item Count
  cartItemCount: number = 0;
  cartSubscription!: Subscription;

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    //
    this.cartSubscription = this._productService.cartItemCount$.subscribe(
      (count) => {
        this.cartItemCount = count;
      }
    );

    //this method is use for getting filter data from products
    this._productService.getProduct().subscribe((res) => {
      console.log(res);
      this.products = res.filter((product) => product.quantity > 0);
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  updateQuantity(product: Product, change: number) {
    product.quantity += change;
    if (product.quantity < 0) {
      product.quantity = 0;
    }
    this._productService.updateProduct(product).subscribe(() => {
      this.updateCartCount();
    });
  }

  updateCartCount() {
    const count = this.products.reduce((total, p) => total + p.quantity, 0);
    this._productService.updateCartItemCount(count);
  }
}
