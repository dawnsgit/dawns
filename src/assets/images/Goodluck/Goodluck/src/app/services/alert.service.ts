import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController:AlertController) { }

  async presentalertConfirm(header:string,message:string){
  let choice
  const alert=await this.alertController.create({
    header:header,
    message:message,
    buttons:[
      {
        text:'Cancel',
        role:'cancel',
        cssClass:'secondary',
        handler:()=>{

        }
      },
      {
        text:'Okey',
        role:'okey',
        cssClass:'secondary',
        handler:()=>{

        }
      }
    ]
  })
  await alert.present();
  await alert.onDidDismiss().then(data=>{
    choice=data
  })
  return choice;
  }
}
