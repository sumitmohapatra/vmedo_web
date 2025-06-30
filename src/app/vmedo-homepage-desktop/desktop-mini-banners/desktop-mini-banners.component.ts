import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-desktop-mini-banners',
  templateUrl: './desktop-mini-banners.component.html',
  styleUrls: ['./desktop-mini-banners.component.css']
})
export class DesktopMiniBannersComponent {

  vmedo_mini_banners_desktop: SwiperOptions = {
    slidesPerView: 3.2,
    spaceBetween: 14,

  };
}
