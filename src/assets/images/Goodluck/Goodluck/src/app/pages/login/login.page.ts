import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  toast: any
  userData
  msg
  userId
  basrUrl: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/"
  constructor(private router: Router, public menuCtrl: MenuController, public alert: AlertService,
    public toastCtrl: ToastController, public loader: LoadingController, private http: HttpClient,private platform: Platform,) {
      this.platform.ready().then(() => {
        this.ifLoggedIn()
     })
     }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false)
  }

  ifLoggedIn() {
    this.userId = localStorage.getItem('UserId')
    if (this.userId == '' || this.userId == undefined || this.userId == "null") {
      this.router.navigate(['/login'])
    } else {
      this.router.navigate(['/home'])
    }
  }
  register() {
    this.router.navigate(['signup'])
  }
  async login(email, password) {
    if (email == '' || email == undefined || email == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter Email.')
    }
    else if (password == '' || password == undefined || password == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter  Password.')
    }
    else {
      const loading = await this.loader.create({
        message: 'Authentication...',
        duration: 2000
      })
      await loading.present()
      var _request = {
        "LoginC": email,
        "LoginP": password
      }
      this.http.post(this.basrUrl + 'Login', _request).subscribe((data: any) => {
        console.log(data)
        this.msg = data.msg
        if (this.msg == "User Login SuccessFully") {
          this.router.navigate(['home'])
          this.userData=data.Data
          localStorage.setItem('UserId',this.userData.UID)
          localStorage.setItem('FirstName',this.userData.FName)
          localStorage.setItem('LastName',this.userData.LName)
          localStorage.setItem('Address',this.userData.Address)
          localStorage.setItem('Contact',this.userData.Contact)
          localStorage.setItem('Email',this.userData.Email)
          localStorage.setItem('ShopName',this.userData.ShopName)
        }
        else if (this.msg = "No Records Found For This Username! Please Contact Administrator") {
          this.alert.presentalertConfirm('Opps', 'No Records Found For This Username! Please Contact Administrator')
        }
        else {
          this.alert.presentalertConfirm('Opps', 'Please Enter Valid Email Id')
        }
      })
    }

  }
  //Forget Password
  forget() {
    this.router.navigate(['forgetpassword'])
  }

}
