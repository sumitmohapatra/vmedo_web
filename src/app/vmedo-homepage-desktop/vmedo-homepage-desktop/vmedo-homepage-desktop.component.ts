import { CommonModule, DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import Swiper from 'swiper';
import SwiperCore, {
  SwiperOptions,
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectFade,
} from 'swiper';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { CommonService } from 'src/app/service/common.service';
import { AppComponent } from 'src/app/app.component';

declare var gtag: Function;
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, EffectFade]);

@Component({
  selector: 'app-vmedo-homepage-desktop',
  templateUrl: './vmedo-homepage-desktop.component.html',
  styleUrls: ['./vmedo-homepage-desktop.component.css']
})
export class VmedoHomepageDesktopComponent implements OnInit, AfterViewInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public common: CommonService,
    private router: Router,
    public app: AppComponent,
    private titleService: Title,
    private metaTagService: Meta,
    private elRef: ElementRef
  ) {
    this.checkIfMobile();
    this.window = this.document.defaultView;
    this.common.modal.CloseAllModal();
  }

  isMobile: boolean = false;
  showVideo = false;
  isSideMenuOpen = false;
  isSideMenuOpen2 = false;
  isOpen2 = false;
  showPopup = false;
  showSection = true;
  isDropdownOpen = false;
  selectedIndex: number = -1;

  private window: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

  toggleSection(): void {
    this.showSection = !this.showSection;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleServices2() {
    this.isOpen2 = !this.isOpen2;
  }

  selectIcon(index: number) {
    this.selectedIndex = index;
  }

  scrollToSection2() {
    const section2 = this.elRef.nativeElement.querySelector('#section2');
    if (section2) {
      section2.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

  vmedo_services_desktop: SwiperOptions = {
    slidesPerView: 6,
  };

  vmedo_urgent_care_at_home_desktop: SwiperOptions = {
    slidesPerView: 4,
    navigation: true,
  };

  vmedo_labs_desktop: SwiperOptions = {
    slidesPerView: 2,
    navigation: true,
  };

  vmedo_store_desktop: SwiperOptions = {
    slidesPerView: 3,
    navigation: true,
  };

  vmedo_review_desktop: SwiperOptions = {
    slidesPerView: 3,
  };

  vmedo_banner_desktop: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    effect: 'fade',
    autoplay: { delay: 3000 },
  };

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  onSwiper([swiper]) {
    console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }

  ngOnInit(): void {
    this.titleService.setTitle("VMEDO Healthcare - Ambulance service | Urgent care at home | Diagnostics at home");

    this.metaTagService.addTags([
      {
        name: 'description',
        content:
          'VMEDO is a digital healthcare platform, on a mission to make quality healthcare accessible and affordable to all providing ambulance service, urgent care at home, diagnostics at home, instant online doctor consultation, emergency hospital admission 24*7 across India'
      },
      { name: 'author', content: 'VMEDO' },
    ]);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showVideo = true;
      if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
          send_to: 'G-9VRNKZ96W9',
          page_title: 'Home page',
          page_location: window.location.href,
          page_path: window.location.pathname,
        });
      }
    }, 3000);
  }
}
