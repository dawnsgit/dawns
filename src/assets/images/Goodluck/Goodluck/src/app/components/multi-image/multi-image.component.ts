import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-multi-image',
  templateUrl: './multi-image.component.html',
  styleUrls: ['./multi-image.component.scss'],
})
export class MultiImageComponent implements OnInit {
  pId
  productImage
  baseUrl: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/"
  constructor(
    public dialogRef: MatDialogRef<MultiImageComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient,
  ) {
    this.pId = data.Image
    console.log(this.pId)
  }
  ngOnInit() {
    this.loadMultiImage()
  }
  onNoClick(): void {
    this.dialogRef.close();
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
}