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
  selector: 'app-ambulance-component',
  templateUrl: './ambulance-component.component.html',
  styleUrls: ['./ambulance-component.component.css'],
})
export class AmbulanceComponentComponent {

  isSideMenuOpen2 = false;
  isOpen2 = false;

  toggleServices2() {
    this.isOpen2= !this.isOpen2;
  }

  isDropdownDesktopOpen: boolean = false;

  toggleDropdownDesktop() {
      this.isDropdownDesktopOpen = !this.isDropdownDesktopOpen;
  }

  
  isMobile: boolean = false;

  isSideMenuOpen: boolean = false;
  phone: any;

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
  };

  vmedo_review_mobile: SwiperOptions = {
    slidesPerView: 1.2,
    pagination: false,
  };

  vmedo_urgent_care_at_home_mobile: SwiperOptions = {
    slidesPerView: 3,
    pagination: false,
  };

  types_of_ambulances_mobile: SwiperOptions = {
    slidesPerView: 2.5,
    pagination: false,
  };

  other_service_mobile: SwiperOptions = {
    slidesPerView: 2.4,
    pagination: false,
  };

  our_other_services_dektop: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 14,
  };

  our_services_dektop: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 14,
    navigation: true,
  };

  //Services popup
  ambulanceEnquiryForm: boolean = false;

  toggleAmbulanceEnquiryForm(): void {
    this.ambulanceEnquiryForm = !this.ambulanceEnquiryForm;
  }

  //Services popup
  showPopup2: boolean = false;

  togglePopup22(): void {
    this.showPopup2 = !this.showPopup2;
  }

  // Toggle Urgentcare at home
  selectedAmbulanceService: string | null = null; // Track the selected specialty

  togglePopup2(ambulanceService: string) {
    this.selectedAmbulanceService = ambulanceService; // Set the selected specialty
  }

  clearPopup() {
    this.selectedAmbulanceService = null; // Clear the selected specialty when closing the popup
  }

  // Toggle Urgentcare at home
  selectedAmbulanceServiceDesktop: string | null = null; // Track the selected specialty

  togglePopup2Desktop(ambulanceServiceDesktop: string) {
    this.selectedAmbulanceServiceDesktop = ambulanceServiceDesktop; // Set the selected specialty
  }

  clearPopupDesktop() {
    this.selectedAmbulanceServiceDesktop = null; // Clear the selected specialty when closing the popup
  }

  ngOnInit(): void {
    this.phone = 9343180000;

    this.titleService.setTitle('Reliable Ambulance Service at best price');

    this.metaTagService.addTags([
      {
        name: 'description',
        content: 'Ambulance service accross India at affordable prices.',
      },
      {
        name: 'author',
        content: 'VMEDO',
      },
    ]);
  }

  private window: any;

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
