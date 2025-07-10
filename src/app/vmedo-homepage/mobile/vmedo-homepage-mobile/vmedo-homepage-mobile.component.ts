import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-vmedo-homepage-mobile',
  templateUrl: './vmedo-homepage-mobile.component.html',
  styleUrls: ['./vmedo-homepage-mobile.component.css']
})
export class VmedoHomepageMobileComponent {
  constructor( public common: CommonService,public app: AppComponent, private router:Router){}

  selectedIndex: number = -1; // Initialize selectedIndex to -1, indicating no icon is selected

  selectIcon(index: number) {
    this.selectedIndex = index; // Set the selectedIndex to the clicked icon index
  }

  showPopup: boolean = false;

  togglePopup(): void {
    this.showPopup = !this.showPopup;
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
 
   vmedo_mini_banners_mobile: SwiperOptions = {
      slidesPerView: 1.35,
      spaceBetween: 2,
  
    };


    vmedo_banner_mobile: SwiperOptions = {
      slidesPerView: 1,
      spaceBetween: 50,
      pagination: true,
      effect: 'fade', // Set effect to 'fade'
      autoplay: { delay: 3000 }, // Set autoplay delay to 3000 milliseconds
    };

  
    vmedo_labs_mobile: SwiperOptions = {
      slidesPerView: 1.2,
      pagination: true,
    };
  
   
  
}
