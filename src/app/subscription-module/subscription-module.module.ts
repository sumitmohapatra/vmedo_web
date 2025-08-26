import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionModuleRoutingModule } from './subscription-module-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { SubscriptionComponentComponent } from './subscription-component/subscription-component.component';
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';
import { CorporateEnquiryFormComponent } from './corporate-enquiry-form/corporate-enquiry-form.component';

@NgModule({
  declarations: [
    SubscriptionComponentComponent,
    CorporateEnquiryFormComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    SubscriptionModuleRoutingModule,
    MatExpansionModule,
    MatCardModule,
    FormsModule
  ],exports:[CorporateEnquiryFormComponent]
})
export class SubscriptionModuleModule { }
