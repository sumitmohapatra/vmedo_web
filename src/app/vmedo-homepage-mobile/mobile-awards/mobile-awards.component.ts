import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-mobile-awards',
  templateUrl: './mobile-awards.component.html',
  styleUrls: ['./mobile-awards.component.css']
})
export class MobileAwardsComponent {
vmedo_achievements_mobile: SwiperOptions = {
      slidesPerView: 2.2,
      spaceBetween: 2,
  
    };
}
