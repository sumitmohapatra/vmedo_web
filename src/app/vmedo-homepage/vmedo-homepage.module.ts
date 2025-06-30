import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmedoHomepageComponent } from './vmedo-homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

const routes: Routes = [
  {
    path: '',
    component:VmedoHomepageComponent
  },
];

@NgModule({
  declarations: [VmedoHomepageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SwiperModule
  ]
})
export class VmedoHomepageModule { }
