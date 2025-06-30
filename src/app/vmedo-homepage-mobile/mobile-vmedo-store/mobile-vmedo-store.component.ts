import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-mobile-vmedo-store',
  templateUrl: './mobile-vmedo-store.component.html',
  styleUrls: ['./mobile-vmedo-store.component.css']
})
export class MobileVmedoStoreComponent {
  vmedo_store_mobile: SwiperOptions = {
    slidesPerView: 2.5,
    pagination: false,
  };
}
