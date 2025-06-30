import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileAboutUsComponent } from './mobile-about-us/mobile-about-us.component';
import { MobileAwardsComponent } from './mobile-awards/mobile-awards.component';
import { MobileDiagnosticsComponent } from './mobile-diagnostics/mobile-diagnostics.component';
import { MobileFooterComponent } from './mobile-footer/mobile-footer.component';
import { MobileMediaCoverageComponent } from './mobile-media-coverage/mobile-media-coverage.component';
import { MobileNavComponent } from './mobile-nav/mobile-nav.component';
import { MobileReviewComponent } from './mobile-review/mobile-review.component';
import { MobileSidemenuComponent } from './mobile-sidemenu/mobile-sidemenu.component';
import { MobileUrgentCareComponent } from './mobile-urgent-care/mobile-urgent-care.component';
import { MobileVmedoServicesComponent } from './mobile-vmedo-services/mobile-vmedo-services.component';
import { MobileVmedoServices2Component } from './mobile-vmedo-services2/mobile-vmedo-services2.component';
import { MobileVmedoStoreComponent } from './mobile-vmedo-store/mobile-vmedo-store.component';
import { MobileVmedoStore1Component } from './mobile-vmedo-store1/mobile-vmedo-store1.component';
import { MobileVmedoWidgetComponent } from './mobile-vmedo-widget/mobile-vmedo-widget.component';
import { SwiperModule } from 'swiper/angular';
import { RouterModule, Routes } from '@angular/router';
import { VmedoHomepageMobileComponent } from './vmedo-homepage-mobile/vmedo-homepage-mobile.component';

const routes: Routes = [
  {
    path: '',
    component:VmedoHomepageMobileComponent
  },
];

@NgModule({
  declarations: [VmedoHomepageMobileComponent,MobileVmedoServicesComponent, MobileVmedoWidgetComponent, MobileFooterComponent, MobileMediaCoverageComponent, MobileAwardsComponent, MobileReviewComponent, MobileVmedoStoreComponent, MobileVmedoStore1Component, MobileDiagnosticsComponent, MobileUrgentCareComponent, MobileAboutUsComponent, MobileVmedoServices2Component, MobileSidemenuComponent, MobileNavComponent],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule.forChild(routes)
  ]
})
export class VmedoHomepageMobileModule { }
