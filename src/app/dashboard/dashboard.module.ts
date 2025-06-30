import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { HospitalsComponent } from './hospitals/hospitals.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HospitalinfoComponent } from './hospitals/hospitalinfo/hospitalinfo.component';
import { EditprofileComponent } from './profile/editprofile/editprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RegisterhospitalComponent } from './hospitals/registerhospital/registerhospital.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LightboxModule } from 'ngx-lightbox';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { DownloademidComponent } from './downloademid/downloademid.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './dashboard.component';
import { ProfileHomeComponent } from './profile/profile-home/profile-home.component';
import {MatButtonModule} from '@angular/material/button';
import { PackageSubscriptionComponent } from './profile/package-subscription/package-subscription.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaymentStatusComponent } from './profile/payment-status/payment-status.component';
import { CorporateProfileComponent } from './corporate-profile/corporate-profile.component';
import { CorporateHomeComponent } from './corporate-profile/corporate-home/corporate-home.component';
import { DownloadcorpemidComponent } from './corporate-profile/downloadcorpemid/downloadcorpemid.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { OrderByDiscountPipe } from './profile/package-subscription/orderByDiscount.pipe';

//import { QRCodeModule } from 'angular2-qrcode';


@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    EditprofileComponent,
    HospitalsComponent,
    HospitalinfoComponent,
    RegisterhospitalComponent,
    DownloademidComponent,
    ProfileHomeComponent,
    PackageSubscriptionComponent,
    PaymentStatusComponent,
    CorporateProfileComponent,
    CorporateHomeComponent,
    DownloadcorpemidComponent,
    OrderByDiscountPipe,
    
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    DashboardRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    LightboxModule,
    QRCodeModule,
    MatExpansionModule,
   

    NgMultiSelectDropDownModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [DatePipe],
})
export class DashboardModule { }
