import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmidModuleRoutingModule } from './emid-module-routing.module';
import { EmergencyIdComponent } from './emergency-id/emergency-id.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmergencyIdComponent
  ],
  imports: [
    CommonModule,
    EmidModuleRoutingModule,
    NgbModule,
    FormsModule
  ]
})
export class EmidModuleModule { }
