import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmergencyServiceComponent } from './emergency-service/emergency-service.component';
import { MoreitemsComponent } from './moreitems/moreitems.component';
import { BloodDonationComponent } from './blood-donation/blood-donation.component';
import { BloodDonationInfoComponent } from './blood-donation/blood-donation-info/blood-donation-info.component';
import { AmbulanceComponentComponent } from './ambulance-component/ambulance-component.component';
import { UrgentCareAtHomeComponentComponent } from './urgent-care-at-home-component/urgent-care-at-home-component.component';
import { DoctorConsultationComponentComponent } from './doctor-consultation-component/doctor-consultation-component.component';
import { VmedoLabsComponentComponent } from './vmedo-labs-component/vmedo-labs-component.component';
import { DiagnosticsComponentComponent } from './diagnostics-component/diagnostics-component.component';
import { FindBloodDonorComponentComponent } from './find-blood-donor-component/find-blood-donor-component.component';

const routes: Routes = [

  {
    path: 'emergency-online-doctor-consultation',
    component:DoctorConsultationComponentComponent
  },

  {
    path: 'ambulance-service-india',
    component: AmbulanceComponentComponent
  },

  {
    path: 'urgent-medical-care-at-home',
    component: UrgentCareAtHomeComponentComponent
  },

  {
    path: 'diagnostics-at-home',
    component: DiagnosticsComponentComponent
  },

  {
    path: '24x7-medical-emergency-helpline-india',
    component: EmergencyServiceComponent
  },
 
  {
    path: 'more',
    component: MoreitemsComponent
  },


  {
    path: 'labs',
    component: VmedoLabsComponentComponent
  },

  {
    path: 'find-blood-donor2',
    component: FindBloodDonorComponentComponent
  },

  {
    path: 'find-blood-donor',
    component: BloodDonationComponent
  },

  {
    path: 'blood-donation-info',
    component: BloodDonationInfoComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VmedoServicesRoutingModule { }
