import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThanksComponent implements OnInit {

  constructor(private router: Router,public dialogRef: MatDialogRef<ThanksComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private storage: Storage,) { }

  ngOnInit() {
    setTimeout(() => {
      this.storage.clear()
     
      this.router.navigate(['home']);
      this.dialogRef.close();
  }, 5000);  //5s
  }
  home() {
    this.router.navigate(['/home'])
  }
  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/home'])
  }
}
