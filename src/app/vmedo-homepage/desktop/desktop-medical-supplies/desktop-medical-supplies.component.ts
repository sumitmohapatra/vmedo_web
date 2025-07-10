import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-desktop-medical-supplies',
  templateUrl: './desktop-medical-supplies.component.html',
  styleUrls: ['./desktop-medical-supplies.component.css']
})
export class DesktopMedicalSuppliesComponent {
  care_at_home_dektop: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 14,
    navigation:true
  };
}
