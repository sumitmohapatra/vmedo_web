import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmedoHomepageDesktopComponent } from './vmedo-homepage-desktop/vmedo-homepage-desktop.component';
import { DesktopAboutUsComponent } from './desktop-about-us/desktop-about-us.component';
import { DesktopBannerComponent } from './desktop-banner/desktop-banner.component';
import { DesktopDiagnosticsComponent } from './desktop-diagnostics/desktop-diagnostics.component';
import { DesktopFooterComponent } from './desktop-footer/desktop-footer.component';
import { DesktopHomeComponent } from './desktop-home/desktop-home.component';
import { DesktopMediaCoverageComponent } from './desktop-media-coverage/desktop-media-coverage.component';
import { DesktopMedicalSuppliesComponent } from './desktop-medical-supplies/desktop-medical-supplies.component';
import { DesktopMiddleSectionComponent } from './desktop-middle-section/desktop-middle-section.component';
import { DesktopMiniBannersComponent } from './desktop-mini-banners/desktop-mini-banners.component';
import { DesktopReviewComponent } from './desktop-review/desktop-review.component';
import { DesktopVmedoServicesComponent } from './desktop-vmedo-services/desktop-vmedo-services.component';
import { DesktopVmedoSubscriptionComponent } from './desktop-vmedo-subscription/desktop-vmedo-subscription.component';
import { SwiperModule } from 'swiper/angular';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component:VmedoHomepageDesktopComponent
  },
];


@NgModule({
  declarations: [
    VmedoHomepageDesktopComponent,
    DesktopFooterComponent,
     DesktopMediaCoverageComponent,DesktopReviewComponent,DesktopAboutUsComponent,
     DesktopMedicalSuppliesComponent,DesktopBannerComponent,DesktopDiagnosticsComponent,
     DesktopHomeComponent,DesktopMiniBannersComponent,DesktopVmedoSubscriptionComponent,DesktopVmedoServicesComponent, DesktopMiddleSectionComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule.forChild(routes)
  ]
})
export class VmedoHomepageDesktopModule { }
