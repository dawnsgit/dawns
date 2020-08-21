import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-allcategory',
  templateUrl: './allcategory.component.html',
  styleUrls: ['./allcategory.component.scss'],
})
export class AllcategoryComponent implements OnInit {
  baseUrl: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/"
  categoryData
  subCategory
  constructor(private router: Router, public loader: LoadingController, private http: HttpClient) { }

  ngOnInit() {
    this.loadAllCategory()
  }
   //Load AllCategory
   async loadAllCategory() {
    const loading = await this.loader.create({
      message: 'Loading Data!!!',
      duration: 500
    })
    await loading.present();
    var _request = {
      "Categorys": "Categorys"
    }
    this.http.post(this.baseUrl+'GetDataAll', _request).subscribe(data => {
      console.log(data)
      this.categoryData = data
    })
  }

   //Load Category
   checkSub(CID) {
    var _request = {
      "SubCategory": "SubCategory",
      CID: CID
    }
    this.http.post(this.baseUrl+'GetDataAll', _request).subscribe(data => {
      this.subCategory = data
      console.log(data)
      if (this.subCategory == "Blank") {
        this.router.navigate(['productlist'])
      } else {
        this.router.navigate(['/sub-cat/' + CID])
      }
    })
  }
}
