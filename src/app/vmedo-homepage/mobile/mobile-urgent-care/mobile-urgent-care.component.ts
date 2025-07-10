import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-mobile-urgent-care',
  templateUrl: './mobile-urgent-care.component.html',
  styleUrls: ['./mobile-urgent-care.component.css']
})
export class MobileUrgentCareComponent {
  vmedo_urgent_care_at_home_mobile: SwiperOptions = {
    slidesPerView: 2.4,
    pagination: false,
  };
}
