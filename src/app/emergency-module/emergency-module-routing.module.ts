import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmergencycardComponent } from './emergencycard/emergencycard.component';



const routes: Routes = [
  {
    path: 'emergencycard',
    component: EmergencycardComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmergencyModuleRoutingModule { }
