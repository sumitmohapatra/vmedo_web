import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HospitalsComponent } from '../dashboard/hospitals/hospitals.component';
import { HospitalAdmissionComponentComponent } from './hospital-admission-component/hospital-admission-component.component';

const routes: Routes = [

  {
    path: '',
    component:HospitalAdmissionComponentComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalModuleRoutingModule { }
