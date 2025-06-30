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
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

declare var gtag: Function;

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, EffectFade]);

@Component({
  selector: 'app-vmedo-homepage',
  templateUrl: './vmedo-homepage.component.html',
  styleUrls: ['./vmedo-homepage.component.css'],
})
export class VmedoHomepageComponent {

  isSideMenuOpen2 = false;
  isOpen2 = false;

  toggleServices2() {
    this.isOpen2= !this.isOpen2;
  }


  


  //device detection
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth <= 768; // Adjust as needed
  }

  //side menu
  isSideMenuOpen: boolean = false;

  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  //Services popup
  showPopup: boolean = false;

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

  showSection: boolean = true;

  toggleSection(): void {
    this.showSection = !this.showSection;
  }

  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  //mobile widget icons
  selectedIndex: number = -1; // Initialize selectedIndex to -1, indicating no icon is selected

  selectIcon(index: number) {
    this.selectedIndex = index; // Set the selectedIndex to the clicked icon index
  }

  ngOnInit(): void {

    this.titleService.setTitle("VMEDO Healthcare - Ambulance service | Urgent care at home | Diagnostics at home");

    this.metaTagService.addTags([
      { name: 'description', content: 'VMEDO is a digital healthcare platform, on a mission to make quality healthcare accessible and affordable to all providing ambulance service, urgent care at home, diagnostics at home, instant online doctor consultation, emergency hospital admission 24*7 across India'
     },
     { name: 'author', content: 'VMEDO'},
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
    private metaTagService: Meta,
    private elRef: ElementRef
  ) {
    this.checkIfMobile();
    this.window = this.document.defaultView;
    this.common.modal.CloseAllModal();

    // gtag('event', 'page_view', {
    //   send_to: 'G-9VRNKZ96W9',
    //   page_title: 'Home page',
    //   page_location: window.location.href,
    //   page_path: window.location.pathname,
    // });
  }


  scrollToSection2() {
    const section2 = this.elRef.nativeElement.querySelector('#section2');
    if (section2) {
      section2.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
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

  //Swiper codes



  ngAfterViewInit() {
    setTimeout(() => {
      gtag('event', 'page_view', {
        send_to: 'G-9VRNKZ96W9',
        page_title: 'Home page',
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }, 3000); // Delay to avoid blocking FCP
  }
  
}
