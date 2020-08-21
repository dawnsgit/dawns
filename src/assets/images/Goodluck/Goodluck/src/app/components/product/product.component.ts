import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MultiImageComponent } from '../multi-image/multi-image.component';
import { Storage } from '@ionic/storage';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
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
  noProduct
  productCount
  added
  showEmptyCartMessage: boolean = false;
  cartItems: any[] = [];
  constructor(public dialog: MatDialog, public toastController: ToastController, private router: Router,
    private route: ActivatedRoute, public loader: LoadingController, private http: HttpClient, private storage: Storage,
    public toastCtrl: ToastController, public alert: AlertService) { }

  ngOnInit() {
    this.pId = this.route.snapshot.paramMap.get('PID');
    this.productName = this.route.snapshot.paramMap.get('ProductName');
    this.loadProductDetail()
    this.loadMultiImage()
    this.checkWishList()
  }
  ionViewWillEnter() {
    this.loadCount()
  }
  // loginDialog(): void {
  //   const dialogRef = this.dialog.open(LoginComponent, {
  //     width: '600px'
  //   })
  //   dialogRef.afterClosed().subscribe(result => {

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
      console.log(data)
      this.productDesc = data[0].ProductDesc
      this.productDataAll = data
      // this.mrpPrice=data[0].MrpPrice
      console.log(this.productDataAll)
      this.loadUnit()
      this.loadProductPrice()
    })
  }
  // without type info
  // onKey(event: any) { 
  //   this.values = event.target.value
  //   if (this.values >= 100) {
  //     console.log('greater hai')
  //     this.priceCalulate = this.values * this.productPrice1
  //   }
  //   else {
  //     console.log('smaller hai')
  //     this.priceCalulate = this.values * this.productPrice
  //   }

  // }

  onKey(event: any) {
    this.values = event.target.value
    var _request = {
      "Single_Pro_Manipl": "Single_Pro_Manipl",
      "Unit": this.unitType,
      "Qty": this.values,
      "PID": this.pId
    }
    console.log(_request)
    this.http.post(this.baseUrl + 'GetDataAllTest', _request).subscribe((data: any) => {
      console.log(data)
      this.priceCalulate = data.encrypted_price
    })
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
  // loadProductPrice() {
  //   var _request = {
  //     "ProductsWithPrice": "ProductsWithPrice",
  //     "PID": this.pId
  //   }
  //   this.http.post(this.baseUrl + 'GetDataAllTest', _request).subscribe((data: any) => {
  //     console.log(data.PriceData)
  //     this.priceData = data.PriceData
  //     this.priceData1 = JSON.parse(this.priceData)
  //     console.log(JSON.parse(this.priceData))
  //   })
  // }

  //load Product Price With Unit
  loadProductPrice() {
    var _request = {
      "ProductPrice": "ProductPrice",
      "PID": this.pId
    }
    this.http.post(this.baseUrl + 'GetDataAllTest', _request).subscribe((data: any) => {
      console.log(data)
      this.priceData1 = data
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
          this.loadCount()
          this.alert.presentalertConfirm('Yeah', 'Product Added Successfully in Cart')

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
      // if (this.count1 == null) {
      //   this.noProduct = true
      // }
      // else if(this.count1.length==0){
      //   this.noProduct = true
      // }
      // else {
      //   this.productCount = this.count1.length
      //   console.log(this.productCount)
      // }
    })
  }


  //Add WishList
  async addWishlist(item) {
    this.storage.get("wishlist").then((data) => {
      console.log(data)
      if (data == null || data.length == 0) {
        data = [];
        data.push({
          "product": item
          // "qty": this.values,
          // "unit": this.unitType,
          // "Amount": this.priceCalulate
        })
        this.storage.set("wishlist", data).then((data => {
          console.log('Cart Updated')
          this.alert.presentalertConfirm('Yeah', 'Product Added Successfully in Wishlist')

        }))
      }
      else if (data.length > 0) {

        for (let i = 0; i < data.length; i++) {
          if (item.PID == data[i].product.PID) {
            console.log('Product Already IN Cart')
            this.added = true
            // this.alert.presentalertConfirm('Opps', 'Product Already in Cart')
          }
          else {
            data.push({
              "product": item
              // "qty": this.values,
              // "unit": this.unitType,
              // "Amount": this.priceCalulate
            })
            this.storage.set("wishlist", data).then((data => {
              console.log('Cart Updated')
              this.alert.presentalertConfirm('Yeah', 'Product Added Successfully in wishlist')
            }))
          }
        }
      }
    })
  }

  //Check WishList Product
  checkWishList() {
    this.storage.get("wishlist").then((data) => {
      if (data == null || data.length == 0) {
        console.log('No Data Added')
      }
      else if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (this.pId == data[i].product.PID) {
            this.added = true
          }
          else {
            console.log('Not Added')
          }
        }
      }
    })
  }

  //Add To Cart via API

  addToCartData() {
    var d = new Date();
    var n = d.getTime();
    var _request = {
      "AddToCart": "AddToCart",
      "Unit": this.unitType,
      "Qty": this.values,
      "PID": this.pId,
      "Total_val_enc": this.priceCalulate,
      "uid": localStorage.getItem('UserId'),
      "CartData": {
        n:
        {
          "rowid": n, "id": this.pId, "qty": this.values, "price": "4800",
          "Total_val_enc": this.priceCalulate, "name": "blank", "coupon": "XMAS-50OFF", "unit": this.unitType,
          "single_price": "4800"
        }
      }
    }
    console.log(_request)
    this.http.post(this.baseUrl + 'InsertAll', _request).subscribe((data: any) => {
      console.log(data)
      if (data.msg == "Please Decrease Your Quantity") {
        this.alert.presentalertConfirm('Opps', "Please Decrease Your Quantity")
      }
      else if (data.msg == "Already Exist In Your Cart") {
        this.alert.presentalertConfirm('Opps', "Already Exist In Your Cart")
      }
      else if (data.msg == "Please Try Again Later Product Is Out Of Stock") {
        this.alert.presentalertConfirm('Opps', "Please Try Again Later Product Is Out Of Stock")
      }
      else {
        this.alert.presentalertConfirm('Yeah', "Successfully Added In Cart")
      }
    })
  }

}
