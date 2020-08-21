import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-searchproduct',
  templateUrl: './searchproduct.component.html',
  styleUrls: ['./searchproduct.component.scss'],
})
export class SearchproductComponent implements OnInit {
  baseUrl: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/"
  brandData
  productData
  searchData
  constructor(private http: HttpClient, public loader: LoadingController, private router: Router
  ) { }

  ngOnInit() {
    this.loadSuggestBrand()
  }

  //Load Suggested Brand
  async loadSuggestBrand() {
    const loading = await this.loader.create({
      message: 'Loading Data!!!',
      duration: 1000
    })
    await loading.present();
    var _request = {
      "Brands": "Brands"
    }
    this.http.post(this.baseUrl + 'GetDataAll', _request).subscribe(data => {
      this.brandData = data
      console.log(data)
    })
  }

  async searchProduct(searchval) {
    console.log(searchval)
    const loading = await this.loader.create({
      message: 'Searching...',
      duration: 1500
    })
    await loading.present()

    var _request = {
      "ProductSearch": "ProductSearch",
      "term": searchval
    }
    this.http.post(this.baseUrl + 'GetDataAll', _request).subscribe(data => {
      this.productData = data
      this.searchData = true
      console.log(data)
      // if (data == "Blank") {
      //   this.searchData = false
      // }
      // else {
      //   this.searchData = true
      // }


    })
  }

  //Product Detail Redirect
  productDetail(PID, ProductName) {
    this.router.navigate(['product', PID, ProductName]);
  }
}