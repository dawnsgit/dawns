import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  editable
  fullname
  email 
  mobile 
  address
  shopname 
  gst = "214544ABCD"
  pan = "ABCD24558"
  lastName
  constructor(private router: Router) { }

  ngOnInit() { 
    this.fullname=localStorage.getItem('FirstName')
    this.lastName=localStorage.getItem('LastName')
    this.email=localStorage.getItem('Email')
    this.address=localStorage.getItem('Address')
    this.mobile=localStorage.getItem('Contact')
    this.shopname=localStorage.getItem('ShopName')
  }

  //Edit Profile Functon
  editProofile(){
this.editable=true
  }
  changePassword() {
    this.router.navigate(['changePassword'])
  
  }
//Notifcation Redirect
notification(){
  this.router.navigate(['notification'])
}

//Cancel Change
cancelChange(){
  this.editable=false
}
}
