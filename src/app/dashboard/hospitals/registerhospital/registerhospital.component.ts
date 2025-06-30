import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateParserFormatter, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Lightbox } from 'ngx-lightbox';
import { Subject, OperatorFunction, Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { NgbDateCustomParserFormatter } from 'src/app/service/dateformat.service';


@Component({
  selector: 'app-registerhospital',
  templateUrl: './registerhospital.component.html',
  styleUrls: ['./registerhospital.component.css'],
  providers:[{provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]
})
export class RegisterhospitalComponent implements OnInit {

  regex: any;  
  activeTabId: any = 1;
  links: any = {};

  constructor(private _lightbox: Lightbox, public common: CommonService, private router: Router, public app: AppComponent) {
    this.common.modal.CloseAllModal();
   }

  ngOnInit() {    
    this.common.ValidateUser(this.router, this.app).then(() => {
      this.OnPageLoad();
    });
  }

  OnPageLoad = () => {
    this.common.property.GetProperties().then((res: any) => {
      
        if(res)
          this.common.propInfo = res;
        if(this.common.propInfo.regex)
          this.regex = this.common.propInfo.regex;
          if(this.common.propInfo.links)
          this.links = this.common.propInfo.links;
          
        setTimeout(() => {
          this.GetSpecializations();
          this.GetEmergencyHandles();
          this.GetBedTypes();
        },500);
    }).catch((rej: any) => {
      this.app.ShowError(`${rej.message}`);
    })
  };
  
  txtHospitalEmail: any;
  lblHospitalEmail: any;
  txtHospitalName: any;
  lblHospitalName: any;

  txtManagerName: any;
  lblManagerName: any;

  txtManagerContact: any;
  lblManagerContact: any;


  txtEmergencyContact: any;
  lblEmergencyContact: any;
  txtGeneralContact: any;
  lblGeneralContact: any;
  txtCity: any;
  lblCity: any;
  txtPINCode: any;
  lblPINCode: any;
  txtAddress: any;
  lblAddress: any;
  locations: any = [];
  searchedLocations: any = [];

  @ViewChild('instance', {static: true}) instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();


  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap( (searchText) =>  this.common.api.GetLocations(searchText) )
  )

  OnKeyDownSearchLocation = (searchInput: any) => {
    this.common.api.GetLocationsByName(searchInput).then((res: any) => {
      if(res && res.objrt && res.objrt.predictions && res.objrt.predictions.length > 0){
        this.searchedLocations = res.objrt.predictions;
        this.locations = this.searchedLocations.map((s: any) => s.description);
      }
    });
  };

  selectedLongitude: any;
  selectedLattitude: any;

  OnSelectLocation = (location: any) => {    
    var selectedLocation = this.searchedLocations.find((s: any) => s.description === location);
    if(!selectedLocation)
      return;

    this.common.api.GetLocationsByPlaceId(selectedLocation.place_id).then((res: any) => {
      if(res.objret && res.objret.result){
        var postalCode = res.objret.result.address_components.find((s1: any) => s1.types.includes('postal_code'));
        if(postalCode){
          this.txtPINCode = postalCode.long_name;
        }

        if(res.objret.result.geometry && res.objret.result.geometry.location){
          this.selectedLattitude = res.objret.result.geometry.location.lat;
          this.selectedLongitude = res.objret.result.geometry.location.lng;
        }
      }
    });
  };

  IsValidDetails = () => {
    if(this.txtManagerName === undefined || this.txtManagerName === ''){
      this.lblManagerName = `Please enter valid name !`;
      return false;
    }

    if(!this.common.IsValid('short-string', this.txtManagerName, this.regex)){
      this.lblManagerName = this.regex['short-string'].message;
      return false;
    }  

    if(this.txtManagerContact === undefined || this.txtManagerContact === ''){
      this.lblManagerContact = `Please enter valid mobile no !`;
      return false;
    }

    if(!this.common.IsValid('mobile', this.txtManagerContact, this.regex)){
      this.lblManagerContact = this.regex['mobile'].message;
      return false;
    }

    if(this.txtHospitalName === undefined || this.txtHospitalName === ''){
      this.lblHospitalName = `Please enter valid hospital name !`;
      return false;
    }

    if(!this.common.IsValid('short-string', this.txtHospitalName, this.regex)){
      this.lblHospitalName = this.regex['short-string'].message;
      return false;
    }  

    if(this.txtHospitalEmail === undefined || this.txtHospitalEmail === ''){
      this.lblHospitalEmail = `Please enter valid hospital email id !`;
      return false;
    }

    if(!this.common.IsValid('email', this.txtHospitalEmail, this.regex)){
      this.lblHospitalEmail = this.regex['email'].message;
      return false;
    }  

    if(this.txtEmergencyContact === undefined || this.txtEmergencyContact === ''){
      this.lblEmergencyContact = `Please enter valid mobile no !`;
      return false;
    }

    if(!this.common.IsValid('mobile', this.txtEmergencyContact, this.regex)){
      this.lblEmergencyContact = this.regex['mobile'].message;
      return false;
    }

    if(this.txtGeneralContact === undefined || this.txtGeneralContact === ''){
      this.lblGeneralContact = `Please enter valid mobile no !`;
      return false;
    }

    if(!this.common.IsValid('mobile', this.txtGeneralContact, this.regex)){
      this.lblGeneralContact = this.regex['mobile'].message;
      return false;
    }

    if(this.txtCity === undefined || this.txtCity === ''){
      this.lblCity = `Please enter valid city !`;
      return false;
    }

    if(!this.common.IsValid('short-string', this.txtCity, this.regex)){
      this.lblCity = this.regex['short-string'].message;
      return false;
    }  


    if(this.txtAddress === undefined || this.txtAddress === ''){
      this.lblAddress = `Please enter valid address !`;
      return false;
    }

    if(!this.common.IsValid('string', this.txtAddress, this.regex)){
      this.lblAddress = this.regex['string'].message;
      return false;
    }  

    return true;
  };

  OnTextChanged = (model: any, event: any) => {
    if(model === 'txtAddress')
      this.lblAddress = undefined;
    if(model === 'txtCity')
      this.lblCity = undefined;
    if(model === 'txtEmergencyContact')
      this.lblEmergencyContact = undefined;
    if(model === 'txtGeneralContact')
      this.lblGeneralContact = undefined;

    if(model === 'txtHospitalName')
      this.lblHospitalName = undefined;

      if(model === 'txtManagerName')
      this.lblManagerName = undefined;

      if(model === 'txtManagerContact')
      this.lblManagerContact = undefined;

    if(model === 'txtHospitalEmail')
      this.lblHospitalEmail = undefined;
    if(model === 'txtPINCode')
      this.lblPINCode = undefined;
  };

  specializationsArray: any = [];
  specializations: any = [];
  selectedSpecializations: any = [];
  specializationSettings: any = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 3,
    allowSearchFilter: true
  };

  GetSpecializations = () => {
    this.common.api.GetSpecialization(this.common.userInfo.userID).then((res: any) => {
      this.specializationsArray = res.objspl;
      this.specializations = this.specializationsArray.map((s: any) => s.sval);
    }).catch((rej: any) => {
      this.app.ShowError(`${rej.message}`);
    });
  };

  emergencyHandlesArray: any = [];
  emergencyHandles: any = [];
  selectedEmergencyHandles: any = [];
  emergencyHandlesSettings: any = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 3,
    allowSearchFilter: true
  };

  GetEmergencyHandles = () => {
    this.common.api.GetEmergencyHandled(this.common.userInfo.userID).then((res: any) => {
      this.emergencyHandlesArray = res.objspl;
      this.emergencyHandles = this.emergencyHandlesArray.map((s: any) => s.sval);
    }).catch((rej: any) => {
      this.app.ShowError(`${rej.message}`);      
    });
  };

  bedTypesArray: any = [];
  bedTypes: any = [];
  selectedBedTypes: any = [];
  bedTypeSettings: any = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    // itemsShowLimit: 3,
    allowSearchFilter: true
  };

  GetBedTypes = () => {
    this.common.api.GetBedTypes(this.common.userInfo.userID).then((res: any) => {
      this.bedTypesArray = res.objspl;
      this.bedTypes = this.bedTypesArray.map((s: any) => s.bedtypeName);
    }).catch((rej: any) => {
      this.app.ShowError(`${rej.message}`);      
    });
  };

  OnItemSelect(item: any) { }

  OnSelectAll(items: any) { }

  lblSelectedSpecialization: any;
  lblSelectedEmergencyHandled: any;

  IsValidSpecializations = () => {
    if(this.selectedSpecializations.length === 0) {
      // this.lblSelectedSpecialization = "Please select any specialization";
      this.common.toaster.Error("Please select any specialization");
      return false;
    }  

    if(this.selectedEmergencyHandles.length === 0) {
      // this.lblSelectedEmergencyHandled = "Please select any emergency handles";
      this.common.toaster.Error("Please select any emergency handles");
      return false;
    }  

    return true;
  };

  logoSrc: any;

  OnLogoUpload = (event: any) => {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.logoSrc = reader.result;
        reader.readAsDataURL(file);
    }
  }

  hospitalImages: any = [];

  OnImageUpload = (event: any) => {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {          
          const album = {
              src: reader.result,
              caption: reader.result,
              thumb: reader.result
          };
          this.hospitalImages.push(album);
        }
        reader.readAsDataURL(file);
    }
  }

  OpenImage(index: number): void {
    // open lightbox
    this._lightbox.open(this.hospitalImages, index, {centerVertically: true});
  }

  CloseImage(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  OnClickNext = () => {
    if(this.activeTabId === 1){
      if(this.IsValidDetails())
      {
        return this.activeTabId++;
      }
    }
    if(this.activeTabId === 2){
      if(this.IsValidSpecializations()){
        return this.activeTabId++;
      }
    }
    if(this.activeTabId === 3){
      if(this.IsValidDetails()){
        return this.activeTabId++;
      }
    }

    return;
  };

  OnClickBack = () => {
    if(this.activeTabId > 1)
      this.activeTabId = this.activeTabId - 1;
  };
  
  chkAgree: any;

  OnClickSubmit = () => {
    
    if(!this.IsValidSpecializations()){
      return;
    }

    this.app.ShowLoader();

    var hospitalInfo = {
      HLatitude: this.selectedLattitude,
      HLongitude: this.selectedLongitude,
      City: this.txtCity,
      HEmail: this.txtHospitalEmail,
      HospitalName: this.txtHospitalName,
      hmanager:this.txtManagerName,
      hmcontact:this.txtManagerContact,
      HospitalType: 1,
      EmergencyDContact: this.txtEmergencyContact,
      GeneralDContact: this.txtGeneralContact,
      HPincode: this.txtPINCode,
      HAddress: this.txtAddress,
      Spelization: this.specializationsArray.filter((s: any) => this.selectedSpecializations.some((a: any) => a === s.sval)).map((s: any) => s.sid),
      EmergencyHandeled: this.emergencyHandlesArray.filter((s: any) => this.selectedEmergencyHandles.some((a: any) => a === s.sval)).map((s: any) => s.sid),
      File: this.hospitalImages
    }

    this.common.api.RegisterHospital(hospitalInfo, this.common.userInfo.userID).then((res: any) => {
      this.app.ShowSuccess('Hospital registered successfully').finally(() => {
        this.router.navigate(['/dashboard/hospitals']);
      });
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
        this.app.ShowError(`${rej.message}`);
    });
  };
}
