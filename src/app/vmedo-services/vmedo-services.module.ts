import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmedoServicesRoutingModule } from './vmedo-services-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';
import { QRCodeModule } from 'angularx-qrcode';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatCardModule } from '@angular/material/card';
import { EmergencyServiceComponent } from './emergency-service/emergency-service.component';
import { MoreitemsComponent } from './moreitems/moreitems.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BloodDonationComponent } from './blood-donation/blood-donation.component';
import { BloodDonationInfoComponent } from './blood-donation/blood-donation-info/blood-donation-info.component';
import { AmbulanceComponentComponent } from './ambulance-component/ambulance-component.component';
import { SwiperModule } from 'swiper/angular';
import { UrgentCareAtHomeComponentComponent } from './urgent-care-at-home-component/urgent-care-at-home-component.component';
import { DoctorConsultationComponentComponent } from './doctor-consultation-component/doctor-consultation-component.component';
import { VmedoLabsComponentComponent } from './vmedo-labs-component/vmedo-labs-component.component';
import { DiagnosticsComponentComponent } from './diagnostics-component/diagnostics-component.component';
import { FindBloodDonorComponentComponent } from './find-blood-donor-component/find-blood-donor-component.component';
import { NgbCarouselModule, NgbDatepickerModule, NgbDropdownModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    EmergencyServiceComponent,
    MoreitemsComponent,
    BloodDonationComponent,
    BloodDonationInfoComponent,
    AmbulanceComponentComponent,
    UrgentCareAtHomeComponentComponent,
    DoctorConsultationComponentComponent,
    VmedoLabsComponentComponent,
    DiagnosticsComponentComponent,
    FindBloodDonorComponentComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    VmedoServicesRoutingModule,
    NgxSkeletonLoaderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LightboxModule,
    QRCodeModule,
    MatExpansionModule,
    NgbTooltipModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    NgbCarouselModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatCardModule,
    MatTabsModule,
    NgbDropdownModule
  ]
})
export class VmedoServicesModule { }
