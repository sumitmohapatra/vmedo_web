import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionComponentComponent } from './subscription-component/subscription-component.component';

const routes: Routes = [

  {
    path: '',
    component:SubscriptionComponentComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionModuleRoutingModule { }
