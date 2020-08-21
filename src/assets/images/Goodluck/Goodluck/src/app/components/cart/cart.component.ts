import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  total: any;
  cartItems: any[] = [];
  amount
  addOn
  idM
  lengthItem
  showEmptyCartMessage: boolean = false;
  applied
  cartValue
  baseUrl: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/"
  constructor(private http: HttpClient, private loader: LoadingController, private router: Router, private route: ActivatedRoute, private storage: Storage,
    public toastCtrl: ToastController, private alert: AlertService) { }

  ngOnInit() {
    // this.loadCart()
  this.loadCartValueApi()
  }
  //Load Cart
  loadCart() {
    this.total = 0.0;
    this.storage.ready().then(() => {
      this.storage.get("cart").then((data) => {
        this.cartItems = data;
        this.lengthItem = data.length
        // console.log(this.cartItems);
        if (this.cartItems.length > 0) {
          this.cartItems.forEach((item, index) => {
            this.total = this.total + (item.Amount)
            // this.qty = item.qty
            // console.log(this.total)
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
    console.log(price)
    let qty = product.qty;
    console.log(qty)
    this.cartItems.splice(i, 1);
    this.storage.set("cart", this.cartItems).then(() => {
      this.total = this.total - (price * qty);
    });
    if (this.cartItems.length == 0) {
      this.showEmptyCartMessage = true;
    }
  }


  //Load Api Parameter Product
  loadCartValueApi(){
    this.total = 0.0;
    var _request={
      "CartDataByUser":"CartDataByUser",
      "uid":localStorage.getItem('UserId')
    }
    console.log(_request)
    this.http.post(this.baseUrl+'GetDataAllTest',_request).subscribe((data:any)=>{
      console.log(data.ProductsDetail)
      this.cartValue=data.ProductsDetail
      if (this.cartValue.length > 0) {
        this.cartValue.forEach((item, index) => {
          console.log(item.Total_val_enc)
          this.total = this.total + (item.Total_val_enc)
          console.log(this.total)
          this.amount = item.PID
        })
      } else {
        this.showEmptyCartMessage = true;
      }
    })
  }


  //Apply  Coupan Code
  onKey(event: any) {
    console.log(event.target.value)
  }

//Add Coupan Code Value
applyCoupan(item){
  this.alert.presentalertConfirm('Yeah','Coupan Code Applied Successfully!')
  this.applied=true
}
  //Edit Cart Product
  editCartProduct(PID) {
    this.router.navigate(['edit-product', PID])
  }

  //Shop Redirect
  shop() {
    this.router.navigate(['/productlist'])

  }
}