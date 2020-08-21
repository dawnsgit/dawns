import { Component, OnInit } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ThanksComponent } from '../thanks/thanks.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  totalPayment
  baseUrl: string = "https://rbtech.in/GOODLUCK/GoodluckApi/public/index.php/api/"
  constructor(private payPal: PayPal, private storage: Storage, public alertController: AlertController,
    private alert: AlertService, private http: HttpClient, private router: Router, public toastCtrl: ToastController,
    private route: ActivatedRoute, public dialog: MatDialog, public loader: LoadingController,) { }
  paymentAmount
  currency: string = 'INR';
  currencyIcon: string = 'Rs';
  ngOnInit() {
    this.totalPayment = this.route.snapshot.paramMap.get('total')
  }

  //Pay With Paypal
  payWithPaypal() {
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AYalD7tR1qu3veUo3DEg3E3_3hfUnvnSDAr0lnWNxWJZ5vm9Dd27SN6bfoQi3VQpJADr0TbMm-hNpuuJ'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          //  var _request={
          //   "Subscription":"Subscription",
          //   "UserID":this.uId,
          //   "TransID":res.response.id,
          //  }
          //  this.http.post('https://ediner.online/EdinnerApi/public/index.php/api/InsertAll',_request).subscribe(data=>{
          //    console.log(data)
          this.alert.presentalertConfirm('Yup', 'Paymet Done Successfully')
          this.thanks()
          // localStorage.clear();
          //  })
          //   this.toast = this.toastCtrl.create({
          //     message: 'Order Successfully',
          //     duration: 4000,
          //     showCloseButton: true,
          //     closeButtonText: 'Yeah',
          //     animated: true,
          //     cssClass:"my-custom-class"
          //   }).then((toastData) => {
          //     console.log(toastData)
          //     toastData.present()
          //   console.log(res);
          // })
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }
  //Cash On Delivery
  async payWithCash() {
    var d = new Date();
    var n = d.getTime();
    const loading = await this.loader.create({
      message: 'Please Wait!!!',
      duration: 2000
    })
    await loading.present();
    var _request = {
      "UID": localStorage.getItem('UserId'),
      "LID": "4",
      "CoupID": "25",
      "Pay_mode": "Cash",
      "cart_detail": "",
      "Payment_id": n
    }
    this.http.post(this.baseUrl + 'InsertAll', _request).subscribe((data: any) => {
      console.log(data)
    })
    this.thanks()
  }

  //Popup For Thanks Page
  thanks(): void {
    const dialogRef = this.dialog.open(ThanksComponent, {
      // width: '600px'
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    })
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
