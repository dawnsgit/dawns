import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subcategory-product',
  templateUrl: './subcategory-product.component.html',
  styleUrls: ['./subcategory-product.component.scss'],
})
export class SubcategoryProductComponent implements OnInit {
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
  cId
  subcategoryName
  constructor(private router: Router, public loader: LoadingController, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.cId = this.route.snapshot.paramMap.get('sub_category_id')
    this.subcategoryName=this.route.snapshot.paramMap.get('sub_category_name')
    console.log(this.subcategoryName)
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
      "SubCategoryProduct":"SubCategoryProduct",
      "SCID":"SCID",
      "CID": this.cId
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