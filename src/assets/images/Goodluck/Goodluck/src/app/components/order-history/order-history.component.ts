import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orderData
  baseUrl: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/GetDataAllTest"
  constructor(private router: Router, public loader: LoadingController, private http: HttpClient,
    public dialog: MatDialog, private api: ApiService, public menuCtrl: MenuController,) { }

  ngOnInit() {
    this.loadOrderdData()
  }

 //Slider Images
 async loadOrderdData() {
  const loading = await this.loader.create({
    message: 'Loading Data!!!',
    duration: 2000
  })
  await loading.present();
  var _request = {
    "OrderDataByUser": "OrderDataByUser",
    "UID":localStorage.getItem('UserId')
  }
  this.http.post(this.baseUrl, _request).subscribe(data => {
    console.log(data)
    this.orderData= data
  })
}

 //redirect On Order Detail
 orderDetail(){
  this.router.navigate(['order-detail'])
}
}
