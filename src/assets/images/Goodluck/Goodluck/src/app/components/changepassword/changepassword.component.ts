import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangepasswordComponent implements OnInit {

  constructor(private router:Router,public loader:LoadingController,private alert:AlertService,
    private http:HttpClient) { }

  ngOnInit() {}

 async changePassword(oldpassword,newpassword,newpassword1){
   console.log(oldpassword,newpassword,newpassword1)
    if (oldpassword == '' || oldpassword == undefined || oldpassword == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter The Old Password.')
    }
   else if (newpassword == '' || newpassword == undefined || newpassword == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter The New Password.')
    }
   else if (newpassword1 == '' || newpassword1 == undefined || newpassword1 == null) {
      this.alert.presentalertConfirm('Caution', 'Please Enter The New Confirm Password.')
    }
  //  else if (mobile == '' || mobile == undefined || mobile == null) {
  //     this.alert.presentalertConfirm('Caution', 'Please Enter The Mobile No.')
  //   }
  //  else if (newpassword ===  newpassword1 ) {
  //     this.alert.presentalertConfirm('Caution', 'Password Not Match.')
  //   }
    else{
      const loading = await this.loader.create({
        message: 'Verifying!!!',
        duration: 1500
      })
      await loading.present();
      var _request={
        "curp":oldpassword,
        "newp":newpassword,
        "UID":localStorage.getItem('UserId')
      }
      console.log(_request)
      this.http.post('https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/ChangePassword',_request).subscribe((data:any)=>{
        console.log(data.msg)
    if(data.msg=="Doesn't Match Your Old Password"){
      this.alert.presentalertConfirm('Opps',"Doesn't Match Your Old Password")
    }
    else if(data.msg=="User Not Exist In Our Database"){
      this.alert.presentalertConfirm('Opps','User Not Exist In Our Database')
    }
    else if(data.msg=="Your Password Has Been Updated Successfully"){
      this.alert.presentalertConfirm('Yeah','Password Chnaged Succesfully')
      this.router.navigate(['/profile'])
    }
   else{
    this.alert.presentalertConfirm('Opps','Something went wrong Try Again Later')
   }
      })
      
    }
  }

}
