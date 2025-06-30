import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateComponentComponent } from './corporate-component/corporate-component.component';
import { AboutUsComponentComponent } from './about-us-component/about-us-component.component';
import { ContactUsComponentComponent } from './contact-us-component/contact-us-component.component';
import { PartnerWithUsComponentComponent } from './partner-with-us-component/partner-with-us-component.component';

const routes: Routes = [

  {
    path:'occupational-health-services',
    component:CorporateComponentComponent
  },

  {
    path: 'aboutus',
    component: AboutUsComponentComponent
  },

  {
    path:'contact-us',
    component:ContactUsComponentComponent
  },

  {
    path:'partner-with-us',
    component:PartnerWithUsComponentComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
