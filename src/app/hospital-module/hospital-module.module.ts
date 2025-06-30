import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalModuleRoutingModule } from './hospital-module-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { QRCodeModule } from 'angularx-qrcode';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatCardModule } from '@angular/material/card';
import { HospitalAdmissionComponentComponent } from './hospital-admission-component/hospital-admission-component.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    HospitalAdmissionComponentComponent
  ],
  imports: [
    CommonModule,
    HospitalModuleRoutingModule,
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
    MatCardModule
  ]
})
export class HospitalModuleModule { }
