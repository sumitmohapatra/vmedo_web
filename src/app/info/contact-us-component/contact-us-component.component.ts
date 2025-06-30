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
  selector: 'app-contact-us-component',
  templateUrl: './contact-us-component.component.html',
  styleUrls: ['./contact-us-component.component.css']
})
export class ContactUsComponentComponent {

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
    slidesPerView: 4,
  };


  ngOnInit(): void {

    this.phone=9343180000;

    this.titleService.setTitle("Get in touch with us – VMEDO");

    this.metaTagService.addTags([
      { name: 'description', content: 'We are happy to hear from you. We are on a mission to save lives during Medical emergencies. Get connected with our awesome team and become a part of our vision. '
     },
     { name: 'author', content: 'VMEDO'},
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
      pagination: true
    };

    other_services_mobile: SwiperOptions = {
      slidesPerView: 2.4,
      pagination: false,
    };

    our_other_services_dektop: SwiperOptions = {
      slidesPerView: 5,
      spaceBetween: 14,
    };

    OnClickLogout = () => {
      this.common.userInfo = undefined;
      this.common.auth_token = undefined;
      this.common.refresh_token = undefined;
      localStorage.clear();
      this.app.ShowSuccess(`User logged out successfully`).finally(() => {
        this.router.navigate(['/home']);
      });
    };

}
