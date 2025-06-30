import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DownloademidComponent } from './downloademid/downloademid.component';
import { HospitalinfoComponent } from './hospitals/hospitalinfo/hospitalinfo.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { RegisterhospitalComponent } from './hospitals/registerhospital/registerhospital.component';
import { EditprofileComponent } from './profile/editprofile/editprofile.component';
import { PackageSubscriptionComponent } from './profile/package-subscription/package-subscription.component';
import { PaymentStatusComponent } from './profile/payment-status/payment-status.component';
import { ProfileHomeComponent } from './profile/profile-home/profile-home.component';
import { ProfileComponent } from './profile/profile.component';
import { CorporateProfileComponent } from './corporate-profile/corporate-profile.component';
import { CorporateHomeComponent } from './corporate-profile/corporate-home/corporate-home.component';
import { DownloadcorpemidComponent } from './corporate-profile/downloadcorpemid/downloadcorpemid.component';


const routes: Routes = [


  {
    path: '',
    component: DashboardComponent,
    children: [

      {
        path: 'profile',
        component: ProfileHomeComponent
      },

      {
        path: 'profile/:id',
        component: ProfileComponent
      },
      {
        path: 'editprofile',
        component: EditprofileComponent
      },
      {
        path: 'corporate',
        component: CorporateHomeComponent
      },
      {
        path: 'corporate/:id',
        component: CorporateProfileComponent
      },
      {
        path: 'hospitals',
        component: HospitalsComponent
      },
      {
        path: 'registerhospital',
        component: RegisterhospitalComponent
      },
      {
        path: 'hospitalinfo/:hospitalId',
        component: HospitalinfoComponent
      },
      {
        path:'downloademid',
        component:DownloademidComponent
      },
      {
        path:'downloadcorpemid',
        component:DownloadcorpemidComponent
      },

      // {
      //   path: 'blooddonation',
      //   component: BlooddonationComponent
      // },

      // {
      //   path: 'blooddonationinfo',
      //   component: BlooddonationinfoComponent
      // },

      {
        path: 'package',
        component: PackageSubscriptionComponent
      },

      {
        path:'payment-status',
        component:PaymentStatusComponent
      },
      
  
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
