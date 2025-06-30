import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-desktop-diagnostics',
  templateUrl: './desktop-diagnostics.component.html',
  styleUrls: ['./desktop-diagnostics.component.css']
})
export class DesktopDiagnosticsComponent {
  diagnostics_at_home_dektop: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 14,
    navigation:true
  };
}
