import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss'],
})
export class ChangeAddressComponent implements OnInit {
 
  constructor(private router:Router) { 
    
  }

  ngOnInit() {}

  // addNewAddress(): void {
  //   const dialogRef = this.dialog.open(AddAddressComponent, {
  //     maxWidth: '100vw',
  //     maxHeight: '90vh',
  //     height: '100%',
  //     width: '100%'
  //   })
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');

  //   });
  // }
  

  //redirect to add new address apge
  addNewAddress(){
    this.router.navigate(['/add-address'])
  }
}
