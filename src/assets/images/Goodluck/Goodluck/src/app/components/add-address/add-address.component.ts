import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ToastController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAddressComponent implements OnInit {
  locationCoords: any;
  yLocation
  msg
  locationId
  pinCode
  msgResponse
  url: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/"
  
  constructor(private router: Router,
    private http: HttpClient, private androidPermissions: AndroidPermissions, private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation,public toastController: ToastController,public alert:AlertService) {
    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
  }

  ngOnInit() {
    this.location()
  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
  //Check if application having GPS access permission  
  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {

      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('Without Location you Can not Submit this form Please give location Access to Application')
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.getLocationCoordinates()
      },
      error => alert('Without Location you Can not Submit this form Please give location Access to Application')
    );
  }

  // Methos to get device accurate coordinates using device GPS
  getLocationCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.locationCoords.latitude = resp.coords.latitude;
      this.locationCoords.longitude = resp.coords.longitude;
      this.locationCoords.accuracy = resp.coords.accuracy;
      this.locationCoords.timestamp = resp.timestamp;
    }).catch((error) => {
      alert('Without Location you Can not Submit this form Please give location Access to Application' + error);
    });
  }

 
  //Add New Address
async  addAddress(firstname,lastname,shopname,email,mobile,address,location,pin){
    const toast = await this.toastController.create({
      message: 'Your address have been saved.',
      duration: 2000
    });
    toast.present();
    this.router.navigate(['/change-address'])
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
    checkPinCode(pinCode){
    var _request={
      "ValidateLocation":"ValidateLocation",
      "LocationID":this.locationId,
      "PinCode":pinCode
    }
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
   //On Key Up
   onKey(event: any) { 
    this.pinCode = event.target.value
    this.checkPinCode(this.pinCode)
  }

  //Change Event Value
  change(event) {
    this.locationId = event.detail.value
   
  }

  //redirect dismiiiss button
  dismiss(){
    this.router.navigate(['/change-address'])
  }
}
