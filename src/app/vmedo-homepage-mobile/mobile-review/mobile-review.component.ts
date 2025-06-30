import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-mobile-review',
  templateUrl: './mobile-review.component.html',
  styleUrls: ['./mobile-review.component.css']
})
export class MobileReviewComponent {
  vmedo_review_mobile: SwiperOptions = {
    slidesPerView: 1.2,
    pagination: false
  };
}
