import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-vmedo-homepage-desktop',
  templateUrl: './vmedo-homepage-desktop.component.html',
  styleUrls: ['./vmedo-homepage-desktop.component.css']
})
export class VmedoHomepageDesktopComponent {
    constructor( public common: CommonService,public app: AppComponent,private router:Router){}
  
  selectedIndex: number = -1; // Initialize selectedIndex to -1, indicating no icon is selected

  selectIcon(index: number) {
    this.selectedIndex = index; // Set the selectedIndex to the clicked icon index
  }

  showPopup: boolean = false;

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

  showSection: boolean = true;

  toggleSection(): void {
    this.showSection = !this.showSection;
  }

  isSideMenuOpen: boolean = false;

  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  isOpen2 = false;

  toggleServices2() {
    this.isOpen2= !this.isOpen2;
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
      effect: 'fade', // Set effect to 'fade'
      autoplay: { delay: 3000 }, // Set autoplay delay to 3000 milliseconds
    };

// In your component.ts
showVideo = false;

ngAfterViewInit() {
  setTimeout(() => {
    this.showVideo = true;
  }, 2000); // delay loading by 2s
}

  
}
