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
  selector: 'app-doctor-consultation-component',
  templateUrl: './doctor-consultation-component.component.html',
  styleUrls: ['./doctor-consultation-component.component.css'],
})
export class DoctorConsultationComponentComponent {

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

  phone: any;

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

  vmedo_labs_desktop: SwiperOptions = {
    slidesPerView: 2,
    navigation: true,
  };

  vmedo_review_desktop: SwiperOptions = {
    slidesPerView: 3,
  };

  vmedo_other_services_mobile: SwiperOptions = {
    slidesPerView: 2.4,
    pagination: false,
  };

  our_other_services_dektop: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 14,
  };

  types_of_ambulances_mobile: SwiperOptions = {
    slidesPerView: 2.5,
    pagination: false,
  };

  our_services_dektop: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 14,
    navigation: true,
  };

  vmedo_review_mobile: SwiperOptions = {
    slidesPerView: 1.2,
    pagination: false,
  };

  //Services popup
  showPopup2: boolean = false;

  togglePopup22(): void {
    this.showPopup2 = !this.showPopup2;
  }

  // Toggle Speciality
  selectedSpecialty: string | null = null; // Track the selected specialty

  togglePopup2(specialty: string) {
    this.selectedSpecialty = specialty; // Set the selected specialty
  }

  clearPopup() {
    this.selectedSpecialty = null; // Clear the selected specialty when closing the popup
  }

  // Toggle Urgentcare at home
  selectedSpecialtyDesktop: string | null = null; // Track the selected specialty

  togglePopup2Desktop(specialtyDesktop: string) {
    this.selectedSpecialtyDesktop = specialtyDesktop; // Set the selected specialty
  }

  clearPopupDesktop() {
    this.selectedSpecialtyDesktop = null; // Clear the selected specialty when closing the popup
  }

  ngOnInit(): void {
    this.phone = 9343180000;

    this.titleService.setTitle('Instant online Doctor consultation 24*7');

    this.metaTagService.addTags([
      {
        name: 'description',
        content:
          'Contact Emergency doctor online for consultation and speak to emergency physicians online',
      },
      {
        name: 'author',
        content: 'VMEDO',
      },
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
