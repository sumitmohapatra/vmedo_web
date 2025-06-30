import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDateParserFormatter,  NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { Subject, OperatorFunction, Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { NgbDateCustomParserFormatter } from 'src/app/service/dateformat.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css'],
  providers:[{provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]
})
export class HospitalsComponent implements OnInit {
  links: any = {};
  private allEntities: any = [];
  filteredEntities: any = [];
  private hospitalLocations: any = [];
  txtSearch: any;
  isLoading: any = false;
  isSearch: any = false;
  property: any = {};
  regex: any = {};

  @ViewChild('instance', {static: true}) instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();



  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap( (searchText) =>  this.common.api.GetLocations(searchText) )
  )

  constructor(public common: CommonService, private route: ActivatedRoute, private router: Router, public app: AppComponent,
    private titleService: Title,
    private metaTagService: Meta  ) {
    this.common.modal.CloseAllModal();
    this.common.ValidateUser(this.router, this.app);

  }
  OnClickAbouts = () => {
    
    this.router.navigate(['/info/aboutus']);
  };
  OnClickContactUs = () => {
    
    this.router.navigate(['/info/contact-us']);
  };

  OnClickAmbulance = () => {

    this.router.navigate(['/services/ambulance-service-india']);

  };
  ngOnInit(): void {
    this.OnPageLoad();

    this.titleService.setTitle("Find nearby emergency hospitals details, phone numbers, and ICU bed availability ");

    this.metaTagService.addTags([
      { name: 'description', content: 'Find information about the nearest emergency hospital ready to accept emergency admission right now, get the emergency department number, and check the availability of hospital beds.'
     },
     { name: 'author', content: 'Find nearby emergency hospitals details, phone numbers, and ICU bed availability '},
    ]);
  }

  OnPageLoad = () => {
    this.common.property.GetProperties().then((res: any) => {
      if(res.home)
        this.property = res.home;
      if(res.regex)
        this.regex = res.regex;

        if(this.route.snapshot.paramMap.get('location') && this.route.snapshot.paramMap.get('emergencyHandled')){
          this.isLoading = true;
          setTimeout(() => {
            this.OnSearchHospitalByLocation(this.route.snapshot.paramMap.get('location'), this.route.snapshot.paramMap.get('emergencyHandled'));
          },500);
        }
        else{
          //this.isLoading = true;
          setTimeout(() => {
            this.GetEmergencyHandles();
            //this.GetAllHospitals();
          },500);
        }
    }).catch((rej: any) => {
      this.app.ShowError(`${rej.message}`).finally(() => {
        this.router.navigate(['/dashboard/hospitals']);
      });
    });
  };

  txtEmergencyHandled: any;
  selectedemergencyHandle: any;
  emergencyHandles: any = [];

  GetEmergencyHandles = () => {
    this.emergencyHandles = [];
    this.common.api.GetEmergencyHandled(undefined).then((res: any) => {
      // this.emergencyHandles = res.objspl.map((s: any) => s.sval);
      this.emergencyHandles = res.objspl;
    }).catch((rej: any) => {
      this.emergencyHandles = [];
    });
  };

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }

  getDashboardLink(): string {
    const isUserLoggedIn = localStorage.getItem('Is-user-login') === 'success';
    const isCorporateLoggedIn = localStorage.getItem('Is-corporate-login') === 'success';

    if (isUserLoggedIn) {
      return '/dashboard/profile';
    } else if (isCorporateLoggedIn) {
      return '/dashboard/corporate';
    } else {
      // Handle the case when neither user nor corporate is logged in
      
    }
  }

  OnSelectEmergencyHandle = (handle: any) => {
    if(handle){
      this.selectedemergencyHandle = handle;
      this.txtEmergencyHandled = handle.sval;
    }
    else{
      this.selectedemergencyHandle = undefined;
      this.txtEmergencyHandled = undefined;
    }
  };

  searchedLocations: any = [];
  selectedLocation: any;

  OnKeyDownSearchLocation = (searchInput: any) => {
    this.app.ShowLoader(true);
    this.common.api.GetLocationsByName(searchInput).then((res: any) => {
      if(res && res.objrt && res.objrt.predictions && res.objrt.predictions.length > 0){
        this.searchedLocations = res.objrt.predictions;
        this.hospitalLocations = this.searchedLocations.map((s: any) => s.description);
        // this.search(searchInput);
      }
    });
  };

  selectedLongitude: any;
  selectedLattitude: any;

  OnSelectLocation = (location: any) => {
    this.selectedLocation = location;
    this.app.HideLoader(true);

    var _location = this.searchedLocations.find((s: any) => s.description === location.item);
    if(!_location)
      return;

    this.common.api.GetLocationsByPlaceId(_location.place_id).then((res: any) => {
      if(res.objret && res.objret.result){
        if(res.objret.result.geometry && res.objret.result.geometry.location){
          this.selectedLattitude = res.objret.result.geometry.location.lat;
          this.selectedLongitude = res.objret.result.geometry.location.lng;
        }
      }
    });
  };

  OnSearchFocusOut = (event: any) => {
    if(this.txtSearch === undefined || this.txtSearch.trim() === ''){
      this.app.HideLoader(true);
    }
    else if(this.txtSearch !== undefined && this.txtSearch === this.selectedLocation.item){
      this.app.HideLoader(true);
    }
    else
      this.app.ShowLoader(true);
  };

  OnSearchHospitalByLocation = (location: any, handle: any) => {
    if(location === undefined)
      location = '';
    if(handle === undefined)
      handle = '';


    if(location.trim() === ''){
      this.common.toaster.Error(`Please enter location!`);
      return;
    }
    if(handle.trim() === ''){
      this.common.toaster.Error(`Please enter emergency handle!`);
      return;
    }
    if(location.trim() === '' || handle.trim() === ''){
      //this.GetAllHospitals();
    }
    else
    {
      this.isLoading = true;
      var userId = undefined;
      if(this.common.userInfo && this.common.userInfo.userID)
        userId = this.common.userInfo.userID;

      var locality = '';
      var _location = this.searchedLocations.find((s: any) => s.description === location);
      if(_location && _location.types.indexOf('locality') !== -1){
        locality = _location.terms[_location.types.indexOf('locality')].value;
      }
      else if(_location && _location.types.indexOf('sublocality') !== -1){
        locality = _location.terms[_location.types.indexOf('sublocality')].value;
      }
      if(_location && _location.structured_formatting)
        _location = _location.structured_formatting.main_text;
      else
        _location = location;

      var _handle = this.selectedemergencyHandle === undefined ? '0': this.selectedemergencyHandle.sid;

      this.common.api.GetHospitalsByLocation(userId, _location, _handle, locality, this.selectedLattitude, this.selectedLongitude).then((res: any) => {
        this.isLoading = false;
        if(res.objhospital){
          this.allEntities = res.objhospital;
          this.filteredEntities = this.allEntities;
          this.filteredEntities.sort((a: any, b: any) => {
            return a.hospitalName.toLowerCase().localeCompare(b.hospitalName.toLowerCase());
          });
        }
        else{
         this.allEntities = [];
         this.filteredEntities = [];
         this.app.ShowError(`No records found`);
        }
      }).catch((rej: any) => {
        this.isLoading = false;
        this.allEntities = [];
        this.filteredEntities = [];
        this.app.ShowError(`No records found`);
      })
    }


  };

  GetAllHospitals = () => {
    this.common.api.GetHospitals().then((res: any) => {
      if(res.objhospital){
        this.allEntities = res.objhospital;
        this.filteredEntities = this.allEntities;
        this.filteredEntities.sort((a: any, b: any) => {
          return a.hospitalName.toLowerCase().localeCompare(b.hospitalName.toLowerCase());
        });
      
      }
      else
        this.app.ShowError('No records found');
    }).catch((rej: any) => {
      this.app.ShowError(`${rej.message}`);
    }).finally(() => {
      this.isLoading = false;
    });
  };

  OnClickBack = () => {
    if(!this.common.auth_token)
      this.router.navigate(['/home']);
    else
      this.router.navigate(['/dashboard/profile/1']);
  };

  /** Enquiry Modal Variables */
  selectedHospitalId: any;
  enquiryModal: any;
  txtPatientName: any;
  txtPatientAge: any;
  txtEnquiryReason: any;
  lblPatientName: any;
  lblPatientAge: any;
  lblEnquiryReason: any;

  /** Open Enquiry Modal */
  OpenEnquiryModal(content: any) {
    this.enquiryModal = this.common.modal.OpenModal(content);
    this.enquiryModal.result.finally(() => {
      this.ClearEnquiryModal();
    });
  }
  OnClickCorporates = () => {
   
    this.router.navigate(['/info/occupational-health-services']);
  };
  /** Close Enquiry Modal */
  CloseEnquiryModal = () => {
    this.enquiryModal.close();
  };

  /** Resetting controls for Enquiry Modal */
  private ClearEnquiryModal = () => {
    this.txtPatientName = '';
    this.txtPatientAge = '';
    this.txtEnquiryReason = '';
    this.selectedHospitalId = '';
  };

  /** Input on change */
  OnTextChanged = (model: any, event: any) => {
    if(model === 'txtPatientName')
      this.lblPatientName = undefined;
    if(model === 'txtPatientAge')
      this.lblPatientAge = undefined;
    if(model === 'txtEnquiryReason')
      this.lblEnquiryReason = undefined;
    if(parseInt(this.txtPatientAge) < 1 || parseInt(this.txtPatientAge) > 120){
      this.lblPatientAge = 'Age must be between 1-120 !';
      event.preventDefault();
    }
    else
      this.lblPatientAge = undefined;
  };

  /** Validating all enquiry controls */
  IsValidEnquiry = () => {
    if(!this.common.IsValid('string', this.txtPatientName, this.regex)){
      this.lblPatientName = this.regex['string'].message;
      return false;
    }

    if(!this.common.IsValid('age', this.txtPatientAge, this.regex)){
      this.lblPatientAge = this.regex['age'].message;
      return false;
    }

    if(!this.common.IsValid('string', this.txtEnquiryReason, this.regex)){
      this.lblEnquiryReason = this.regex['string'].message;
      return false;
    }

    return true;
  };

  /** Send Enquiry */
  OnClickEnquiry = () => {
    if(this.IsValidEnquiry()){
      this.app.ShowLoader();
      var hospitalInfo = {
        Ptname: this.txtPatientName,
        Ptage: this.txtPatientAge,
        Ptreason: this.txtEnquiryReason,
        HospitalID: this.selectedHospitalId,
        Enquired_on: new Date()
      }
      this.common.api.PatientEnquiry(hospitalInfo, this.common.userInfo.userID).then((res: any) => {
        this.CloseEnquiryModal();
        this.app.ShowSuccess('Thank you for enquiring');
      }).catch((rej: any) => {
        this.CloseEnquiryModal();
        this.app.ShowError(rej.message);
      });
    }
  };

  /** Send Enquiry */
  OnClickEnquiryCall = () => {
    this.app.ShowLoader();
    this.common.api.PatientEnquiryCall(this.selectedHospitalId, this.common.userInfo.userID).then((res: any) => {
      this.app.ShowSuccess('Thank you for enquiring');
    }).catch((rej: any) => {
      this.app.ShowError(rej.message);
    }).finally(() => {
      this.selectedHospitalId = '';
    });
  };

  OnClickDetails = (hospitalID: any) => {
    // if(!this.common.auth_token)
    //   return;

    // this.app.ShowLoader();
    this.isLoading = true;

    if(!this.common.userInfo || !this.common.userInfo.userID){
      // this.app.HideLoader();
      this.isLoading = false;
      this.router.navigate([`/dashboard/hospitalinfo/${hospitalID}`]);
    }
    else{
      this.common.api.UpdateHospitalProfileVisitor(this.common.userInfo.userID, hospitalID).finally(() => {
        // this.app.HideLoader();
        this.isLoading = false;
        this.router.navigate([`/dashboard/hospitalinfo/${hospitalID}`]);
      });
    }

  };

  rating: any = 4;

  OnRateChanged = () => {

  };

  @ViewChild('infoModal') infoModal: any;
  infoModalRef: any;

  hospitalInfo: any ;

  FetchHospitalDetails = () => {
    this.app.ShowLoader();
    this.common.api.GetHospitalsByUser(this.common.userInfo.userID).then((res: any) => {
      this.app.HideLoader();
      if(res && res.objhosp){
        this.hospitalInfo = res.objhosp;
        this.OpenInfoModal();
      }
      else{
        this.router.navigate([`/dashboard/registerhospital`]);
      }
    }).catch((rej: any) => {
      this.app.HideLoader();
      if(rej.statusCode === 404)
        // this.app.ShowError(`Api not found`);
        this.router.navigate([`/dashboard/registerhospital`]);


        else if(rej.message.toLowerCase().includes('invalid refresh token')){
          this.app.ShowWarn('No active Session found, please Login ! Redirecting to home page...').finally(() => {
              this.common.userInfo = undefined;
              this.common.auth_token = undefined;
              this.common.refresh_token = undefined;
              localStorage.clear();
              this.router.navigate(['/home']);
          });
        }
    });
  };

  OnClickRegisterHospital = () => {
    if(!this.common.auth_token){
      this.app.Login().then((res: any) => {
        if(res === 'success')
          this.FetchHospitalDetails();
      }).catch((rej: any) => {
        this.app.ShowError(rej.message);
      });
    }else{
      this.FetchHospitalDetails();
    }
  };

  OpenInfoModal = () => {
    this.infoModalRef = this.common.modal.OpenModal(this.infoModal);
    this.infoModalRef.result.finally(() => {
      this.ClearInfoModal();
    });
  };

  CloseInfoModal = () => {
    this.infoModalRef.close();
  };

  ClearInfoModal = () => {
    this.hospitalInfo = undefined;
  };
  OnClickPartnerWithUs = () => {
    
    this.router.navigate(['/info/partner-with-us']);
  };
}
