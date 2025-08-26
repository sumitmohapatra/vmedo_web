import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoRoutingModule } from './info-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { QRCodeModule } from 'angularx-qrcode';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatCardModule } from '@angular/material/card';
import { CorporateComponentComponent } from './corporate-component/corporate-component.component';
import { SwiperModule } from 'swiper/angular';
import { AboutUsComponentComponent } from './about-us-component/about-us-component.component';
import { ContactUsComponentComponent } from './contact-us-component/contact-us-component.component';
import { PartnerWithUsComponentComponent } from './partner-with-us-component/partner-with-us-component.component';
import { SubscriptionModuleModule } from '../subscription-module/subscription-module.module';



@NgModule({
  declarations: [
    CorporateComponentComponent,
    AboutUsComponentComponent,
    ContactUsComponentComponent,
    PartnerWithUsComponentComponent
  ],
  
  imports: [
    CommonModule,
    InfoRoutingModule,
    CommonModule,
    NgxSkeletonLoaderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LightboxModule,
    QRCodeModule,
    MatExpansionModule,
    SwiperModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatCardModule,
    SubscriptionModuleModule
  ]
})
export class InfoModule { }
