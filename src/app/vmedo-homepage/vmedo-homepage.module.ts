import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmedoHomepageComponent } from './vmedo-homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { DesktopAboutUsComponent } from './desktop/desktop-about-us/desktop-about-us.component';
import { DesktopBannerComponent } from './desktop/desktop-banner/desktop-banner.component';
import { DesktopDiagnosticsComponent } from './desktop/desktop-diagnostics/desktop-diagnostics.component';
import { DesktopFooterComponent } from './desktop/desktop-footer/desktop-footer.component';
import { DesktopHomeComponent } from './desktop/desktop-home/desktop-home.component';
import { DesktopMediaCoverageComponent } from './desktop/desktop-media-coverage/desktop-media-coverage.component';
import { DesktopMedicalSuppliesComponent } from './desktop/desktop-medical-supplies/desktop-medical-supplies.component';
import { DesktopMiddleSectionComponent } from './desktop/desktop-middle-section/desktop-middle-section.component';
import { DesktopMiniBannersComponent } from './desktop/desktop-mini-banners/desktop-mini-banners.component';
import { DesktopReviewComponent } from './desktop/desktop-review/desktop-review.component';
import { DesktopVmedoServicesComponent } from './desktop/desktop-vmedo-services/desktop-vmedo-services.component';
import { DesktopVmedoSubscriptionComponent } from './desktop/desktop-vmedo-subscription/desktop-vmedo-subscription.component';
import { VmedoHomepageDesktopComponent } from './desktop/vmedo-homepage-desktop/vmedo-homepage-desktop.component';
import { MobileAboutUsComponent } from './mobile/mobile-about-us/mobile-about-us.component';
import { MobileAwardsComponent } from './mobile/mobile-awards/mobile-awards.component';
import { MobileDiagnosticsComponent } from './mobile/mobile-diagnostics/mobile-diagnostics.component';
import { MobileFooterComponent } from './mobile/mobile-footer/mobile-footer.component';
import { MobileMediaCoverageComponent } from './mobile/mobile-media-coverage/mobile-media-coverage.component';
import { MobileNavComponent } from './mobile/mobile-nav/mobile-nav.component';
import { MobileReviewComponent } from './mobile/mobile-review/mobile-review.component';
import { MobileSidemenuComponent } from './mobile/mobile-sidemenu/mobile-sidemenu.component';
import { MobileUrgentCareComponent } from './mobile/mobile-urgent-care/mobile-urgent-care.component';
import { MobileVmedoServicesComponent } from './mobile/mobile-vmedo-services/mobile-vmedo-services.component';
import { MobileVmedoServices2Component } from './mobile/mobile-vmedo-services2/mobile-vmedo-services2.component';
import { MobileVmedoStoreComponent } from './mobile/mobile-vmedo-store/mobile-vmedo-store.component';
import { MobileVmedoStore1Component } from './mobile/mobile-vmedo-store1/mobile-vmedo-store1.component';
import { MobileVmedoWidgetComponent } from './mobile/mobile-vmedo-widget/mobile-vmedo-widget.component';
import { VmedoHomepageMobileComponent } from './mobile/vmedo-homepage-mobile/vmedo-homepage-mobile.component';

const routes: Routes = [
  {
    path: '',
    component:VmedoHomepageComponent
  },
];

@NgModule({
  declarations: [VmedoHomepageComponent, VmedoHomepageDesktopComponent,
      DesktopFooterComponent,
       DesktopMediaCoverageComponent,DesktopReviewComponent,DesktopAboutUsComponent,
       DesktopMedicalSuppliesComponent,DesktopBannerComponent,DesktopDiagnosticsComponent,
       DesktopHomeComponent,DesktopMiniBannersComponent,DesktopVmedoSubscriptionComponent,DesktopVmedoServicesComponent, DesktopMiddleSectionComponent,
      VmedoHomepageMobileComponent,MobileVmedoServicesComponent, MobileVmedoWidgetComponent, MobileFooterComponent, MobileMediaCoverageComponent, MobileAwardsComponent, MobileReviewComponent, MobileVmedoStoreComponent, MobileVmedoStore1Component, MobileDiagnosticsComponent, MobileUrgentCareComponent, MobileAboutUsComponent, MobileVmedoServices2Component, MobileSidemenuComponent, MobileNavComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SwiperModule
  ]
})
export class VmedoHomepageModule { }
