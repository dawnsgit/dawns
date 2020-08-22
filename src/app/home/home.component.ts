import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  customOptions: OwlOptions;
  clientReviewCarosuel: OwlOptions;
  constructor() {
    this.customOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      freeDrag: true,
      center: true,
      dots: true,
      autoplay: true,
      navSpeed: 400,
      navText: [],
      lazyLoad: true,
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
      }
    };

    this.clientReviewCarosuel = {
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      freeDrag: true,
      margin: 20,
      dots: true,
      autoplay: true,
      items: 2,
      navSpeed: 400,
      lazyLoad: true,
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
      }
    };
  }

  ngOnInit(): void {
  }

}
// navText: [`<i class="fa fa-chevron-circle-left float-left" aria-hidden="true"></i>',
// '<i class="fa fa-chevron-circle-right float-right" aria-hidden="true"></i>`
// ],

