import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  customOptions: OwlOptions = {
    
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    freeDrag: true,
    center: true,
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-circle-left" aria-hidden="true"></i>','<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true 
  }

}
