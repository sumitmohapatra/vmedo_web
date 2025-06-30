import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';

import SwiperCore, {
  SwiperOptions,
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectFade,
} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, EffectFade]);

declare var gtag: Function;

@Component({
  selector: 'app-find-blood-donor-component',
  templateUrl: './find-blood-donor-component.component.html',
  styleUrls: ['./find-blood-donor-component.component.css']
})
export class FindBloodDonorComponentComponent {

  isSideMenuOpen2 = false;
  isOpen2 = false;

  toggleServices2() {
    this.isOpen2= !this.isOpen2;
  }

  isDropdownDesktopOpen: boolean = false;

  toggleDropdownDesktop() {
      this.isDropdownDesktopOpen = !this.isDropdownDesktopOpen;
  }

  

  private window: any;
  phone:any;

  isSideMenuOpen: boolean = false;

  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

   //Services popup
   showPopup: boolean = false;

   togglePopup(): void {
     this.showPopup = !this.showPopup;
   }


     //mobile widget icons
  selectedIndex: number = -1; // Initialize selectedIndex to -1, indicating no icon is selected

  selectIcon(index: number) {
    this.selectedIndex = index; // Set the selectedIndex to the clicked icon index
  }

  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth <= 768; // Adjust as needed
  }

  vmedo_review_desktop: SwiperOptions = {
    slidesPerView: 3,
  };


  ngOnInit(): void {

    this.phone=9343180000;

    this.titleService.setTitle("Find nearby emergency hospitals details, phone numbers, and ICU bed availability ");

    this.metaTagService.addTags([
      { name: 'description', content: 'Find information about the nearest emergency hospital ready to accept emergency admission right now, get the emergency department number, and check the availability of hospital beds.'
     },
     { name: 'author', content: 'Find nearby emergency hospitals details, phone numbers, and ICU bed availability '},
    ]);

 
  }

    /**
   * CONSTRUCTOR
   * @param common
   * @param route
   * @param app
   */

    constructor(
      @Inject(DOCUMENT) private document: Document,
      public common: CommonService,
      private router: Router,
      public app: AppComponent,
      private titleService: Title,
      private metaTagService: Meta
    ) {
      this.checkIfMobile();
      this.window = this.document.defaultView;
      this.common.modal.CloseAllModal();
  
      gtag('event', 'page_view', {
        send_to: 'G-9VRNKZ96W9',
        page_title: 'Home page',
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }

    vmedo_review_mobile: SwiperOptions = {
      slidesPerView: 1.2,
      pagination: false
    };

    other_services_mobile: SwiperOptions = {
      slidesPerView: 2.4,
      pagination: false,
    };

    our_other_services_dektop: SwiperOptions = {
      slidesPerView: 5,
      spaceBetween: 14,
    };
  
}
