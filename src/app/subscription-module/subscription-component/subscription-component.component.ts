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
  selector: 'app-subscription-component',
  templateUrl: './subscription-component.component.html',
  styleUrls: ['./subscription-component.component.css']
})
export class SubscriptionComponentComponent {

  isDropdownDesktopOpen: boolean = false;

  toggleDropdownDesktop() {
      this.isDropdownDesktopOpen = !this.isDropdownDesktopOpen;
  }


  isSideMenuOpen2 = false;
  isOpen2 = false;
  subscriptionPackagesList: any[] = [];

  toggleServices2() {
    this.isOpen2= !this.isOpen2;
  }

  
// Array to hold accordion items
accordions = [
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false }
];


// Method to toggle the open/closed state of accordion
toggleAccordion(index: number): void {
  this.accordions[index].isOpen = !this.accordions[index].isOpen;
}


// Array to hold accordion items
accordions2 = [
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false },
  { isOpen: false }
];


// Method to toggle the open/closed state of accordion
toggleAccordion2(index2: number): void {
  this.accordions2[index2].isOpen = !this.accordions2[index2].isOpen;
}
  
  private window: any;

  isSideMenuOpen: boolean = false;

  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

   //Services popup
   showPopup: boolean = false;

   togglePopup(): void {
     this.showPopup = !this.showPopup;
   }

    //Services popup
    showPopup2: boolean = false;

    togglePopup2(): void {
      this.showPopup2 = !this.showPopup2;
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


  vmedo_labs_desktop: SwiperOptions = {
    slidesPerView: 2,
    navigation: true,
  };

  vmedo_review_desktop: SwiperOptions = {
    slidesPerView: 3,
    navigation: true,
  };

  ngOnInit(): void {

    this.titleService.setTitle("VMEDO Subscription | VMEDO Emergency Health card");

    this.metaTagService.addTags([
      { name: 'description', content: 'Unlock a world of healthcare convenience and savings with VMEDO subscription plans, create a VMEDO health card for yourself and your family to enjoy the benefits of Premium subscription'
     },
     { name: 'author', content: 'VMEDO'},
    ]);

    this.common.api.GetSubscribePackages().then((res: any) => {
      if (res && res.statusCode === 200) {
        this.subscriptionPackagesList = res.objret;
      } else {
        this.app.ShowError(res.message || 'Failed to fetch subscription packages');
      }
    }).catch((error: any) => {
      this.app.ShowError(error?.message || 'Failed to fetch subscription packages');
    });
    

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

  vmedo_urgent_care_at_home_mobile: SwiperOptions = {
    slidesPerView: 2.4,
    pagination: false,
  };

  our_other_services_dektop: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 14,
  };

  other_services_mobile: SwiperOptions = {
    slidesPerView: 2.4,
    pagination: false,
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
