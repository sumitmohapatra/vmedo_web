import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-desktop-about-us',
  templateUrl: './desktop-about-us.component.html',
  styleUrls: ['./desktop-about-us.component.css']
})
export class DesktopAboutUsComponent {
  vmedo_store_dektop: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 14,
  };
}
