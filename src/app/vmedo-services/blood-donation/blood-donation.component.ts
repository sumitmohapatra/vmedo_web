import { Component, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbDateParserFormatter, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
declare var gtag: Function;

@Component({
  selector: 'app-blood-donation',
  templateUrl: './blood-donation.component.html',
  styleUrls: ['./blood-donation.component.css']
})
export class BloodDonationComponent implements OnInit {
  links: any = {};
  txtBloodGroup: any;
  txtDonorLocation: any;
  isLoading = false;
  regex: any;
  maxDate: any;

  constructor(public common: CommonService, private parserFormatter: NgbDateParserFormatter, private router: Router, public app: AppComponent,
    private titleService: Title,
    private metaTagService: Meta) {
    this.common.modal.CloseAllModal();
    gtag('event', 'page_view', {
      'send_to': 'G-9VRNKZ96W9',
      'page_title': 'Find blood donor page',
      'page_location': window.location.href,
      'page_path': window.location.pathname
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {


      this.OnPageLoad();



    // this.common.ValidateUser(this.router, this.app).then(() => {
    //   this.OnPageLoad();
    // });

    this.titleService.setTitle("Get contact information of blood donors nearby and also register as a blood donor. ");

    this.metaTagService.addTags([
      { name: 'description', content: 'Search blood donors in your city or area, and get their phone number. Also, you can register as a blood donor and donate blood during medical emergencies'
     },
     { name: 'author', content: 'Get contact information of blood donors nearby and also register as a blood donor. '},
    ]);

  }
  OnClickContactUs = () => {
   
    this.router.navigate(['/info/contact-us']);
  };

  OnClickAmbulance = () => {

    this.router.navigate(['/services/ambulance-service-india']);

  };
  OnClickCorporates = () => {
    
    this.router.navigate(['/info/occupational-health-services']);
  };
  OnClickPartnerWithUs = () => {
   
    this.router.navigate(['/info/partner-with-us']);
  };
  OnClickAbouts = () => {
  
    this.router.navigate(['/info/aboutus']);
  };
  OnPageLoad = () => {
    // this.isLoading = true;
    setTimeout(() => {
      this.common.property.GetProperties().then((res: any) => {
          if(res)
            this.common.propInfo = res;
          this.regex = this.common.propInfo.regex;
          this.maxDate = {year: new Date().getFullYear(), month:new Date().getMonth()+1, day: new Date().getDate()};
          try{
            this.LoadBloodGroups();
            /*this.GetAllDonors();*/
            // this.GetAllDonations();
          }
          catch(ex){
            this.app.ShowError(ex);
          }
      }).catch((rej: any) => {
        this.app.ShowError(`${rej.message}`);
      });
    },500);
  };


  donorLocations: any = [];
  searchedDonorLocations: any = [];

  @ViewChild('instance', {static: true}) instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  // search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
  //   const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
  //   // const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
  //   const inputFocus$ = this.focus$;

  //   return merge(debouncedText$, inputFocus$).pipe(
  //     map(term => (term === '' ? this.donorLocations
  //       : this.donorLocations.filter((v: any) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 30))
  //   );
  // }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap( (searchText) =>  this.common.api.GetLocations(searchText) )
  )

  OnKeyDownDonorLocation = (searchInput: any) => {
    this.common.api.GetLocationsByName(searchInput).then((res: any) => {
      if(res && res.objrt && res.objrt.predictions && res.objrt.predictions.length > 0){
        this.searchedDonorLocations = res.objrt.predictions;
        this.donorLocations = this.searchedDonorLocations.map((s: any) => s.description);
      }
    });
  };


  OnSelectDonorLocation = (location: any) => {
    var selectedLocation = this.searchedDonorLocations.find((s: any) => s.description === location);
    if(!selectedLocation)
      return;

    this.common.api.GetLocationsByPlaceId(selectedLocation.place_id).then((res: any) => {
      if(res.objret && res.objret.result){
        var postalCode = res.objret.result.address_components.find((s1: any) => s1.types.includes('postal_code'));
        if(postalCode){
          this.txtPINCode = postalCode.long_name;
        }
      }
    });
  };

  txtSearchLocation: any;
  txtMedicalCondition: any;
  searchLocations: any = [];
  searchedLocations: any = [];

  // searchLocation: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
  //   const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
  //   // const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
  //   const inputFocus$ = this.focus$;

  //   return merge(debouncedText$, inputFocus$).pipe(
  //     map(term => (term === '' ? this.searchLocations
  //       : this.searchLocations.filter((v: any) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 30))
  //   );
  // }


  searchLocation: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap( (searchText) =>  this.common.api.GetLocations(searchText) )
  )

  selectedLocation: any;

  OnKeyDownSearchLocation = (searchInput: any) => {
    this.app.ShowLoader(true);
    this.common.api.GetLocationsByName(searchInput).then((res: any) => {
      if(res && res.objrt && res.objrt.predictions && res.objrt.predictions.length > 0){
        this.searchedLocations = res.objrt.predictions;
        this.searchLocations = this.searchedLocations.map((s: any) => s.description);
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
    if(this.txtSearchLocation === undefined || this.txtSearchLocation.trim() === ''){
      this.app.HideLoader(true);
    }
    else if(this.txtSearchLocation !== undefined && this.txtSearchLocation === this.selectedLocation.item){
      this.app.HideLoader(true);
    }
    else
      this.app.ShowLoader(true);
  };

  OnSelectSearchLocation = (location: any) => {
    var selectedLocation = this.searchedLocations.find((s: any) => s.description === location);
    if(!selectedLocation)
      return;

    this.common.api.GetLocationsByPlaceId(selectedLocation.place_id).then((res: any) => {
      if(res.objret && res.objret.result){
        var postalCode = res.objret.result.address_components.find((s1: any) => s1.types.includes('postal_code'));
        if(postalCode){
          this.txtPINCode = postalCode.long_name;
        }
      }
    });
  };

  bloodGroups: any;

  LoadBloodGroups = () => {
    this.bloodGroups = this.common.propInfo.bloodgroups;
  };

  donors: any;

  GetAllDonors = () => {
    this.common.api.GetAllDonors(this.common.userInfo.userID).then((res: any) => {
      if(res.objret)
        this.donors = res.objret;
        this.donors.sort((a: any, b: any) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
    }).catch((rej: any) => {
      this.app.ShowError(rej.message);
    }).finally(() => {
      this.isLoading = false;
    });
  };
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
  OnSearchDonors = (location: any, bloodGroup: any, medicalCondition: any) => {

    this.app.OnOpenLoginForm('/services/find-blood-donor',true);


    if(location === undefined)
      location = '';
    if(bloodGroup === undefined)
      bloodGroup = '';
    if(medicalCondition === undefined)
      medicalCondition = '';

    // if(location === '')
    //   return this.common.toaster.Error('Please enter location!');

    // if(bloodGroup === '')
    //   return this.common.toaster.Error('Please enter blood Group!');

    // if(medicalCondition === '')
    //   return this.common.toaster.Error('Please enter medical condition!');

    this.isLoading = true;

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

    this.donors = [];
    this.common.api.GetDonors(this.common.userInfo.userID, _location, bloodGroup, medicalCondition, locality, this.selectedLattitude, this.selectedLongitude).then((res: any) => {
      this.isLoading = false;
      if(res.objret)
        this.donors = res.objret;
    }).catch((rej: any) => {
      this.isLoading = false;
      if(rej.message.toLowerCase().includes('invalid refresh token')){
        this.app.ShowWarn('No active Session found, please Login ! Redirecting to home page...').finally(() => {
            this.common.userInfo = undefined;
            this.common.auth_token = undefined;
            this.common.refresh_token = undefined;
            localStorage.clear();
            this.router.navigate(['/home']);
        });
      }
      else
      this.app.ShowError(rej.message);
    })
  };

  OnSearchDonorsByBloodGroup = (bloodGroup: any) => {
    this.isLoading = true;
    this.common.api.GetDonorsByBloodGroup(this.common.userInfo.userID, bloodGroup).then((res: any) => {
      this.isLoading = false;
      if(res.objret)
        this.donors = res.objret;
    }).catch((rej: any) => {
      this.isLoading = false;
      if(rej.message.toLowerCase().includes('invalid refresh token')){
        this.app.ShowWarn('No active Session found, please Login ! Redirecting to home page...').finally(() => {
            this.common.userInfo = undefined;
            this.common.auth_token = undefined;
            this.common.refresh_token = undefined;
            localStorage.clear();
            this.router.navigate(['/home']);
        });
      }
      else
      this.app.ShowError(rej.message);
    })

    // this.isLoading = true;
    // this.common.api.GetAllDonors(this.common.userInfo.userID).then((res: any) => {
    //   if(bloodGroup === undefined || bloodGroup === ''){
    //     if(res.objret)
    //       this.donors = res.objret;
    //   }
    //   else{
    //     if(res.objret)
    //       this.donors = res.objret;
    //     this.donors = this.donors.filter((s: any) => s.bloodgroup === bloodGroup);
    //   }
    //   if(this.donors.length === 0){
    //     this.app.ShowError(`No donors found with blood group ${bloodGroup}`);
    //     this.txtBloodGroup = '';
    //     this.donors = res.objret;
    //   }
    // }).catch((rej: any) => {
    //   this.common.logger.error(rej);
    // }).finally(() => {
    //   this.isLoading = false;
    // });
  };

  OnSearchDonorsByLocation = (location: any) => {
    this.isLoading = true;
    this.common.api.GetDonorsByLocation(this.common.userInfo.userID, location).then((res: any) => {
      this.isLoading = false;
      if(res.objret)
        this.donors = res.objret;
    }).catch((rej: any) => {
      this.isLoading = false;
      if(rej.message.toLowerCase().includes('invalid refresh token')){
        this.app.ShowWarn('No active Session found, please Login ! Redirecting to home page...').finally(() => {
            this.common.userInfo = undefined;
            this.common.auth_token = undefined;
            this.common.refresh_token = undefined;
            localStorage.clear();
            this.router.navigate(['/home']);
        });
      }
      else
      this.app.ShowError(rej.message);
    })
  };

  donations: any;

  GetAllDonations = () => {
    this.common.api.GetAllDonations(this.common.userInfo.userID).then((res: any) => {
      if(res.objret)
        this.donations = res.objret;
        this.donorLocations = this.donations.map((s: any) => s.location);
        this.donorLocations = this.common.GetUniqueItems(this.donorLocations);
    }).catch((rej: any) => {
      this.common.logger.error(rej);
    });
  };

  GetDonorMobile = (id: any) => {

    this.common.api.GetDonorMobile(id).then((res: any) => {
      var contacts = [{
        name: 'Donor Contact',
        number: res.objret
      }];

      this.app.ShowContact(contacts);
      // this.app.ShowInfo(`Contact : ${res.objret}`);
    }).catch((rej: any) => {
      if(rej.message.toLowerCase().includes('invalid refresh token')){
        this.app.ShowWarn('No active Session found, please Login ! Redirecting to home page...').finally(() => {
            this.common.userInfo = undefined;
            this.common.auth_token = undefined;
            this.common.refresh_token = undefined;
            localStorage.clear();
            this.router.navigate(['/home']);
        });
      }
      else
      this.app.ShowError(rej.message);
    })
  };

  OnClickCallDonor = (mobileNumber: any) => {
    // this.GetDonorMobile(id);
    var contacts = [{
      name: 'Donor Contact',
      number: mobileNumber
    }];

    this.app.ShowContact(contacts);
  };

  OnSearchDonations = (location: any) => {
    this.app.ShowLoader();
    this.common.api.GetAllDonations(this.common.userInfo.userID).then((res: any) => {
      if(location === undefined || location === ''){
        if(res.objret)
          this.donations = res.objret;
          this.donorLocations = this.donations.map((s: any) => s.location);
      }
      else{
        if(res.objret)
          this.donations = res.objret;
        this.donations = this.donations.filter((s: any) => s.location === location);
      }

      if(this.donations.length === 0){
        this.app.ShowError(`No donors found for location ${location}`);
        this.txtDonorLocation = '';
        this.donations = res.objret;
      }
      else{
        this.common.donor_location = location;
      }
      this.donorLocations = this.common.GetUniqueItems(this.donorLocations);
    }).catch((rej: any) => {
      this.common.logger.error(rej);
      if(rej.statusCode === 404){
        this.app.ShowError(`No donors found for location ${location}`);
        this.txtDonorLocation = '';
      }
    }).finally(() => {
      this.app.HideLoader();
      this.router.navigate(['/dashboard/blooddonationinfo']);
    });
  };

  @ViewChild('register') registerModal: any;
  registerModalRef: any;

  OnClickRegisterBloodDonor = () => {
    this.registerModalRef = this.common.modal.OpenModal(this.registerModal);
    this.registerModalRef.result.finally(() => {
      this.ClearRegisterModal();
    });
  };

  CloseRegisterModal = () => {
    this.registerModalRef.close();
  };

  ClearRegisterModal = () => {
    this.txtUserName = '';
    this.txtDOB = '';
    this.txtLocation = '';
    this.txtPINCode = '';
    this.txtBloodGroup2 = '';
  };

  txtUserName: any;
  lblUserName: any;
  txtDOB: any;
  lblDOB: any;
  txtPINCode: any;
  lblPINCode: any;
  txtLocation: any;
  lblLocation: any;
  txtBloodGroup2: any;
  lblBloodGroup2: any;

  IsValidDonor = () => {
    if(!this.common.IsValid('username', this.txtUserName, this.regex)){
      this.lblUserName = this.regex['username'].message;
      return false;
    }

    let date = this.parserFormatter.format(this.txtDOB);
    if(!date || date.trim() === ''){
      this.lblDOB = "Date of birth should not be empty";
      return false;
    }

    // if(!this.txtPINCode || this.txtPINCode.trim().length === 0){
    //   this.lblPINCode = "PINCode should not be empty";
    //   return false;
    // }

    if(!this.txtLocation || this.txtLocation.trim().length === 0){
      this.lblLocation = "Location should not be empty";
      return false;
    }

    if(!this.txtBloodGroup2 || this.txtBloodGroup2.trim().length === 0){
      this.lblBloodGroup2 = "Blood group should not be empty";
      return false;
    }

    return true;
  };

  OnTextChanged = (model: any, event: any) => {
    if(model === 'txtUserName')
      this.lblUserName = undefined;
    if(model === 'txtDOB')
      this.lblDOB = undefined;
    if(model === 'txtPINCode')
      this.lblPINCode = undefined;
    if(model === 'txtLocation')
      this.lblLocation = undefined;
    if(model === 'txtBloodGroup2')
      this.lblBloodGroup2 = undefined;
    if(model === 'txtLocation')
      this.lblLocation = undefined;
  };

  OnClickRegister = () => {
    if(this.IsValidDonor()){
      this.app.ShowLoader();
      var donorInfo = {
        Uname: this.txtUserName,
        DOB: `${this.txtDOB.year}-${this.txtDOB.month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${this.txtDOB.day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
        Pincode: this.txtPINCode,
        Location: this.txtLocation,
        BloodGrop: this.txtBloodGroup2,
        Added_on: new Date()
      };

      this.common.api.AddDonor(donorInfo, this.common.userInfo.userID).then((res: any) => {
        this.app.HideLoader();
        this.CloseRegisterModal();
        this.app.ShowSuccess('Donor registered successfully').finally(() => {
          this.OnPageLoad();
          // this.router.navigate(['/dashboard/blooddonationinfo']);
        });
      }).catch((rej: any) => {
        this.app.HideLoader();
        if(rej.message.toLowerCase().includes('invalid refresh token')){
          this.app.ShowWarn('No active Session found, please Login ! Redirecting to home page...').finally(() => {
              this.common.userInfo = undefined;
              this.common.auth_token = undefined;
              this.common.refresh_token = undefined;
              localStorage.clear();
              this.router.navigate(['/home']);
          });
        }
        else
        this.app.ShowError(`${rej.message}`);
      });
    }
  };
}
