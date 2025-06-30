import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-desktop-vmedo-services',
  templateUrl: './desktop-vmedo-services.component.html',
  styleUrls: ['./desktop-vmedo-services.component.css']
})
export class DesktopVmedoServicesComponent {
  vmedo_services_desktop2: SwiperOptions = {
    slidesPerView: 6,
    navigation:true
  };
}
