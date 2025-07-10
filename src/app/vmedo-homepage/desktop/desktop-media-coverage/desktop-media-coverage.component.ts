import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-desktop-media-coverage',
  templateUrl: './desktop-media-coverage.component.html',
  styleUrls: ['./desktop-media-coverage.component.css']
})
export class DesktopMediaCoverageComponent {

  vmedo_media_desktop: SwiperOptions = {
    slidesPerView: 6,
    spaceBetween: 14,

  };
}
