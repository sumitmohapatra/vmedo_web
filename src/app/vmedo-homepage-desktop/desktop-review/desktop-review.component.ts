import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-desktop-review',
  templateUrl: './desktop-review.component.html',
  styleUrls: ['./desktop-review.component.css']
})
export class DesktopReviewComponent {
 vmedo_review_desktop2: SwiperOptions = {
    slidesPerView: 3,
    navigation: true,
  };
}
