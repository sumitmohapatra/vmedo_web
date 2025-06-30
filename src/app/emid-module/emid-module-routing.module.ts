import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmidModuleModule } from './emid-module.module';
import { EmergencyIdComponent } from './emergency-id/emergency-id.component';

const routes: Routes = [
  {
    path: '',
    component:EmergencyIdComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmidModuleRoutingModule { }
