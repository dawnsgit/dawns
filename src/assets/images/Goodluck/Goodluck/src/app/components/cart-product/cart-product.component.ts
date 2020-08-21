import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MultiImageComponent } from '../multi-image/multi-image.component';
import { Storage } from '@ionic/storage';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent implements OnInit {
  values: any;
  priceCalulate: any
  pId
  productName
  productDesc
  productImage
  unitData
  priceData
  priceData1
  ready: boolean = false;
  productPrice1
  productPrice
  baseUrl: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/"
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  toast: any
  productDataAll
  unitType
  count1

  constructor(public dialog: MatDialog, public toastController: ToastController, private router: Router,
    private route: ActivatedRoute, public loader: LoadingController, private http: HttpClient, private storage: Storage,
    public toastCtrl: ToastController, public alert: AlertService) { }

  ngOnInit() {
    this.pId = this.route.snapshot.paramMap.get('PID');
    // this.productName = this.route.snapshot.paramMap.get('ProductName');
    this.loadProductDetail()
    this.loadMultiImage()
    this.loadCount()
  }
  // loginDialog(): void {
  //   const dialogRef = this.dialog.open(LoginComponent, {
  //     width: '600px'
  //   })
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');

  //   });
  // }

  //LOad Product Detail
  async loadProductDetail() {
    const loading = await this.loader.create({
      message: 'Loading Data!!!',
      duration: 2000
    })
    await loading.present();
    var _request = {
      "SingleProduct": "SingleProduct",
      "PID": this.pId
    }
    this.http.post(this.baseUrl + 'GetDataAll', _request).subscribe((data: any) => {
      this.productDesc = data[0].ProductDesc
      this.productDataAll = data
      console.log(this.productDataAll)
      this.loadUnit()
      this.loadProductPrice()
    })
  }
  onKey(event: any) { // without type info
    this.values = event.target.value
    if (this.values >= 100) {
      this.priceCalulate = this.values * this.productPrice1
    }
    else {
      this.priceCalulate = this.values * this.productPrice
    }
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      message: 'Your Product Added Successfully.',
      duration: 2500
    });
    toast.present();
  }

  //Multi IMage Dialog
  openDialogMultiImage(): void {
    const dialogRef = this.dialog.open(MultiImageComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: { Image: this.pId }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  //Load Multiple IMage
  loadMultiImage() {
    var _request = {
      "Products": "Products",
      "PID": this.pId
    }
    this.http.post(this.baseUrl + 'GetDataAllTest', _request).subscribe(data => {
      console.log(data)
      this.productImage = data
    })
  }

  //Load Unit
  loadUnit() {
    var _request = {
      "LoadUnit": "LoadUnit",
      "PID": this.pId
    }
    this.http.post(this.baseUrl + 'GetDataAllTest', _request).subscribe(data => {
      this.unitData = data
      console.log(data)
    })
  }
  //load Product Price With Unit
  loadProductPrice() {
    var _request = {
      "ProductsWithPrice": "ProductsWithPrice",
      "PID": this.pId
    }
    this.http.post(this.baseUrl + 'GetDataAllTest', _request).subscribe((data: any) => {
      console.log(data.PriceData)
      this.priceData = data.PriceData
      this.priceData1 = JSON.parse(this.priceData)
      console.log(JSON.parse(this.priceData))
    })
  }
  //Trigger Event
  change(event) {
    this.unitType = event.detail.value
    var _request = {
      "ProductPrice": "ProductPrice",
      "PID": this.pId,
      "Unit": event.detail.value
    }
    console.log(_request)
    this.http.post(this.baseUrl + 'GetDataAllTest', _request).subscribe(data => {
      console.log(data)
      this.productPrice = data[0].productprice_ppc
      this.productPrice1 = data[1].productprice_ppc
      console.log(this.productPrice)
    })
  }

  //Add To Cart
  addToCart(item) {
    this.storage.get("cart").then((data) => {
      if (data == null || data.length == 0) {
        data = [];
        data.push({
          "product": item,
          "qty": this.values,
          "unit": this.unitType,
          "Amount": this.priceCalulate
        })
        this.storage.set("cart", data).then((data => {
          console.log('Cart Updated')
          this.alert.presentalertConfirm('Yeah', 'Product Added Successfully in Cart')
          this.loadCount()
        }))
      }
      else if (data.length > 0) {
        console.log('Product Already IN Cart')
        for (let i = 0; i < data.length; i++) {
          if (item.PID == data[i].product.PID) {
            // this.alert.presentalertConfirm('Opps', 'Product Already in Cart')
          }
          else {
            data.push({
              "product": item,
              "qty": this.values,
              "unit": this.unitType,
              "Amount": this.priceCalulate
            })
            this.storage.set("cart", data).then((data => {
              console.log('Cart Updated')
              this.alert.presentalertConfirm('Yeah', 'Product Added Successfully in Cart')
              this.loadCount()
            }))
          }
        }
      }

    })
  }

  //LoadCount Of Product
  loadCount() {
    this.storage.get("cart").then((data) => {
      this.count1 = data.length
    })
  }

}
