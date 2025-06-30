import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-emergencycard',
  templateUrl: './emergencycard.component.html',
  styleUrls: ['./emergencycard.component.css']
})
export class EmergencycardComponent implements OnInit {

  isLoading = false;
  regex: any;
  links: any = {};
  maxDate: any;
  device_type: any;
  profileImage: any = [];
  paramEmId: any;
  paramPin: any;
  panelOpenState = false;

  constructor(public common: CommonService, private parserFormatter: NgbDateParserFormatter, private router: Router,private route: ActivatedRoute, public app: AppComponent,
    private titleService: Title,
    private metaTagService: Meta) {
    this.common.modal.CloseAllModal();
    this.route.queryParams.subscribe(params => {
      this.txtSearch = params['id'];
      this.txtPin = params['pin'];
  });
   }

   public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
}

  ngOnInit(): void {
    //this.common.ValidateUser(this.router, this.app).then(() => {
      this.OnPageLoad();
    //});

    this.titleService.setTitle("Emergency card | Medical ID card | In case of Emergency information");

    this.metaTagService.addTags([
      { name: 'description', content: 'In the case of Emergency VMEDO Emergency card is the easiest way to get critical details about casualty including blood group, contact details, insurance, Medical history, and medication'
     },
     { name: 'author', content: 'Emergency card | Medical ID card | In case of Emergency information'},
    ]);

  }
  OnClickAbouts = () => {
    
    this.router.navigate(['/info/aboutus']);
  };
  OnClickCorporates = () => {
   
    this.router.navigate(['/info/occupational-health-services']);
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
  OnPageLoad = () => {
    setTimeout(() => {
      this.common.property.GetProperties().then((res: any) => {
          if(res)
            this.common.propInfo = res;
          this.regex = this.common.propInfo.regex;
          this.device_type = this.common.GetDeviceType();
          try{
            this.maxDate = {year: new Date().getFullYear(), month:new Date().getMonth()+1, day: new Date().getDate()};
            this.LoadBloodGroups();
            this.LoadGenders();
            this.LoadRelations();
          }
          catch(ex){
            this.app.ShowError(ex);
          }
      }).catch((rej: any) => {
        this.app.ShowError(`${rej.message}`);
      });
    },500);
  };

  bloodGroups: any;

  LoadBloodGroups = () => {
    this.bloodGroups = this.common.propInfo.bloodgroups;
  };

  genders: any;

  LoadGenders = () => {
    this.genders = this.common.propInfo.genders;
  };

  relations: any;

  LoadRelations = () => {
    this.relations = this.common.propInfo.relations;
  };

  emergencyIDS: any = [];

  FetchEmergencyCards = () => {
    this.common.api.GetAllEmergencyCards(this.common.userInfo.userID).then((res: any) => {
      if(res.objret)
        this.emergencyIDS = res.objret;
        this.emergencyIDS.forEach((emergency: any) => {
          if(this.common.IsFile(emergency.profilepic))
            emergency['IsValidImage'] = true;
          else
            emergency['IsValidImage'] = false;
        });
    }).catch((rej: any) => {
      this.common.logger.error(rej);
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
    }).finally(() => {
      this.isLoading = false;
    });
  };

  txtSearch: any;
  txtPin: any;

  OnClickSearch = () => {
    if(this.txtSearch === undefined)
      this.txtSearch = '';
    if(this.txtPin === undefined)
      this.txtPin = '';

      if(this.txtSearch === ''){
        this.common.toaster.Error(`Please enter emergency id!`);
        return;
      }

      if(this.txtPin === ''){
        this.common.toaster.Error(`Please enter pin!`);
        return;
      }

    if(this.txtSearch === '' || this.txtPin === ''){
      // this.OnPageLoad();
      return;
    }
    else{
      this.ValidateEmergencyIdWithPin().then(() => {
        if(!this.common.auth_token)
          this.OpenOTPLogin();
        else
          this.SearchEmergencyCard();
      }).catch((rej: any) => {
        this.app.ShowError(rej.message);
      });


    }
  };

  ValidateEmergencyIdWithPin = () => {
    return new Promise((res: any, rej: any) => {
      var userId = undefined;
      if(!this.common.userInfo || !this.common.userInfo.userID)
        userId = undefined;
      else
        userId = this.common.userInfo.userID;

      this.app.ShowLoader();
      this.common.api.ValidateEmergencyNumberWithPIN(this.txtSearch, this.txtPin, userId).then((_res: any) => {
        this.app.HideLoader();
        res(_res);
      }).catch((_rej: any) => {
        this.app.HideLoader();
        rej(_rej);
      })
    });
  };

  GetEmergencyIdDetails = () => {
    return new Promise((res: any, rej: any) => {

      this.app.ShowLoader();

      var userInfo = {
        emidMobile: this.txtMobileNo,
        userOtp: this.txtOTP,
        emidNumber: this.txtSearch,
        emidPin:this.txtPin
      };

      this.common.api.GetEmidDetails(userInfo).then((resolve: any) => {
        res(resolve);
      }).catch((reject: any) => {
        rej(reject);
      });
    });
  };

  searchedEmergencyCard : any;
  isHideSearch: any = false;

  SearchEmergencyCard = () => {
    this.app.ShowLoader();

    var emidInfo = {
      EMID: this.txtSearch,
      Pin: this.txtPin
    };

    this.searchedEmergencyCard = undefined;

    this.common.api.SearchEmergencyCard(emidInfo, this.common.userInfo.userID).then((res: any) => {
      this.app.HideLoader();
      if(res.objret){
        this.searchedEmergencyCard = res.objret;

        console.warn(this.searchedEmergencyCard);

        if(!this.searchedEmergencyCard){
          this.app.ShowError(`No records found`);
          this.isHideSearch = false;
        }
        else{
          this.isHideSearch = true;
        }

        var cardInfo = {
          EMID: emidInfo.EMID,
          Enquired_by: this.common.userInfo.userID
        };

        this.common.api.UpdateEmergencyIDProfileVisitor(cardInfo, this.common.userInfo.userID);
      }
    }).catch((rej) => {
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
      this.app.ShowError(rej.message);
    });
  };
  OnClickPartnerWithUs = () => {
   
    this.router.navigate(['/info/partner-with-us']);
  };
  OnClickContactUs = () => {
   
    this.router.navigate(['/info/contact-us']);
  };
  OnClickAmbulance = () => {

    this.router.navigate(['/services/ambulance-service-india']);

  };
  OnImageUpload = (event: any) => {
    this.profileImage = [];
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
          const album = {
              src: reader.result,
              caption: reader.result,
              thumb: reader.result
          };
          this.profileImage = [];
          this.profileImage.push(album);
        }
        reader.readAsDataURL(file);
    }
  }

  @ViewChild('emidOtplogin') otpLoginModal: any;
  otpLoginModalRef: any;
  txtMobileNo: any;
  lblMobileNo: any;
  txtOTP: any;
  lblOTP: any;
  isOTPSent: any = false;

  OpenOTPLogin = () => {
    this.otpLoginModalRef = this.common.modal.OpenModal(this.otpLoginModal);
    this.otpLoginModalRef.result.finally(() => {
      this.ClearOTPLoginModal();
    });
  };

  CloseOTPLoginModal = () => {
    this.otpLoginModalRef.close();
  };

  ClearOTPLoginModal = () => {
    this.txtMobileNo = '';
    this.txtOTP = '';
    this.isOTPSent = false;
  };

  OnLoginControlsTextChanged = (model: any, event: any) => {
    if(model === 'txtMobileNo')
      this.lblMobileNo = undefined;
    if(model === 'txtOTP')
      this.lblOTP = undefined;
  };

  IsValidLogin = () => {
    if(this.txtMobileNo === undefined || this.txtMobileNo === ''){
      this.lblMobileNo = 'Please enter mobile number';
      return false;
    }

    if(!this.common.IsValid('mobile', this.txtMobileNo, this.regex)){
      this.lblMobileNo = this.regex['mobile'].message;
      return false;
    }

    return true;
  };

  OnClickSendOTP = () =>{
    return new Promise((res: any, rej: any) => {
      if(this.IsValidLogin()){
        this.app.ShowLoader();

        var userInfo = {
          userMobile: this.txtMobileNo
        };

        this.common.api.GetEmidOtp(userInfo).then((resolve: any) => {
          this.common.logger.info('USER SEND OTP >> SUCCESS');
          this.isOTPSent = true;
          this.txtOTP = '';
          this.app.ShowSuccess(`OTP sent successfully`).finally(() =>  this.app.HideLoader());
        }).catch((reject: any) => {
          this.common.logger.error('USER SEND OTP >> FAILED');
          this.isOTPSent = false;
          this.app.ShowError(reject.message).finally(() =>  this.app.HideLoader());
        });
      }
    });
  };

  OnClickValidateOTP = () =>{
    this.GetEmergencyIdDetails().then((res: any) => {
      this.app.HideLoader();
      this.searchedEmergencyCard = res.objret;
      if(!this.searchedEmergencyCard){
        this.app.ShowError(`No records found`);
        this.isHideSearch = false;
      }
      else{
        this.isHideSearch = true;
      }



    }).catch((rej: any) => {
      this.app.HideLoader();
      this.app.ShowError(rej.message);
    }).finally(() => {
      this.CloseOTPLoginModal();
    });
  };

  @ViewChild('createID') createIDModal: any;
  createIDModalRef: any;
  txtImage: any;
  txtName: any;
  lblName: any;
  txtDOB: any;
  lblDOB: any;
  txtGender: any;
  lblGender: any;
  txtBloodGroup: any;
  lblBloodGroup: any;
  txtPrimaryContactRelation: any;
  lblPrimaryContactRelation: any;
  txtPrimaryContactName: any;
  lblPrimaryContactName: any;
  txtPrimaryContactNo: any;
  lblPrimaryContactNo: any;
  txtSecondaryContactRelation: any;
  lblSecondaryContactRelation: any;
  txtSecondaryContactName: any;
  lblSecondaryContactName: any;
  txtSecondaryContactNo: any;
  lblSecondaryContactNo: any;
  txtInsuranceProvider: any;
  lblInsuranceProvider: any;
  txtInsurancePolicyNo: any;
  lblInsurancePolicyNo: any;
  lblInsuranceContactNo: any;
  txtInsuranceMedicalCondition: any;
  lblInsuranceMedicalCondition: any;
  txtInsuranceEmergencyDrugs: any;
  lblInsuranceEmergencyDrugs: any;

  txtAbhaNumber: any;
  lblAbhaNumber: any;

  chkOrganDonor: any;

  OnClickCreateID = () => {
    this.createIDModalRef = this.common.modal.OpenModal(this.createIDModal);
    this.createIDModalRef.result.finally(() => {
      this.ClearCreateIDModal();
    });
  };

  CloseCreateIDModal = () => {
    this.createIDModalRef.close();
  };

  ClearCreateIDModal = () => {
    this.txtImage = '';
    this.txtName = '';
    this.txtDOB = '';
    this.txtGender = '';
    this.txtBloodGroup = '';
    this.txtPrimaryContactRelation = '';
    this.txtPrimaryContactName = '';
    this.txtPrimaryContactNo = '';
    this.txtSecondaryContactRelation = '';
    this.txtSecondaryContactName = '';
    this.txtSecondaryContactNo = '';
    this.txtInsuranceProvider = '';
    this.txtInsurancePolicyNo = '';
    this.txtInsuranceMedicalCondition = '';
    this.txtInsuranceEmergencyDrugs = '';
    this.txtAbhaNumber='';
    this.chkOrganDonor = false;
    this.activeTabId = 1;
  };

  activeTabId: any = 1;

  OnClickBack = () => {
    if(this.activeTabId > 1)
      this.activeTabId = this.activeTabId - 1;
  };

  OnClickNext = () => {
    if(this.activeTabId === 1){
      if(this.IsValidCardDetails())
      {
        return this.activeTabId++;
      }
    }
    if(this.activeTabId === 2){
      if(this.IsValidPrimaryContactDetails())
      {
        return this.activeTabId++;
      }
    }
    if(this.activeTabId === 3){
      if(this.IsValidSecondaryContactDetails())
      {
        return this.activeTabId++;
      }
    }

    return;
  };

  OnClickSubmit = () => {
    if(this.IsValidInsuranceDetails()){
      this.app.ShowLoader();

      var cardInfo = {
        Pname:this.txtName,
        PDob:`${this.txtDOB.year}-${this.txtDOB.month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${this.txtDOB.day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
        Pbloodgroup:this.txtBloodGroup,
        PGender:this.txtGender,
        PcontName:this.txtPrimaryContactName,
        PcontMobile:this.txtPrimaryContactNo,
        PcontRelation:this.txtPrimaryContactRelation,
        ScontName:this.txtSecondaryContactName,
        ScontMobile:this.txtSecondaryContactNo,
        ScontRelation:this.txtSecondaryContactRelation,
        Insuranceprovider:this.txtInsuranceProvider,
        Policynumber:this.txtInsurancePolicyNo,
        Medicalcondition:this.txtInsuranceMedicalCondition,
        Abha:this.txtAbhaNumber,
        Organdoner:this.chkOrganDonor,

        File: this.profileImage[0]
      };

      this.common.api.AddEmergencyCard(cardInfo, this.common.userInfo.userID).then((res: any) => {
        this.app.HideLoader();
        this.CloseCreateIDModal();
        this.app.ShowSuccess(`Emergency ID generated successfully`).finally(() => {
          this.OnPageLoad();
        });
      }).catch((rej: any) => {
        this.common.logger.error(rej);
        this.app.HideLoader();
        this.CloseCreateIDModal();
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

  IsValidCardDetails = () => {
    if(!this.common.IsValid('short-string', this.txtName, this.regex)){
      this.lblName = this.regex['short-string'].message;
      return false;
    }

    let date = this.parserFormatter.format(this.txtDOB);
    if(!date || date.trim().length === 0){
      this.lblDOB = "Date of birth should not be empty";
      return false;
    }

    if(!this.txtBloodGroup || this.txtBloodGroup.trim().length === 0){
      this.lblBloodGroup = "Blood group should not be empty";
      return false;
    }

    if(!this.txtGender || this.txtGender.trim().length === 0){
      this.lblGender = "Gender should not be empty";
      return false;
    }

    return true;
  };

  IsValidPrimaryContactDetails = () => {


    if(!this.common.IsValid('short-string', this.txtPrimaryContactName, this.regex)){
      this.lblPrimaryContactName = this.regex['short-string'].message;
      return false;
    }

    if(!this.common.IsValid('mobile', this.txtPrimaryContactNo, this.regex)){
      this.lblPrimaryContactNo = this.regex['mobile'].message;
      return false;
    }

    return true;
  };

  IsValidSecondaryContactDetails = () => {


    if(!this.common.IsValid('short-string', this.txtSecondaryContactName, this.regex)){
      this.lblSecondaryContactName = this.regex['short-string'].message;
      return false;
    }

    if(!this.common.IsValid('mobile', this.txtSecondaryContactNo, this.regex)){
      this.lblSecondaryContactNo = this.regex['mobile'].message;
      return false;
    }

    return true;
  };

  IsValidInsuranceDetails = () => {


    if(!this.common.IsValid('string', this.txtInsuranceMedicalCondition, this.regex)){
      this.lblInsuranceMedicalCondition = this.regex['string'].message;
      return false;
    }

    return true;
  };

  OnTextChanged = (model: any, event: any) => {
    if(model === 'txtName')
      this.lblName = undefined;
    if(model === 'txtDOB')
      this.lblDOB = undefined;
    if(model === 'txtBloodGroup')
      this.lblBloodGroup = undefined;
    if(model === 'txtGender')
      this.lblGender= undefined;
    if(model === 'txtPrimaryContactRelation')
      this.lblPrimaryContactRelation = undefined;
    if(model === 'txtPrimaryContactNo')
      this.lblPrimaryContactNo = undefined;
    if(model === 'txtPrimaryContactName')
      this.lblPrimaryContactName = undefined;
    if(model === 'txtSecondaryContactRelation')
      this.lblSecondaryContactRelation = undefined;
    if(model === 'txtSecondaryContactNo')
      this.lblSecondaryContactNo = undefined;
    if(model === 'txtSecondaryContactName')
      this.lblSecondaryContactName = undefined;
    if(model === 'txtInsuranceMedicalCondition')
      this.lblInsuranceMedicalCondition = undefined;
    if(model === 'txtInsuranceEmergencyDrugs')
      this.lblInsuranceEmergencyDrugs = undefined;
    if(model === 'txtInsurancePolicyNo')
      this.lblInsurancePolicyNo = undefined;
    if(model === 'txtInsuranceProvider')
      this.lblInsuranceProvider = undefined;

      if(model === 'txtAbhanumber')
      this.lblAbhaNumber = undefined;


  };

  @ViewChild('screen') screen: any;
  @ViewChild('canvas') canvas: any;
  @ViewChild('downloadLink') downloadLink: any;

  OnDownloadCard = (emID: any) => {
    var element : any = document.getElementById(emID);
 

    html2canvas(this.screen.nativeElement,
      {
        allowTaint: true,
        logging: true,
        useCORS: true
      }).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      this.downloadLink.nativeElement.click();
    });

  };

  OnClickCall = (mobileNumber: any) => {
    // this.GetDonorMobile(id);
    var contacts = [{
      name: 'Contact Number',
      number: mobileNumber
    }];

    this.app.ShowContact(contacts);
  };

}
