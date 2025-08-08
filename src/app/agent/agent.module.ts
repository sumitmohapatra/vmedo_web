import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepperComponent } from './stepper/stepper.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { PaymentComponent } from './payment/payment.component';
import { OnboardCustomerComponent } from './onboard-customer/onboard-customer.component';
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { NavModule } from '../nav/nav.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { MatCardModule } from '@angular/material/card';
import { QRCodeModule } from 'angularx-qrcode';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'  // <-- Required
  },
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
  },
  {
    path:'manage-customer',
    component:ManageCustomerComponent
  },
  {
    path:'create-suraksha-card',
    component:CreateCardComponent
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
    OnboardCustomerComponent,
    ManageCustomerComponent,
    AddCustomerComponent,
    CreateCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NavModule,
    MatCardModule,
    QRCodeModule,
    NgbModule
  ]
})
export class AgentModule { }
