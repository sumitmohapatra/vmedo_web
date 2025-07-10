import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-desktop-home',
  templateUrl: './desktop-home.component.html',
  styleUrls: ['./desktop-home.component.css']
})
export class DesktopHomeComponent {
 care_at_home_dektop: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 14,
    navigation:true
  };
}
