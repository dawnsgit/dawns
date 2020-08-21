import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent implements OnInit {

  constructor(private router:Router,private alert:AlertService) { }

  ngOnInit() {}

  //Forget Password
  forgetPassword(email){
    if (email == '' || email == undefined || email == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter The Email Id.')
    }
  else{
    this.alert.presentalertConfirm('Yeah','Link Sent To Your Email Id ')
    this.router.navigate(['login'])
  }
  }

  //Login Redorect
  login(){
    this.router.navigate(['login'])
  }

}
