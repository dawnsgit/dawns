import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-brandproduct',
  templateUrl: './brandproduct.component.html',
  styleUrls: ['./brandproduct.component.scss'],
})
export class BrandproductComponent implements OnInit {
  private isOn: boolean = false;
  productList
  baseUrl: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/"
  getButtonText(): string {
    return `Switch ${this.isOn ? 'Off' : 'On'}`;
  }
  setState(): void {
    this.isOn = !this.isOn;
  }
  toggleDetails() {
    this.isOn = !this.isOn;
  }
  bId
  brandName
  constructor(private router: Router, public loader: LoadingController, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.bId = this.route.snapshot.paramMap.get('brand_id')
    this.brandName = this.route.snapshot.paramMap.get('Name')
    console.log(this.brandName)
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
      "BrandProducts": "BrandProducts",
      "BID": this.bId
    }
    this.http.post(this.baseUrl + 'GetDataAll', _request).subscribe(data => {
      this.productList = data
      console.log(data)
    })
  }

  //Product Detail Redirect
  productDetail(PID, ProductName) {
    this.router.navigate(['product', PID, ProductName]);
  }
}