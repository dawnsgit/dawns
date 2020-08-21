import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategory-page',
  templateUrl: './subcategory-page.component.html',
  styleUrls: ['./subcategory-page.component.scss'],
})
export class SubcategoryPageComponent implements OnInit {
  baseUrl: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/"
  subCategoryData
  cId
  subCategoryName
  constructor(private router: Router, public loader: LoadingController, private http: HttpClient,private route:ActivatedRoute) { }

  ngOnInit() {
    this.cId=this.route.snapshot.paramMap.get('CID')
    this.subCategoryName=this.route.snapshot.paramMap.get('CategoryName')
    this.loadSubCategory()
  }
   //Load SubCategory
   async loadSubCategory() {
    const loading = await this.loader.create({
      message: 'Loading Data!!!',
      duration: 500
    })
    await loading.present();
    var _request = {
      "SubCategory":"SubCategory",
      "CID":this.cId
    }
    this.http.post(this.baseUrl+'GetDataAll', _request).subscribe(data => {
      console.log(data)
      this.subCategoryData = data
    })
  }
   //Subcategory Product Redirect
   subCategoryProduct(sub_category_id,sub_category_name) {
    this.router.navigate(['subcategoryProduct', sub_category_id,sub_category_name]);
  }
}
