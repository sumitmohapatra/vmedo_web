import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StepperComponent } from './stepper/stepper.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { PaymentComponent } from './payment/payment.component';
import { OnboardCustomerComponent } from './onboard-customer/onboard-customer.component';

const routes: Routes = [
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path:'verify-otp',
    component:VerifyOtpComponent
  },
  {
    path:'onboard-customer',
    component:OnboardCustomerComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    VerifyOtpComponent,
    StepperComponent,
    BasicInfoComponent,
    AccountInfoComponent,
    PaymentComponent,
    OnboardCustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AgentModule { }
