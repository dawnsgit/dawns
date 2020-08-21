import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-categoryproduct',
  templateUrl: './categoryproduct.component.html',
  styleUrls: ['./categoryproduct.component.scss'],
})
export class CategoryproductComponent implements OnInit {
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
  categoryName
  constructor(private router: Router, public loader: LoadingController, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.cId = this.route.snapshot.paramMap.get('CID')
    this.categoryName=this.route.snapshot.paramMap.get('CategoryName')
    console.log(this.categoryName)
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
      "CategoryProduct": "CategoryProduct",
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