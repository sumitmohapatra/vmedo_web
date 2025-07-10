import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-mobile-diagnostics',
  templateUrl: './mobile-diagnostics.component.html',
  styleUrls: ['./mobile-diagnostics.component.css']
})
export class MobileDiagnosticsComponent {
 vmedo_urgent_care_at_home_mobile: SwiperOptions = {
      slidesPerView: 2.4,
      pagination: false,
    };
}
