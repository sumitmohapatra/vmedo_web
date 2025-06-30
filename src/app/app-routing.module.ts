import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';

import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { VmedoHomepageComponent } from './vmedo-homepage/vmedo-homepage.component';
import { DeviceRedirectComponent } from './device-redirect/device-redirect.component';


const routes: Routes = [
  {
    path: '',
    component: DeviceRedirectComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./vmedo-homepage/vmedo-homepage.module').then(m => m.VmedoHomepageModule)
  },
  {
    path: 'mobile',
    loadChildren: () =>
      import('./vmedo-homepage-mobile/vmedo-homepage-mobile.module').then((m) => m.VmedoHomepageMobileModule),
  },
  {
    path: 'desktop',
    loadChildren: () =>
      import('./vmedo-homepage-desktop/vmedo-homepage-desktop.module').then((m) => m.VmedoHomepageDesktopModule),
  },
  {
    path:'info',   loadChildren: () => import('./info/info.module').then(m => m.InfoModule)
  }, 

  {
    path:'services',   loadChildren: () => import('./vmedo-services/vmedo-services.module').then(m => m.VmedoServicesModule)
  }, 
 
  {
    path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },

  {
    path: 'emergency', loadChildren: () => import('./emergency-module/emergency-module.module').then(m => m.EmergencyModuleModule)
  },

  {
    path: 'hospitals', loadChildren: () => import('./hospital-module/hospital-module.module').then(m => m.HospitalModuleModule)
  },
  {
    path: 'subscription', loadChildren: () => import('./subscription-module/subscription-module.module').then(m => m.SubscriptionModuleModule)
  },
  {
    path: 'emid', loadChildren: () => import('./emid-module/emid-module.module').then(m => m.EmidModuleModule)
  },
  
  

  {
    path: '**', // Catch-all route
    component: PagenotfoundComponent // Replace 'NotFoundComponent' with the component you want to display for invalid paths
  },
];

export function isMobileDevice(): boolean {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
}


@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
