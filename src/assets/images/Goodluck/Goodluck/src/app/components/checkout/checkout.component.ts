import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  total: any;
  cartItems: any[] = [];
  amount
  addOn
  idM
  lengthItem
  showEmptyCartMessage: boolean = false;
  cartValue
  baseUrl: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/"
  constructor(private http: HttpClient, private loader: LoadingController, private router: Router, private route: ActivatedRoute, private storage: Storage,
    public toastCtrl: ToastController, private alert: AlertService) { }

  ngOnInit() {
    this.loadCartValueApi()
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
      this.lengthItem=this.cartItems.length
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

  //Chnage Addresss
  changeAddress(){
    this.router.navigate(['change-address'])
  }

  //Checkout Redirect
  paymentMethod(){
    this.router.navigate(['payment',this.total])
  }
}
