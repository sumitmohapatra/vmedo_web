import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmergencyModuleRoutingModule } from './emergency-module-routing.module';
import { EmergencycardComponent } from './emergencycard/emergencycard.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { QRCodeModule } from 'angularx-qrcode';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    EmergencycardComponent,

  ],
  imports: [
    CommonModule,
    EmergencyModuleRoutingModule,
    NgxSkeletonLoaderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LightboxModule,
    QRCodeModule,
    MatExpansionModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatCardModule
  ]
})
export class EmergencyModuleModule { }
