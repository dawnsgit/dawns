import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, MenuController, LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  url: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/"
  yLocation
  msg
  locationId
  pinCode
  msgResponse
  constructor(private router: Router, public menuCtrl: MenuController, public alert: AlertService,
    public toastCtrl: ToastController, public loader: LoadingController, private http: HttpClient) { }

  ngOnInit() {
    this.location()
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false)
  }
  async register(firstname,lastname,shopname,email,mobile,address,location,pin,password,password1) {
    console.log(firstname,lastname,shopname,email,mobile,address,location,address,password,password1)
    if (firstname == '' || firstname == undefined || firstname == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter firstname')
    }
    else if (lastname == '' || lastname == undefined || lastname == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter lastname')
    }
    else if (shopname == '' || shopname == undefined || shopname == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter shopname.')
    }
    else if (email == '' || email == undefined || email == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter Email.')
    }
    else if (mobile == '' || mobile == undefined || mobile == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter mobile.')
    }
    else if (location == '' || location == undefined || location == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter location.')
    }
    // else if (address == '' || address == undefined || address == null) {
    //   this.alert.presentalertConfirm('Caution', 'Please Enter address.')
    // }
    else if (pin == '' || pin == undefined || pin == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter pin.')
    }
    else if (password == '' || password == undefined || password == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter shopname.')
    }

    else if (password1 == '' || password1 == undefined || password1 == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter Confirm Password.')
    }
    else {
      const loading = await this.loader.create({
        message: 'Authentication...',
        duration: 2000
      })
      await loading.present()
      var _request = {
        "FName": firstname,
        "LName": lastname,
        "Contact": mobile,
        "REmail": email,
        "ShopName": shopname,
        "LID": location,
        "Address": address,
        "Password": password
      }
      console.log(_request)
      this.http.post(this.url + 'Register', _request).subscribe((data: any) => {
        console.log(data)
        this.msg = data.msg
        if (this.msg == "Now You Are The Member OF Goodluck Thanks You !!") {
          this.alert.presentalertConfirm('Yeah', 'Now You Are The Member OF Goodluck Thanks You !!')
          this.router.navigate(['login'])
        }
        else if (this.msg = "Enter a valid mobile number!") {
          this.alert.presentalertConfirm('Opps', 'Enter a valid mobile number!')
        }
       else{
        this.alert.presentalertConfirm('Opps', 'Please Enter Valid Email Id')
       }
      })
    }

  }
  //Location Api
  location() {
    var _request = {
      "MasterLocation": "MasterLocation",
      "Status": "Y"
    }
    this.http.post(this.url + 'GetDataAll', _request).subscribe(data => {
      this.yLocation = data
    })
  }

  //Check PinCode Vaidation
  checkPinCode(pin){
  var _request={
    "ValidateLocation":"ValidateLocation",
    "LocationID":this.locationId,
    "PinCode":pin
  }
  console.log(_request)
  this.http.post(this.url+'GetDataAllTest',_request).subscribe((data:any)=>{
    console.log(data)
    this.msgResponse=data.msg
    if(this.msgResponse=="Not Exist Pincode"){
      this.alert.presentalertConfirm('Opps','Pincode Does not exist in Particuler Location')
    }
    else{

    }
 
  })
  }
  //Login Redirect
  login() {
    this.router.navigate(['login'])
  }
  //Forget Password
  forget() {
    this.router.navigate(['forgetpassword'])
  }
  //On Key Up
  onKey(event: any) { 
    this.pinCode = event.target.value
    this.checkPinCode(this.pinCode)
  }

  //Change Event Value
  change(event) {
    this.locationId = event.detail.value
   
  }
}
