import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  total: any;
  cartItems: any[] = [];
  amount
  addOn
  idM
  lengthItem
  showEmptyCartMessage: boolean = false;
  constructor(private http: HttpClient, private router: Router, public loader: LoadingController, public alert: AlertService,
    private storage: Storage) { }

  ngOnInit() {
    this.loadCart()
  }

  //Load Wishlist Product
  async loadCart() {
    const loading = await this.loader.create({
      message: 'Loading Data!!!',
      duration: 2000
    })
    await loading.present();
    this.storage.ready().then(() => {
      this.storage.get("wishlist").then((data) => {
        this.cartItems = data;
        this.lengthItem = data.length
        if (this.cartItems.length > 0) {
          this.cartItems.forEach((item, index) => {
            this.total = this.total + (item.Amount)
            this.amount = item.product.PID
          })
        } else {
          this.showEmptyCartMessage = true;
        }
      })
    })
  }

   //Remove From Cart
   removeFromCart(product, i) {
    let price = product.product.ProductPrice
    this.cartItems.splice(i, 1);
    this.storage.set("wishlist", this.cartItems).then(() => {
      // this.total = this.total - (price * qty);
    });
    if (this.cartItems.length == 0) {
      this.showEmptyCartMessage = true;
    }
  }
    //Product Detail Redirect
    productDetail(PID,ProductName){
      this.router.navigate( ['product',PID,ProductName]);
   }
  
}
