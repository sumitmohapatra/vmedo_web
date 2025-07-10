import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-mobile-vmedo-store1',
  templateUrl: './mobile-vmedo-store1.component.html',
  styleUrls: ['./mobile-vmedo-store1.component.css']
})
export class MobileVmedoStore1Component {
  vmedo_store_mobile: SwiperOptions = {
    slidesPerView: 2.5,
    pagination: false,
  };

}
