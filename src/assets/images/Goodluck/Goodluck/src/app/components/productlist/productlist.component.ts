import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss'],
})
export class ProductlistComponent implements OnInit {
  private isOn: boolean = false;
  productList
  baseUrl: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/"
  getButtonText(): string {
    return `Switch ${ this.isOn ? 'Off' : 'On' }`;
  }
  setState(): void {
    this.isOn = !this.isOn;
  }
  toggleDetails() {
    this.isOn = !this.isOn;
  }
  constructor(private router: Router, public loader: LoadingController, private http: HttpClient,) { }

  ngOnInit() {
  this.loadProduct()
  }
  //Load Product
 async loadProduct() {
    const loading = await this.loader.create({
      message: 'Loading Data!!!',
      duration: 500
    })
    await loading.present();
    var _request = {
      "AllProducts": "AllProducts"
    }
    this.http.post(this.baseUrl+'GetDataAll', _request).subscribe(data => {
      this.productList = data
      console.log(data)
    })
  }

   //Product Detail Redirect
   productDetail(PID,ProductName){
    this.router.navigate( ['product',PID,ProductName]);
 }

 //Wishlist Redirect
 wishlist(){
   this.router.navigate(['wishlist'])
 }
}
