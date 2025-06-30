import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpService } from './service/http.service';
import { PropertyService } from './service/property.service';
import { CommonService } from './service/common.service';
import { ConsoleLoggerService } from './service/console.logger.service';
import { LoggerService } from './service/logger.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UiSwitchModule } from 'ngx-ui-switch';
import { DeviceDetectorService } from 'ngx-device-detector';
import {MatCardModule} from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms'
import { MatExpansionModule } from '@angular/material/expansion';
import {  APP_INITIALIZER, PLATFORM_ID } from '@angular/core';
import {  makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


const STATE_KEY = makeStateKey<any>('appState');


@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'vmedo-application' }),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbTooltipModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSkeletonLoaderModule.forRoot({theme: { extendsFromRoot: true}}),
  ],
  providers: [
    HttpService,
    PropertyService,
    CommonService, {
      provide: LoggerService,
      useClass: ConsoleLoggerService
    },
    DeviceDetectorService,
    // {provide: LocationStrategy, useClass: HashLocationStrategy}


    {
      provide: APP_INITIALIZER,
      useFactory: (transferState: TransferState) => {
        return () => {
          transferState.set(STATE_KEY, { data: 'Your initial app state' });
        };
      },
      deps: [TransferState],
      multi: true,
    },
    {
      provide: 'ServerInit',
      useFactory: (transferState: TransferState, platformId: Object) => {
        return () => {
          if (isPlatformBrowser(platformId)) {
            const state = transferState.get<any>(STATE_KEY, null);
            if (state) {
              // Use the initial state data as needed
              console.log('Initial app state:', state.data);
            }
          }
        };
      },
      deps: [TransferState, PLATFORM_ID],
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
