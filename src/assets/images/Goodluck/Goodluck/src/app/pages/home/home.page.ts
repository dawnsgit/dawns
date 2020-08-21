import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  bannerimg
  categoryData
  productData
  subCategory
  brandData
  adBanner
  adBanner1
  productPrice
  baseUrl: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/GetDataAll"
  constructor(private router: Router, public loader: LoadingController, private http: HttpClient,
    public dialog: MatDialog, private api: ApiService, public menuCtrl: MenuController, private platform: Platform, ) { }
  backButtonSubscription;
  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      navigator['app'].exitApp();
    })
    this.loadSlider()
  }
  ionViewWillEnter() {
    this.backButtonSubscription.unsubscribe();
    this.menuCtrl.enable(true)
  }
  //Slider Images
  async loadSlider() {
    const loading = await this.loader.create({
      message: 'Loading Data!!!',
      duration: 2000
    })
    await loading.present();
    var _request = {
      "Slider": "Slider",
      "term": "Slider"
    }
    this.http.post(this.baseUrl, _request).subscribe(data => {
      console.log(data)
      this.bannerimg = data
      this.loadCatgory()
      this.loadAdBanner()
    })
  }

  //Load Category
  loadCatgory() {
    var _request = {
      "Categorys": "Categorys"
    }
    this.http.post(this.baseUrl, _request).subscribe(data => {
      this.categoryData = data
      console.log(data)
      this.loadProduct()
    })
  }

  //Load Product
  loadProduct() {
    var _request = {
      "AllProducts": "AllProducts"
    }
    this.http.post(this.baseUrl, _request).subscribe((data:any) => {
      console.log(data)
      this.productData = data
      // this.productPrice=this.productData.PriceData
      // console.log(JSON.parse(this.productPrice))
      // console.log(this.productData)
      this.loadBrand()
    })
  }

  //Load Category
  checkSub(CID, CategoryName) {
    var _request = {
      "SubCategory": "SubCategory",
      CID: CID
    }
    this.http.post(this.baseUrl, _request).subscribe(data => {
      this.subCategory = data
      console.log(data)
      if (this.subCategory == "Blank") {
        this.router.navigate(['/categoryProduct/', CID, CategoryName])
      } else {
        this.router.navigate(['/sub-cat/', CID, CategoryName])
      }
    })
  }

  //Load Ad Banner
  loadAdBanner() {
    var _request = {
      "Slider": "Slider",
      "term": "Offer Images"
    }
    this.http.post(this.baseUrl, _request).subscribe(data => {
      console.log(data)
      this.adBanner = data[0].image_small
      this.adBanner1=data[1].image_small
    })
  }
  //Brand Wise Product
  brandProduct(brand_id, Name) {
    this.router.navigate(['/brand-product', Name, brand_id])
  }

  //Load Brand Api
  loadBrand() {
    var _request = {
      "Brands": "Brands"
    }
    this.http.post(this.baseUrl, _request).subscribe(data => {
      this.brandData = data
      console.log(data)
    })
  }
  //Notification Redirect
  notification() {
    this.router.navigate(['notification'])
  }
  //Product Detail Redirect
  productDetail(PID, ProductName) {
    this.router.navigate(['product', PID, ProductName]);
  }

  //All Category
  allCategory() {
    this.router.navigate(['allcategory'])
  }
  //Product Search
  search(){
    this.router.navigate(['search-product'])
  }
}