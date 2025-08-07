import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbDateParserFormatter, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, OperatorFunction, Observable, debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import domtoimage from 'dom-to-image';
import { NgbDateCustomParserFormatter } from 'src/app/service/dateformat.service';
import * as moment from 'moment';
import jspdf from 'jspdf';
import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare var require: any;

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent {
   /** COMMON OBJECTS & VARIABLES */
    regex: any;
    device_type: any;
    maxDate: any;
    isCollapsedPersonalDetails: any = false;
    isCollapsedEmergencyCards: any = true;
    isCollapsedBloodDonors: any = true;
    emidPage: any;
    active = 1;
    emid: any;
    pin: any;
    isDivClicked = false;
  
    emID: any;
    userBloodGrp: any;
    profileID: any;
  
  
  
  
  
    /**
     * CONSTRUCTOR
     * @param router
     * @param common
     * @param parserFormatter
     * @param app
     */
    constructor(@Inject(DOCUMENT) public document: Document, private router: Router, private route: ActivatedRoute, public common: CommonService, private parserFormatter: NgbDateParserFormatter, public app: AppComponent, private http: HttpClient,) {
      this.common.modal.CloseAllModal();
      this.emidPage = `${window.location.protocol}//${window.location.host}/emid`;
    }
  
    isCurrentRoute(route: string): boolean {
      return this.router.url === route;
    }
  
    /**
     * ON PAGE INITIALIZED
     */
    ngOnInit(): void {
      // this.common.ValidateUser(this.router, this.app).then(() => {
      //   this.OnPageLoad();
  
      //   if (localStorage.getItem("emtext") === null) {
  
      //   } else {
      //     // this.OnClickCreateID();
      //     this.displayEmergencyForm();
  
      //   }
      // });
  
      this.userDataUrl = `https://vmedo.com/emid?id=` + this.emid + `&pin=` + this.pin;
  
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        // The event.url will give you the current route URL
        console.log('Current Route:', event.url);
      });

      this.LoadGenders();
      this.LoadBloodGroups();
      this.OnClickEmergencyCardStatus();
      this.LoadEmergencyCards();
    }
    // ------------------------------------------------------------------------------------
   areFieldsFilled(): boolean {
    return this.txtPrimaryContactName.trim() !== '';
  }
     FieldsFilled(): boolean {
      return this.txtInsuranceMedicalCondition.trim() !== '' ;
  
  
    }
  
    storedCardNumber: any;
  
  
  
  
  
    isDivOneClicked = false;
  
  
  
  
    showsecondaryguardians: boolean = false;
  
    togglesecondaryguardians() {
      this.showsecondaryguardians = !this.showsecondaryguardians;
      this.isDivClicked = true;
    }
  
    showsecondarymedicaldetails: boolean = false;
  
    togglesecondarymedicaldetails() {
      this.showsecondarymedicaldetails = !this.showsecondarymedicaldetails;
      this.isDivOneClicked = true;
    }
    // -----------------------------------------------------------------------------------
    userDataUrl: any;
  
    /**
     * ON PAGE LOAD
     */
    OnPageLoad = () => {
  
      this.app.ShowLoader();
  
      if (this.route.snapshot.paramMap.get('id')) {
        var id: any = this.route.snapshot.paramMap.get('id');
        this.active = parseInt(id);
      }
  
      setTimeout(() => {
        this.common.property.GetProperties().then((res: any) => {
          if (res)
            this.common.propInfo = res;
          this.device_type = this.common.GetDeviceType();
  
          if (this.device_type !== 'desktop') {
            this.isCollapsedEmergencyCards = true;
            this.isCollapsedBloodDonors = true;
          }
          else {
            this.isCollapsedEmergencyCards = false;
            this.isCollapsedBloodDonors = false;
          }
          this.regex = this.common.propInfo.regex;
          try {
            this.maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
            this.LoadBloodGroups();
            this.LoadGenders();
            this.LoadProfile().then((res: any) => {
              this.LoadDonorDetails();
              this.InitEmergencyCards();
            }).catch((rej: any) => {
              if (rej.message.toLowerCase().includes('invalid refresh token')) {
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
          catch (ex) {
            this.app.ShowError(ex);
          }
        }).catch((rej: any) => {
          this.app.ShowError(`${rej.message}`);
        });
      }, 500);
    };
  
    OnClickAbouts = () => {
  
      this.router.navigate(['/info/aboutus']);
    };
  
  
    bloodGroups: any = [];
  
    /**
     * FETCHING BLOOD GROUPS
     */
    LoadBloodGroups = () => {
      this.bloodGroups = this.common.propInfo.bloodgroups;
    };
  
    /**
     * FETCHING GENDERS
     */
    genders: any = [];
  
    LoadGenders = () => {
      this.genders = this.common.propInfo.genders;
    };
  
    emergencyIDs: any = [];
  
    /**
     * INITIALIZING EMERGENCY IDS
     */
    private InitEmergencyCards = () => {
      this.app.ShowLoader();
  
      this.LoadEmergencyCards().finally(() => {
        this.InitBloodDonations();
      });
  
    };
   
    /**
     * FETCHING EMERGENCY IDS
     * @returns emergencyIDs
     */
    LoadEmergencyCards = () => {
      this.emergencyIDs = [];
  
      return new Promise((_res: any, _rej: any) => {
        this.common.api.GetAllEmergencyCards(this.common.getUserId()).then((res: any) => {
          if (res.objret)
            this.emergencyIDs = res.objret;
  
          // console details
          console.log(this.emergencyIDs);
  
  
          this.emergencyIDs.forEach((element: any) => {
            element.emidUrl = `${this.emidPage}?id=${element.emid}&pin=${element.pin}`;
            this.emid = element.emid;
  
            this.userDataUrl = `https://vmedo.com/emid?id=` + element.emid + `&pin=` + element.pin;
            this.common.api.GetEmergencyIDProfileVisitor(element.emID, this.common.userInfo.userID).then((res: any) => {
              if (res.objret && res.objret.length > 0) {
                element.visitors = res.objret;
              }
              else {
                element.visitors = [];
              }
            }).catch((rej: any) => {
              element.visitors = [];
            });
          });
          _res();
        }).catch((rej) => {
          _rej(rej);
        });
      });
    };
  
  
  
  
    OnClickCount = (emID: any) => {
  
      let populatedFields = {};
      let totalFields = 0;
      let completionPercentage = 0;
  
      // Helper function to check if a field is populated and add it to the populatedFields object
      const checkAndAddField = (fieldName, fieldValue) => {
        if (fieldValue !== null && fieldValue !== undefined && fieldValue !== '') {
          populatedFields[fieldName] = fieldValue;
          totalFields++;
        }
      };
  
      // Check and add each field
  
      checkAndAddField('CardName', emID.pname);
      checkAndAddField('MemberContactNo', emID.emobile);
      checkAndAddField('CardDOB', emID.pDob);
      checkAndAddField('CardBloodGroup', emID.pbloodgroup);
      checkAndAddField('CardGender', emID.pGender);
      checkAndAddField('PrimaryContactName', emID.pcontName);
      checkAndAddField('PrimaryContactNo', emID.pcontMobile);
  
      checkAndAddField('SecondaryContactName', emID.scontName);
      checkAndAddField('SecondaryContactNo', emID.scontMobile);
  
      checkAndAddField('InsuranceProvider', emID.insuranceprovider);
      checkAndAddField('InsurancePolicyNo', emID.policynumber);
      checkAndAddField('InsuranceMedicalCondition', emID.medicalcondition);
      checkAndAddField('InsuranceEmergencyDrugs', emID.emergencydrug);
      checkAndAddField('PostalAddress', emID.eaddress);
      checkAndAddField('PostalPincode', emID.epostalcode);
      checkAndAddField('EhouseNo', emID.ehouseNo);
      checkAndAddField('Ecity', emID.ecity);
      checkAndAddField('Estate', emID.estate);
      checkAndAddField('AbhaNumber', emID.abha);
  
  
      // Now you have the populated fields in the 'populatedFields' object
      // and the total number of populated fields in the 'totalFields' variable
  
  
      this.totalFields2 = totalFields;
      this.completionPercentage = Math.round((totalFields / 19) * 100);
  
      return this.completionPercentage;
  
    };
  
  
    totalFields2: any;
    completionPercentage: any;
  
    displayEmergencyForm = () => {
  
      this.emergencyIDs = [];
  
      return new Promise((_res: any, _rej: any) => {
        this.common.api.GetAllEmergencyCards(this.common.userInfo.userID).then((res: any) => {
          if (res.objret)
            this.emergencyIDs = res.objret;
  
          // console details
          console.log(this.emergencyIDs);
  
          if (this.emergencyIDs.length >= 5) {
  
            this.CloseCreateIDModal();
  
          }
  
          else {
            this.OnClickCreateID();
          }
        });
  
      });
    };
  
  
  
    donorDetails: any;
  
    /**
     * FETCHING DONOR DETAILS
     * @returns donorDetails
     */
    LoadDonorDetails = () => {
      return new Promise((_res: any, _rej: any) => {
        this.common.api.GetDonorDetails(this.common.userInfo.userID).then((res: any) => {
          if (res.objret)
            this.donorDetails = res.objret;
          this.IsDonorAvailable = this.donorDetails.bStatus;
          this.txtDonorBloodGroup = this.donorDetails.bGroup;
          this.txtDonorLocation = this.donorDetails.blocation;
          _res();
        }).catch((rej) => {
          _rej(rej);
        });
      });
    };
  
    donations: any = [];
  
    /**
     * INITIALIZING BLOOD DONATIONS
     */
    private InitBloodDonations = () => {
      this.app.ShowLoader();
  
      this.LoadDonations().finally(() => {
        this.app.HideLoader();
      });
    };
  
    /**
     * FETCHING BLOOD DONATIONS
     * @returns donations
     */
    LoadDonations = () => {
      this.donations = [];
      return new Promise((_res: any, _rej: any) => {
        this.common.api.GetAllDonations(this.common.userInfo.userID).then((res: any) => {
          if (this.common.donor_location === undefined || this.common.donor_location === '') {
            if (res.objret)
              this.donations = res.objret;
          }
          else {
            if (res.objret)
              this.donations = res.objret;
            this.donations = this.donations.filter((s: any) => s.location === this.common.donor_location);
            if (this.donations.length === 0) {
              this.app.ShowError(`No donors found for location ${location}`);
              this.donations = res.objret;
            }
          }
  
          _res();
        }).catch((rej: any) => {
          _rej(rej);
        });
  
      });
    };
  
    selectedDonation: any;
  
    OnEditDonation = (donation: any) => {
      this.selectedDonation = donation;
      this.txtDonationDate = this.parserFormatter.parse(moment(donation.donated_on.split('T')[0], 'YYYY-MM-DD').format('DD-MM-YYYY'));
      this.txtDonationComments = donation.description;
      this.txtDonationLocation = donation.location;
      this.OnClickNewBloodDonation(true);
    };
  
    OnDeleteDonation = (donation: any) => {
      var donationInfo = {
        ID: donation.id
      };
  
      this.app.ShowWarn('Are you sure to delete this donation!').then((res: any) => {
        this.app.ShowLoader();
        this.common.api.DeleteDonation(donationInfo, this.common.userInfo.userID).then((res: any) => {
          this.app.HideLoader();
          this.app.ShowSuccess('Donation deleted successfully').finally(() => {
            this.OnPageLoad();
          });
        }).catch((rej: any) => {
          this.app.HideLoader();
          this.app.ShowError(rej.message);
        });
      });
  
    };
  
    profileInfo: any;
    IsDonorAvailable: any = false;
    txtisPaidMember: any;
    txtpackageName: any;
    txtpackagevalid_till: any;
  
    /**
     * LOADING PROFILE
     * @returns
     */
    LoadProfile = () => {
      return new Promise((_res: any, _rej: any) => {
        this.common.api.GetUserProfile(this.common.userInfo.userID).then((res: any) => {
          if (res.objret) {
            this.profileInfo = res.objret;
            this.txtName = res.objret.userName;
            this.txtPhone = res.objret.userMobile;
            this.txtEmail = res.objret.userEmail;
            this.txtisPaidMember = res.objret.isPaidMember;
            this.txtpackageName = res.objret.packageName;
            this.txtpackagevalid_till = res.objret.packagevalid_till;
            this.txtGender = res.objret.profileGender === null ? '' : res.objret.profileGender;
            this.chkBloodDonor = res.objret.isDoner === 'NO' ? false : true;
  
            this.txtuserBloodGrp = res.objret.bloodDoner === null ? '' : res.objret.bloodDoner;
  
            if (this.common.IsFile(res.objret.profilePhoto)) {
              const album = {
                src: res.objret.profilePhoto
              };
              this.profileImage.push(album);
            }
            if (res.objret.profileDOB.toString() !== '0001-01-01T00:00:00')
              this.txtDOB = this.common.StringToDate(res.objret.profileDOB.toString().split('T')[0]);
            this.GetBloodGroup(res.objret.userName).then((res: any) => this.profileInfo.bloodgroup = res);
          }
          else
            this.app.ShowError('No records found');
          _res();
        }).catch((rej: any) => {
          _rej(rej);
        });
      });
    };
  
    OnClickVerifyEmail = () => {
      this.app.ShowLoader();
  
      this.common.api.VerifyEmailId(this.common.userInfo.userID).then((res: any) => {
        this.app.HideLoader();
        this.app.ShowSuccess(`A verification link sent to your mail, please check your inbox !`);
      }).catch((rej: any) => {
        this.app.HideLoader();
        this.app.ShowError(rej.message);
      });
    };
  
    // view emergency card
  
  
    OnClickViewEmergencyCard = (emID: any) => {
  
      localStorage.setItem('edittxtCardNumber', emID.emid);
      localStorage.setItem('id', emID.id);
  
      this.profileID = emID.id;
      this.txtCardNumber = emID.emid;
      this.txtCardName = emID.pname;
      this.txtMemberContactNo = emID.emobile;
      this.txtCardDOB = this.parserFormatter.parse(moment(emID.pDob.split('T')[0], 'YYYY-MM-DD').format('DD-MM-YYYY'));
      this.txtCardBloodGroup = emID.pbloodgroup;
      this.txtCardGender = emID.pGender;
      this.txtPrimaryContactName = emID.pcontName;
      this.txtPrimaryContactNo = emID.pcontMobile;
      this.txtPrimaryContactRelation = emID.pcontRelation;
      this.txtSecondaryContactName = emID.scontName;
      this.txtSecondaryContactNo = emID.scontMobile;
      this.txtSecondaryContactRelation = emID.scontRelation;
      this.txtInsuranceProvider = emID.insuranceprovider;
      this.txtInsurancePolicyNo = emID.policynumber;
      this.txtInsuranceMedicalCondition = emID.medicalcondition;
      this.txtInsuranceEmergencyDrugs = emID.emergencydrug;
      this.txtPostalAddress = emID.eaddress;
      this.txtPostalPincode = emID.epostalcode;
  
      this.txtEhouseNo = emID.ehouseNo;
      this.txtEcity = emID.ecity;
      this.txtEstate = emID.estate;
  
      this.txtAbhaNumber = emID.abha;
      this.chkOrganDonor = emID.organdoner;
      if (this.common.IsFile(emID.profilepic))
        this.cardProfileImage = [
          {
            src: emID.profilepic
          }
        ];
  
      this.IsCardAvailable = true;
  
      this.OpenviewProfileDetailsModal();
      this.OnClickCount(emID);
  
      //this.OpenCreateIDModal();
    };
  
  
  
    //view emergency card
  
  
    IsEmergencyEntityEdit: any = false;
  
  
  
  
    EMIDProfileVisitors: any = [];
    OnClickTotalVisitors = (emID: any) => {
      // if(emID.visitors.length === 0)
      //   return;
      this.OpenEMIDProfileVisitorModal();
      this.EMIDProfileVisitors = emID.visitors;
      this.EMIDProfileVisitors.forEach((visitor: any) => {
        visitor.visited_on = moment(visitor.visited_on).format('DD-MM-YYYY hh:mm A');
      });
  
    };
  
  
    @ViewChild('viewProfileDetails') viewProfileDetailsModal: any;
    viewProfileDetailsModalRef: any;
  
    OnClickOpenviewProfileDetailsModal = () => {
      this.OpenviewProfileDetailsModal();
      this.CloseCreateEditIDModal();
    };
  
    OpenviewProfileDetailsModal = () => {
      this.viewProfileDetailsModalRef = this.common.modal.OpenModal(this.viewProfileDetailsModal);
      this.viewProfileDetailsModalRef.result.finally(() => {
      });
    };
  
    CloseviewProfileDetailsModal = () => {
      this.viewProfileDetailsModalRef.close();
    };
  
  
  
    @ViewChild('emidVisitors') emidVisitorsModal: any;
    emidVisitorsModalRef: any;
  
    OpenEMIDProfileVisitorModal = () => {
      this.emidVisitorsModalRef = this.common.modal.OpenModal(this.emidVisitorsModal);
      this.emidVisitorsModalRef.result.finally(() => {
      });
    };
  
    CloseEMIDProfileVisitorModal = () => {
      this.emidVisitorsModalRef.close();
    };
  
    GetBloodGroup = (userName: any) => {
      return new Promise((res: any) => {
        var bgroup = '';
  
        this.common.api.GetAllDonors(this.common.userInfo.userID).then((res: any) => {
          if (res.objret) {
            var donor = res.objret.find((s: any) => s.name === userName);
            if (donor)
              bgroup = donor.bloodgroup;
            res(bgroup);
          }
        }).catch((rej: any) => {
          res(bgroup);
        });
      });
  
    };
  
    @ViewChild('screen') screen: any;
    @ViewChild('canvas') canvas: any;
    @ViewChild('downloadLink') downloadLink: any;
  
    GetContentData = (id: any) => {
      return new Promise((res: any, rej: any) => {
        var element: any = this.document.getElementById(id);
        if (!element)
          rej(`No element found with id ${id}`);
  
        var scale = 1.5;
  
        const style = {
          transform: 'scale(' + scale + ')',
          transformOrigin: 'top left',
          width: element.offsetWidth + "px",
          height: element.offsetHeight + "px"
        };
  
        const param = {
          height: element.offsetHeight * scale,
          width: element.offsetWidth * scale,
          quality: 1,
          style
        };
  
        try {
          domtoimage.toBlob(element, param).then(function (blob) {
            var a = new FileReader();
            a.onload = function (e: any) {
              const contentDataURL = e.target.result;
              res(contentDataURL);
            }
            a.readAsDataURL(blob);
          });
        }
        catch (ex) {
          rej(ex);
        }
      });
    };
  
    OnClickEmidUrl = (emID: any, pin: any) => {
  
      this.router.navigate(['/emid'], { queryParams: { id: emID, pin: pin } });
    };
  
    OnClickDownloadEmergencyCard = (emID: any) => {
  
  
      var imgHeight = 65;
      var imgWidth = 105;
  
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 10;
  
      this.GetContentData(emID).then((res: any) => {
        pdf.addImage(res, 'PNG', 10, position, imgWidth, imgHeight, 'alias1');
        this.GetContentData(`${emID}-sac`).then((_res: any) => {
          pdf.addImage(_res, 'PNG', 10, (position + imgHeight) + 10, imgWidth, imgHeight, 'alias2');
        }).catch((_rej: any) => {
          console.error(_rej);
        }).finally(() => {
          pdf.save(`${emID}.pdf`);
        });
      }).catch((rej: any) => {
        console.error(rej);
      });
    };
  
  
  
  
    txtName: any;
    lblName: any;
    txtEmail: any;
    lblEmail: any;
    txtPhone: any;
    lblPhone: any;
    txtDOB: any;
    lblDOB: any;
    txtGender: any;
    lblGender: any;
    txtuserBloodGrp: any;
    lbluserBloodGrp: any;
    txtBloodGroup: any;
    lblBloodGroup: any;
    chkBloodDonor: any = false;
    profileImage: any = [];
    hideEmergencyIds: boolean = false;
  
  
    OnProfileImageUpload = (event: any) => {
      this.profileImage = [];
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        console.log(`Image size before compressed: ${file.size} bytes.`)
  
        this.app.ShowLoader();
  
        this.common.imgCompressor.compress(file, 100).then((res: any) => {
          console.log(`Image size after compressed: ${res.size} bytes.`);
  
          const reader = new FileReader();
          reader.onload = e => {
            const album = {
              src: reader.result,
              caption: reader.result,
              thumb: reader.result,
              file: res
            };
            this.profileImage = [];
            this.profileImage.push(album);
            this.app.HideLoader();
          }
          reader.readAsDataURL(res);
  
        }).catch((rej: any) => {
          this.app.HideLoader();
        });
      }
    }
  
    IsValidProfile = () => {
      if (this.txtName === undefined && this.txtName === '') {
        this.lblName = "Please enter a valid name !";
        var ele = this.document.getElementById('tot');
  
        return false;
      }
  
      if (!this.common.IsValid('short-string', this.txtName, this.regex)) {
        this.lblName = this.regex['short-string'].message;
        return false;
      }
  
      if (this.txtEmail === undefined && this.txtEmail === '') {
        this.lblEmail = "Please enter a valid email !";
        return false;
      }
  
      if (!this.common.IsValid('email', this.txtEmail, this.regex)) {
        this.lblEmail = this.regex['email'].message;
        return false;
      }
  
      if (this.txtPhone === undefined && this.txtPhone === '') {
        this.lblPhone = "Please enter a valid phone number !";
        return false;
      }
  
      if (!this.common.IsValid('mobile', this.txtPhone, this.regex)) {
        this.lblPhone = this.regex['mobile'].message;
        return false;
      }
  
      if (this.txtDOB === undefined && this.txtDOB === '') {
        this.lblDOB = "Please enter a valid date of birth !";
        return false;
      }
  
      if (this.txtGender === undefined && this.txtGender === '') {
        this.lblGender = "Please enter a valid gender !";
        return false;
      }
  
      if (this.txtuserBloodGrp === undefined && this.txtuserBloodGrp === '') {
        this.lbluserBloodGrp = "Please enter a valid blood group !";
        return false;
      }
  
      if (this.txtBloodGroup === undefined && this.txtBloodGroup === '') {
        this.lblBloodGroup = "Please enter a valid blood group !";
        return false;
      }
  
      return true;
    };
  
    OnTextChanged = (model: any, event: any) => {
      if (model === 'txtName')
        this.lblName = undefined;
      if (model === 'txtEmail')
        this.lblEmail = undefined;
      if (model === 'txtPhone')
        this.lblPhone = undefined;
      if (model === 'txtDOB')
        this.lblDOB = undefined;
      if (model === 'txtGender')
        this.lblGender = undefined;
      if (model === 'txtBloodGroup')
        this.lblBloodGroup = undefined;
      if (model === 'txtuserBloodGrp')
        this.lbluserBloodGrp = undefined;
      if (model === 'txtCardNumber')
        this.lblCardNumber = undefined;
      if (model === 'txtCardName')
        this.lblCardName = undefined;
  
      if (model === 'txtMemberContactNo')
        this.lblMemberContactNo = undefined;
  
  
      if (model === 'txtCardDOB')
        this.lblCardDOB = undefined;
      if (model === 'txtCardBloodGroup')
        this.lblCardBloodGroup = undefined;
      if (model === 'txtCardGender')
        this.lblCardGender = undefined;
      if (model === 'txtPrimaryContactRelation')
        this.lblPrimaryContactRelation = undefined;
      if (model === 'txtPrimaryContactNo')
        this.lblPrimaryContactNo = undefined;
      if (model === 'txtPrimaryContactName')
        this.lblPrimaryContactName = undefined;
      if (model === 'txtSecondaryContactRelation')
        this.lblSecondaryContactRelation = undefined;
      if (model === 'txtSecondaryContactNo')
        this.lblSecondaryContactNo = undefined;
      if (model === 'txtSecondaryContactName')
        this.lblSecondaryContactName = undefined;
      if (model === 'txtInsuranceMedicalCondition')
        this.lblInsuranceMedicalCondition = undefined;
      if (model === 'txtInsuranceEmergencyDrugs')
        this.lblInsuranceEmergencyDrugs = undefined;
      if (model === 'txtInsurancePolicyNo')
        this.lblInsurancePolicyNo = undefined;
      if (model === 'txtInsuranceProvider')
        this.lblInsuranceProvider = undefined;
  
      if (model === 'txtDonationDate')
        this.lblDonationDate = undefined;
      if (model === 'txtDonationComments')
        this.lblDonationComments = undefined;
      if (model === 'txtDonationLocation')
        this.lblDonationLocation = undefined;
  
  
      if (model === 'txtDonorDOB')
        this.lblDonorDOB = undefined;
      if (model === 'txtDonorPINCode')
        this.lblDonorPINCode = undefined;
      if (model === 'txtDonorLocation')
        this.lblDonorLocation = undefined;
      if (model === 'txtDonorBloodGroup')
        this.lblDonorBloodGroup = undefined;
  
      if (model === 'txtPostalAddress')
        this.lblPostalAddress = undefined;
  
      if (model === 'txtPostalPincode')
        this.lblPostalPincode = undefined;
  
      if (model === 'txtAbhaNumber')
        this.lblAbhaNumber = undefined;
  
      if (model === 'txtEhouseNo')
        this.lblEhouseNo = undefined;
  
      if (model === 'txtEcity')
        this.lblEcity = undefined;
  
      if (model === 'txtEstate')
        this.lblEstate = undefined;
  
  
  
    };
  
    OnClickUpdate = () => {
      if (this.IsValidProfile()) {
        var userInfo = {
          MyObj: {
            UserID: this.common.userInfo.userID,
            userName: this.txtName,
            userMobile: this.txtPhone,
            userEmail: this.txtEmail,
            profileGender: this.txtGender,
            bloodDoner: this.txtuserBloodGrp,
            profileDOB: `${this.txtDOB.year}-${this.txtDOB.month.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-${this.txtDOB.day.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`
  
          },
          FILE: this.profileImage.length > 0 ? this.profileImage[0] : ''
        };
  
        this.app.ShowLoader();
        this.common.api.UpdateUserProfile(userInfo).then(() => {
          this.app.HideLoader();
          this.app.ShowSuccess(`Profile updated successfully`);
        }).catch((rej) => {
          this.app.HideLoader();
          this.app.ShowError(`${rej.message}`);
        });
      }
    };
  
    OnChangeDonorAvailability = () => {
      this.app.ShowLoader();
  
      var userInfo = {
        UserID: this.common.userInfo.userID,
        Astatus: this.IsDonorAvailable
      };
  
      this.common.api.UpdateBloodDonationStatus(userInfo).then((res: any) => {
        this.app.HideLoader();
        this.app.ShowSuccess(res.message);
        this.LoadDonorDetails();
      }).catch((rej: any) => {
        this.app.HideLoader();
        this.app.ShowError(rej.message);
      });
    };
  
    cardProfileImage: any = [];
  
    OnCardProfileImageUpload = (event: any) => {
      this.cardProfileImage = [];
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
          const album = {
            src: reader.result,
            caption: reader.result,
            thumb: reader.result,
            file: file
          };
          this.cardProfileImage = [];
          this.cardProfileImage.push(album);
        }
        reader.readAsDataURL(file);
      }
    }
  
  
  
  
    OnClickValidate = () => {
      if (!this.txtCardNumber || this.txtCardNumber === '') {
        this.lblCardNumber = `Please enter valid emergency id!`;
        this.IsCardAvailable = false;
        return;
      }
  
      if (this.IsEmergencyEntityEdit) {
        this.IsCardAvailable = true;
        return;
      }
  
      this.app.ShowLoader();
      this.common.api.ValidateEmergencyNumber(this.txtCardNumber, this.common.userInfo.userID).then((res: any) => {
        this.app.HideLoader();
        this.IsCardAvailable = true;
        this.lblCardNumber = `Emergency id available`;
      }).catch((rej: any) => {
        this.app.HideLoader();
        this.IsCardAvailable = false;
        this.lblCardNumber = rej.message;
      })
    };
  
  
  
  
  
  
    OnClickBack = () => {
      if (this.activeTabId > 1)
        this.activeTabId = this.activeTabId - 1;
    };
  
  
  
    activeTabId: any;
  
    OnClickoneNext(txtCardNumber): void {
  
      this.activeTabId = 1;
  
  
      this.OnClickEditEmergencyCard(txtCardNumber);
  
    }
  
    OnClicktwoNext(txtCardNumber): void {
  
      this.activeTabId = 2;
      this.OnClickEditEmergencyCard(txtCardNumber);
  
    }
    OnClickthreeNext(txtCardNumber): void {
  
      this.activeTabId = 3;
      this.OnClickEditEmergencyCard(txtCardNumber);
  
    }
    OnClickfourNext(txtCardNumber): void {
  
      this.activeTabId = 4;
      this.OnClickEditEmergencyCard(txtCardNumber);
  
    }
  
  
    OnClickNext = () => {
      if (this.activeTabId === 1) {
        if (this.IsValidCardDetails()) {
          return this.activeTabId++;
        }
      }
      if (this.activeTabId === 2) {
        if (this.IsValidPrimaryContactDetails()) {
          return this.activeTabId++;
        }
      }
     
  
      if (this.activeTabId === 3) {
        if (this.IsValidPostalDetails()) {
          return this.activeTabId++;
        }
      }
  
  
  
      return;
    };
  
  
  
    IsValidCardDetails = () => {
  
  
      if(!this.common.IsValid('short-string2', this.txtCardName, this.regex)){
        this.lblCardName = this.regex['short-string2'].message;
        return false;
      }
  
      if(!this.common.IsValid('mobile', this.txtMemberContactNo, this.regex)){
        this.lblMemberContactNo = this.regex['mobile'].message;
        return false;
      }
  
      let date = this.parserFormatter.format(this.txtCardDOB);
      if(!date || date.trim().length === 0){
        this.lblCardDOB = "Date of birth should not be empty";
        return false;
      }
  
      if(!this.txtCardBloodGroup || this.txtCardBloodGroup.trim().length === 0){
        this.lblCardBloodGroup = "Blood group should not be empty";
        return false;
      }
  
      if(!this.txtCardGender || this.txtCardGender.trim().length === 0){
        this.lblCardGender = "Gender should not be empty";
        return false;
      }
  
      return true;
    };
  
    IsValidPrimaryContactDetails = () => {
   
  
  
      return true;
    };
  
    IsValidPostalDetails = () => {
  
  
  
      return true;
    };
  
  
    IsValidSecondaryContactDetails = () => {
  
  
      return true;
    };
  
    IsValidInsuranceDetails = () => {
  
  
      return true;
    };
  
    @ViewChild('donation') donationModal: any;
    donationModalRef: any;
  
    txtDonationDate: any;
    lblDonationDate: any;
    txtDonationComments: any;
    lblDonationComments: any;
    txtDonationLocation: any;
    lblDonationLocation: any;
    isDonationEdit: any = false;
    locations: any = [];
    searchedLocations: any = [];
  
    @ViewChild('instance', { static: false }) instance!: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();
  
  
  
    search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((searchText) => this.common.api.GetLocations(searchText)),
  
      )
  
  
    OnKeyDownSearchLocation = (searchInput: any) => {
      this.common.api.GetLocationsByName(searchInput).then((res: any) => {
        if (res && res.objrt && res.objrt.predictions && res.objrt.predictions.length > 0) {
          this.searchedLocations = res.objrt.predictions;
          this.locations = this.searchedLocations.map((s: any) => s.description);
        }
      });
    };
  
    OnClickNewBloodDonation = (isEdit: any) => {
      this.isDonationEdit = isEdit;
      this.donationModalRef = this.common.modal.OpenModal(this.donationModal);
      this.donationModalRef.result.finally(() => {
        this.ClearDonationModal();
      });
    };
  
    CloseDonationModal = () => {
      this.donationModalRef.close();
    };
  
    ClearDonationModal = () => {
      this.txtDonationDate = '';
      this.txtDonationComments = '';
      this.txtDonationLocation = '';
      this.isDonationEdit = false;
      this.selectedDonation = undefined;
      this.chkBloodDonor = this.profileInfo.isDoner === 'NO' ? false : true;
    };
  
    IsValidDonation = () => {
      let date = this.parserFormatter.format(this.txtDonationDate);
      if (!date || date.trim() === '') {
        this.lblDonationDate = "Date should not be empty";
        return false;
      }
  
      if (!this.txtDonationLocation || this.txtDonationLocation.trim().length === 0) {
        this.lblDonationLocation = "Location should not be empty";
        return false;
      }
  
      return true;
    };
  
    OnClickSubmitNewBloodDonation = () => {
      if (this.IsValidDonation()) {
  
        if (!this.isDonationEdit) {
  
          this.app.ShowLoader();
  
          var _donationInfo = {
            Donated_on: `${this.txtDonationDate.year}-${this.txtDonationDate.month.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-${this.txtDonationDate.day.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`,
            Description: this.txtDonationComments,
            Location: this.txtDonationLocation
          };
  
          this.common.api.AddDonation(_donationInfo, this.common.userInfo.userID).then((res: any) => {
            this.CloseDonationModal();
            this.app.HideLoader();
            this.app.ShowSuccess('Donation added successfully').finally(() => {
              this.OnPageLoad();
            });
          }).catch((rej: any) => {
            this.CloseDonationModal();
            this.app.HideLoader();
            this.common.logger.error(rej);
            this.app.ShowError(`${rej.message}`).finally(() => {
              this.OnPageLoad();
            });
          });
        }
        else {
  
          this.app.ShowLoader();
  
          var donationInfo = {
            ID: this.selectedDonation.id,
            Donated_on: `${this.txtDonationDate.year}-${this.txtDonationDate.month.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-${this.txtDonationDate.day.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`,
            Description: this.txtDonationComments,
            Location: this.txtDonationLocation
          };
  
          this.common.api.EditDonation(donationInfo, this.common.userInfo.userID).then((res: any) => {
            this.CloseDonationModal();
            this.app.HideLoader();
            this.app.ShowSuccess('Donation updated successfully').finally(() => {
              this.OnPageLoad();
            });
          }).catch((rej: any) => {
            this.CloseDonationModal();
            this.app.HideLoader();
            this.common.logger.error(rej);
            this.app.ShowError(`${rej.message}`).finally(() => {
              this.OnPageLoad();
            });
          });
  
        }
      }
    };
  
    searchDonorLocations: any = [];
    searchedDonorLocations: any = [];
  
  
  
    searchLocation: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
      return text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((searchText) => this.common.api.GetLocations(searchText)),
  
      )
    };
  
  
    OnKeyDownDonorLocation = (searchInput: any, event: any) => {
      // this.app.ShowLoader(true);
      this.common.api.GetLocationsByName(searchInput).then((res: any) => {
        // this.app.HideLoader(true);
        if (res && res.objrt && res.objrt.predictions && res.objrt.predictions.length > 0) {
          this.searchedDonorLocations = res.objrt.predictions;
          this.searchDonorLocations = this.searchedDonorLocations.map((s: any) => s.description);
          this.focus$.next(event.target.value);
          this.click$.next(event.target.value);
        }
      }).catch((rej: any) => {
        // this.app.HideLoader(true);
      });
    };
  
    selectedLongitude: any;
    selectedLattitude: any;
  
    OnSelectDonorLocation = (location: any) => {
      this.selectedLocation = location;
      this.app.HideLoader(true);
  
      var selectedLocation = this.searchedDonorLocations.find((s: any) => s.description === location);
      if (!selectedLocation)
        return;
  
      this.common.api.GetLocationsByPlaceId(selectedLocation.place_id).then((res: any) => {
        if (res.objret && res.objret.result) {
          var postalCode = res.objret.result.address_components.find((s1: any) => s1.types.includes('postal_code'));
          if (postalCode) {
            this.txtDonorPINCode = postalCode.long_name;
          }
  
          if (res.objret.result.geometry && res.objret.result.geometry.location) {
            this.selectedLattitude = res.objret.result.geometry.location.lat;
            this.selectedLongitude = res.objret.result.geometry.location.lng;
          }
        }
      });
    };
  
    @ViewChild('registerAsDonor') registerModal: any;
    registerModalRef: any;
  
    txtDonorDOB: any;
    lblDonorDOB: any;
    txtDonorPINCode: any;
    lblDonorPINCode: any;
    txtDonorLocation: any;
    lblDonorLocation: any;
    txtDonorBloodGroup: any;
    lblDonorBloodGroup: any;
    donorEntityType: any = 'add';
  
    OnClickRegisterAsDonor = () => {
      this.OpenDonorRegisterModal();
    };
  
    OnClickUpdateDonor = () => {
      this.donorEntityType = 'edit';
      this.IsDonorAvailable = this.donorDetails.bStatus;
      this.txtDonorBloodGroup = this.donorDetails.bGroup;
      this.txtDonorLocation = this.donorDetails.blocation;
      this.txtDonorDOB = this.txtDOB;
      this.OpenDonorRegisterModal();
    };
  
    OpenDonorRegisterModal = () => {
      this.registerModalRef = this.common.modal.OpenModal(this.registerModal);
      this.registerModalRef.result.then((res: any) => {
        if (res !== 'Cancel') {
          this.app.ShowSuccess(`Donor details ${this.donorEntityType === 'edit' ? 'updated' : 'added'} successfully`).finally(() => {
            this.OnPageLoad();
          });
        }
      }).finally(() => {
        this.ClearDonorRegisterModal();
      });
    };
  
    CloseDonorRegisterModal = () => {
      this.registerModalRef.close();
    };
  
    ClearDonorRegisterModal = () => {
      this.txtDonorDOB = '';
      this.txtDonorLocation = '';
      this.txtDonorPINCode = '';
      this.txtDonorBloodGroup = '';
      this.donorEntityType = 'edit';
      this.chkBloodDonor = this.profileInfo.isDoner === 'NO' ? false : true;
    };
  
    IsValidDonor = () => {
  
   
  
      if (!this.txtDonorLocation || this.txtDonorLocation.trim().length === 0) {
        this.lblDonorLocation = "Please enter location!";
        return false;
      }
  
      if (!this.txtDonorBloodGroup || this.txtDonorBloodGroup.trim().length === 0) {
        this.lblDonorBloodGroup = "Please enter blood group!";
        return false;
      }
  
      return true;
    };
  
    GetDonorLocation = () => {
      return new Promise((dres: any, drej: any) => {
        if (this.selectedLattitude === undefined)
          this.selectedLattitude = '';
        if (this.selectedLongitude === undefined)
          this.selectedLongitude = '';
  
    
        this.common.api.GetLocationsByName(this.txtDonorLocation).then((res: any) => {
          if (res && res.objrt && res.objrt.predictions && res.objrt.predictions.length > 0) {
  
            this.searchedDonorLocations = res.objrt.predictions;
            this.searchDonorLocations = this.searchedDonorLocations.map((s: any) => s.description);
  
            var selectedLocation = this.searchedDonorLocations.find((s: any) => s.description.toUpperCase().includes(this.txtDonorLocation.toUpperCase()));
            if (!selectedLocation)
              drej();
            else {
              this.common.api.GetLocationsByPlaceId(selectedLocation.place_id).then((res: any) => {
                if (res.objret && res.objret.result) {
                  var postalCode = res.objret.result.address_components.find((s1: any) => s1.types.includes('postal_code'));
                  if (postalCode) {
                    this.txtDonorPINCode = postalCode.long_name;
                  }
  
                  if (res.objret.result.geometry && res.objret.result.geometry.location) {
                    var obj = {
                      lattitude: res.objret.result.geometry.location.lat,
                      longitude: res.objret.result.geometry.location.lng
                    };
  
                    dres(obj);
                  }
                  else {
                    drej();
                  }
                }
                else {
                  drej();
                }
              });
            }
  
          }
          else {
            drej();
          }
        });
        // }
      });
    }
  
    OnClickRegisterDonor = () => {
      try {
  
        if (!this.txtDOB) {
          this.app.ShowError(`Please update your birth date in your profile section !`);
          return;
        }
  
        if (this.IsValidDonor()) {
          this.app.ShowLoader();
  
          this.GetDonorLocation().then((res: any) => {
            this.selectedLattitude = res.lattitude;
            this.selectedLongitude = res.longitude;
          }).catch((rej: any) => {
            this.selectedLattitude = undefined;
            this.selectedLongitude = undefined;
          }).finally(() => {
  
            var donorInfo = {
              Uname: this.common.userInfo.uname,
              DOB: `${this.txtDOB.year}-${this.txtDOB.month.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-${this.txtDOB.day.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`,
              Pincode: this.txtDonorPINCode,
              Location: this.txtDonorLocation,
              BloodGrop: this.txtDonorBloodGroup,
              Added_on: new Date(),
              Lattitude: this.selectedLattitude,
              Longitude: this.selectedLongitude
            };
  
            // if(this.donorEntityType === 'add')
            if (this.chkBloodDonor === false) {
              this.common.api.AddDonor(donorInfo, this.common.userInfo.userID).then((res: any) => {
                this.app.HideLoader();
                this.CloseDonorRegisterModal();
                this.app.ShowSuccess('Donor registered successfully');
              }).catch((rej: any) => {
                this.app.HideLoader();
                this.app.ShowError(`${rej.message}`);
              });
  
            }
            else {
              this.common.api.UpdateDonor(donorInfo, this.common.userInfo.userID).then((res: any) => {
                this.app.HideLoader();
                this.CloseDonorRegisterModal();
                this.app.ShowSuccess('Donor details updated successfully');
              }).catch((rej: any) => {
                this.app.HideLoader();
                this.app.ShowError(`${rej.message}`);
              });
  
            }
          });
        }
      }
      catch (ex) {
        this.app.HideLoader();
        this.app.ShowError(ex);
      }
    };
  
    selectedLocation: any;
  
    OnSearchFocusOut = (event: any) => {
      if (this.txtDonationLocation === undefined || this.txtDonationLocation.trim() === '') {
        this.app.HideLoader(true);
      }
      else if (this.txtDonationLocation !== undefined && this.txtDonationLocation === this.selectedLocation.item) {
        this.app.HideLoader(true);
      }
      else
        this.app.ShowLoader(true);
    };
  
    OnClickDeleteEmergencyCard = (deleteCardNumber: any) => {
      this.app.ShowWarn('Are you sure to delete this emergency id ?').then((res: any) => {
        this.app.ShowLoader();
  
        this.storedCardNumber = localStorage.getItem('edittxtCardNumber');
        this.common.api.DeleteEmergencyId(this.storedCardNumber, this.common.userInfo.userID).then((res: any) => {
          this.app.HideLoader();
          this.app.ShowSuccess(`Emergency id deleted successfully`).finally(() => {
            this.LoadEmergencyCards();
            this.OnClickEmergencyCardStatus();
          });
        }).catch((rej: any) => {
          this.app.HideLoader();
          this.app.ShowError(rej.message);
        });
      });
      this.CloseviewProfileDetailsModal();
    };
  
    visitors: any;
  
    OnClickViewProfileDetails = () => {
      this.OpenEMIDProfileVisitorModal();
      this.visitors = [];
      this.storedCardNumber = localStorage.getItem('edittxtCardNumber');
      this.common.api.GetEmergencyIDProfileVisitor(this.storedCardNumber, this.common.userInfo.userID).then((res: any) => {
        if (res.objret && res.objret.length > 0) {
          this.visitors = res.objret;
        }
        else {
          this.visitors = [];
        }
      }).catch((rej: any) => {
        this.visitors = [];
      });
   
  }
  
  
  
  
  
  
  
  //------------------------- create id 
  
  
  @ViewChild('createID') createIDModal: any;
  createIDModalRef: any;
  txtImage: any;
  txtCardNumber: any;
  lblCardNumber: any;
  IsCardAvailable: any = false;
  txtCardName: any;
  lblCardName: any;
  
  txtMemberContactNo: any;
  lblMemberContactNo: any;
  
  
  txtCardDOB: any;
  lblCardDOB: any;
  txtCardGender: any;
  lblCardGender: any;
  txtCardBloodGroup: any;
  lblCardBloodGroup: any;
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
  
  txtPostalAddress: any;
  lblPostalAddress: any;
  
  txtPostalPincode: any;
  lblPostalPincode: any;
  
  txtAbhaNumber: any;
  lblAbhaNumber: any;
  
  txtEhouseNo: any
  lblEhouseNo: any;
  
  txtEcity: any
  lblEcity: any;
  
  txtEstate: any;
  lblEstate: any;
  
  
  
  
  
  chkOrganDonor: any;
  
  
  
  
  OnClickCreateID = () => {
    // if(this.emergencyIDs.length === 5)
    //   return;
  
    this.OpenCreateIDModal();
  
  };
  
  OpenCreateIDModal = () => {
    this.ClearCreateIDModal();
    this.createIDModalRef = this.common.modal.OpenModal(this.createIDModal);
    this.createIDModalRef.result.finally(() => {
  
      localStorage.removeItem("emtext");
    });
  };
  
  
  CloseCreateIDModal = () => {
    this.createIDModalRef.close();
  };
  
  ClearCreateIDModal = () => {
    this.txtImage = '';
    this.txtCardNumber = '';
    this.txtCardName = '';
    this.txtMemberContactNo = '';
    this.txtCardDOB = '';
    this.txtCardGender = '';
    this.txtCardBloodGroup = '';
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
    this.txtPostalAddress = '';
    this.txtPostalPincode = '';
    this.txtAbhaNumber = '';
    this.txtEhouseNo = '';
    this.txtEcity = '';
    this.txtEstate = '';
    this.lblCardNumber = undefined;
    this.chkOrganDonor = false;
    this.activeTabId = 1;
    this.cardProfileImage = [];
    this.IsCardAvailable = false;
    this.IsEmergencyEntityEdit = false;
  };
  
  
  OnClickCreateEmergencyCard = (emID: any) => {
    this.txtCardNumber = emID.emid;
    this.txtCardName = emID.pname;
    this.txtMemberContactNo = emID.emobile;
    // this.txtCardDOB = this.parserFormatter.parse(emID.pDob.split('T')[0]);
    // this.txtCardDOB = this.parserFormatter.parse(moment(emID.pDob.split('T')[0], 'YYYY-MM-DD').format('DD-MM-YYYY'));
    this.txtCardDOB = `${this.txtCardDOB.year}-${this.txtCardDOB.month.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-${this.txtCardDOB.day.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`,
      this.txtCardBloodGroup = emID.pbloodgroup;
    this.txtCardGender = emID.pGender;
    this.txtPrimaryContactName = emID.pcontName;
    this.txtPrimaryContactNo = emID.pcontMobile;
    this.txtPrimaryContactRelation = emID.pcontRelation;
    this.txtSecondaryContactName = emID.scontName;
    this.txtSecondaryContactNo = emID.scontMobile;
    this.txtSecondaryContactRelation = emID.scontRelation;
    this.txtInsuranceProvider = emID.insuranceprovider;
    this.txtInsurancePolicyNo = emID.policynumber;
    this.txtInsuranceMedicalCondition = emID.medicalcondition;
    this.txtInsuranceEmergencyDrugs = emID.emergencydrug;
    this.txtPostalAddress = emID.eaddress;
    this.txtPostalPincode = emID.epostalcode;
  
    this.txtEhouseNo = emID.ehouseNo;
    this.txtEcity = emID.ecity;
    this.txtEstate = emID.estate;
  
    this.txtAbhaNumber = emID.abha;
    this.chkOrganDonor = emID.organdoner;
    if (this.common.IsFile(emID.profilepic))
      this.cardProfileImage = [
        {
          src: emID.profilepic
        }
      ];
  
    this.IsCardAvailable = true;
    this.IsEmergencyEntityEdit = true;
  
    this.OpenCreateIDModal();
  };
  
  
  // ----------------------------- edit ID
  
  
  @ViewChild('editID') EditIDModal: any;
  EditIDModalRef: any;
  edittxtImage: any;
  edittxtCardNumber: any;
  editlblCardNumber: any;
  editIsCardAvailable: any = false;
  edittxtCardName: any;
  editlblCardName: any;
  
  edittxtMemberContactNo: any;
  editlblMemberContactNo: any;
  
  
  edittxtCardDOB: any;
  editlblCardDOB: any;
  edittxtCardGender: any;
  editlblCardGender: any;
  edittxtCardBloodGroup: any;
  editlblCardBloodGroup: any;
  edittxtPrimaryContactRelation: any;
  editlblPrimaryContactRelation: any;
  edittxtPrimaryContactName: any;
  editlblPrimaryContactName: any;
  edittxtPrimaryContactNo: any;
  editlblPrimaryContactNo: any;
  edittxtSecondaryContactRelation: any;
  editlblSecondaryContactRelation: any;
  edittxtSecondaryContactName: any;
  editlblSecondaryContactName: any;
  edittxtSecondaryContactNo: any;
  editlblSecondaryContactNo: any;
  edittxtInsuranceProvider: any;
  editlblInsuranceProvider: any;
  edittxtInsurancePolicyNo: any;
  editlblInsurancePolicyNo: any;
  editlblInsuranceContactNo: any;
  edittxtInsuranceMedicalCondition: any;
  editlblInsuranceMedicalCondition: any;
  edittxtInsuranceEmergencyDrugs: any;
  editlblInsuranceEmergencyDrugs: any;
  
  edittxtPostalAddress: any;
  editlblPostalAddress: any;
  
  edittxtPostalPincode: any;
  editlblPostalPincode: any;
  
  edittxtAbhaNumber: any;
  editlblAbhaNumber: any;
  
  edittxtEhouseNo: any
  editlblEhouseNo: any;
  
  edittxtEcity: any
  editlblEcity: any;
  
  edittxtEstate: any;
  editlblEstate: any;
  
  
  
  
  
  editchkOrganDonor: any;
  
  
  
  
  OpenEditIDModal = () => {
    this.EditIDModalRef = this.common.modal.OpenModal(this.EditIDModal);
  
    this.EditIDModalRef.result.finally(() => {
      // this.ClearCreateIDModal();
      localStorage.removeItem("emtext");
  
    });
  };
  
  CloseCreateEditIDModal = () => {
    this.EditIDModalRef.close();
  };
  
  OnClickEditEmergencyCard = (cardNumber: any) => {
  
    const url = `${environment.baseApiUrl}vadmin/SearchALLEmergencyIDPagination?Svalue=${cardNumber}`;
  
  
    this.http.get(url).subscribe(
      data => {
        this.emID = data['objret'];
        console.log(this.emID);
  
  
  
        // this.txtCardDOB = this.parserFormatter.parse(emID.pDob.split('T')[0]);
  
        this.edittxtCardNumber = this.emID.emid;
        this.edittxtCardName = this.emID.pname;
        this.edittxtMemberContactNo = this.emID.emobile;
        this.edittxtCardDOB = `${this.txtCardDOB.year}-${this.txtCardDOB.month.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-${this.txtCardDOB.day.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`,
          this.edittxtCardBloodGroup = this.emID.pbloodgroup;
        this.edittxtCardGender = this.emID.pGender;
        this.edittxtPrimaryContactName = this.emID.pcontName;
        this.edittxtPrimaryContactNo = this.emID.pcontMobile;
        this.edittxtPrimaryContactRelation = this.emID.pcontRelation;
        this.edittxtSecondaryContactName = this.emID.scontName;
        this.edittxtSecondaryContactNo = this.emID.scontMobile;
        this.edittxtSecondaryContactRelation = this.emID.scontRelation;
        this.edittxtInsuranceProvider = this.emID.insuranceprovider;
        this.edittxtInsurancePolicyNo = this.emID.policynumber;
        this.edittxtInsuranceMedicalCondition = this.emID.medicalcondition;
        this.edittxtInsuranceEmergencyDrugs = this.emID.emergencydrug;
        this.edittxtPostalAddress = this.emID.eaddress;
        this.edittxtPostalPincode = this.emID.epostalcode;
  
        this.edittxtEhouseNo = this.emID.ehouseNo;
        this.edittxtEcity = this.emID.ecity;
        this.edittxtEstate = this.emID.estate;
  
        this.edittxtAbhaNumber = this.emID.abha;
        this.editchkOrganDonor = this.emID.organdoner;
        if (this.common.IsFile(this.emID.editprofilepic))
          this.cardProfileImage = [
            {
              src: this.emID.editprofilepic
            }
          ];
  
      }
    )
  
    this.editIsCardAvailable = true;
    this.IsEmergencyEntityEdit = true;
  
    this.OpenEditIDModal();
    this.CloseviewProfileDetailsModal();
  };
  
  
  // ------------------------------ submit
  
  submit(){
    this.IsEmergencyEntityEdit === false;
    this.OnClickCreateSubmit();
  }
  
  OnClickCreateSubmit = () => {
    if (this.IsValidInsuranceDetails()) {
      this.app.ShowLoader();
  
      var cardInfo = {
        EMID: this.txtCardNumber,
        Pname: this.txtCardName,
        Emobile: this.txtMemberContactNo,
        PDob: `${this.txtCardDOB.year}-${this.txtCardDOB.month.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-${this.txtCardDOB.day.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`,
        Pbloodgroup: this.txtCardBloodGroup,
        PGender: this.txtCardGender,
        PcontName: this.txtPrimaryContactName,
        PcontMobile: this.txtPrimaryContactNo,
        PcontRelation: this.txtPrimaryContactRelation,
        ScontName: this.txtSecondaryContactName,
        ScontMobile: this.txtSecondaryContactNo,
        ScontRelation: this.txtSecondaryContactRelation,
        Insuranceprovider: this.txtInsuranceProvider,
        Policynumber: this.txtInsurancePolicyNo,
        Medicalcondition: this.txtInsuranceMedicalCondition,
        Emergencydrug: this.txtInsuranceEmergencyDrugs,
        Eaddress: this.txtPostalAddress,
        Epostalcode: this.txtPostalPincode,
        EhouseNo: this.txtEhouseNo,
        Ecity: this.txtEcity,
        Estate: this.txtEstate,
        Abha: this.txtAbhaNumber,
        Organdoner: this.chkOrganDonor,
        File: this.cardProfileImage[0]
      };
  
      console.log(cardInfo);
  
      if (this.IsEmergencyEntityEdit === true) {
        this.common.api.UpdateEmergencyCard(cardInfo, this.common.userInfo.userID).then((res: any) => {
          this.app.HideLoader();
          this.CloseCreateEditIDModal();
          this.app.ShowSuccess(`Emergency ID updated successfully`).finally(() => {
            this.OnPageLoad();
          });
        }).catch((rej: any) => {
          this.common.logger.error(rej);
          this.app.HideLoader();
          this.CloseCreateIDModal();
          this.app.ShowError(`${rej.message}`);
        });
  
      }
      else {
        this.common.api.AddEmergencyCard(cardInfo, this.common.userInfo.userID).then((res: any) => {
          this.app.HideLoader();
          this.CloseCreateIDModal();
          this.app.ShowSuccess(`Family member added successfully`).finally(() => {
  
            this.OnClickEmergencyCardStatus();
            this.OnPageLoad();
          });
  
        }).catch((rej: any) => {
          this.common.logger.error(rej);
          this.app.HideLoader();
          this.CloseCreateIDModal();
          this.app.ShowError(`${rej.message}`);
        });
      }
  
  
    }
  
    localStorage.removeItem("emtext");
  };
  
  OnClickEditSubmit = () => {
    if (this.IsValidInsuranceDetails()) {
      this.app.ShowLoader();
  
      var cardInfo = {
        EMID: this.txtCardNumber,
        Pname: this.txtCardName,
        Emobile: this.txtMemberContactNo,
        PDob: `${this.txtCardDOB.year}-${this.txtCardDOB.month.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}-${this.txtCardDOB.day.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`,
        Pbloodgroup: this.txtCardBloodGroup,
        PGender: this.txtCardGender,
        PcontName: this.txtPrimaryContactName,
        PcontMobile: this.txtPrimaryContactNo,
        PcontRelation: this.txtPrimaryContactRelation,
        ScontName: this.txtSecondaryContactName,
        ScontMobile: this.txtSecondaryContactNo,
        ScontRelation: this.txtSecondaryContactRelation,
        Insuranceprovider: this.txtInsuranceProvider,
        Policynumber: this.txtInsurancePolicyNo,
        Medicalcondition: this.txtInsuranceMedicalCondition,
        Emergencydrug: this.txtInsuranceEmergencyDrugs,
        Eaddress: this.txtPostalAddress,
        Epostalcode: this.txtPostalPincode,
        EhouseNo: this.txtEhouseNo,
        Ecity: this.txtEcity,
        Estate: this.txtEstate,
        Abha: this.txtAbhaNumber,
        Organdoner: this.chkOrganDonor,
        File: this.cardProfileImage[0]
      };
  
      console.log(cardInfo);
  
      if (this.IsEmergencyEntityEdit === true) {
        this.common.api.UpdateEmergencyCard(cardInfo, this.common.userInfo.userID).then((res: any) => {
          this.app.HideLoader();
          this.CloseCreateEditIDModal();
          this.app.ShowSuccess(`Emergency ID updated successfully`).finally(() => {
            this.OnPageLoad();
          });
        }).catch((rej: any) => {
          this.common.logger.error(rej);
          this.app.HideLoader();
          this.CloseCreateIDModal();
          this.app.ShowError(`${rej.message}`);
        });
  
      }
      else {
        this.common.api.AddEmergencyCard(cardInfo, this.common.userInfo.userID).then((res: any) => {
          this.app.HideLoader();
          this.CloseCreateIDModal();
          this.app.ShowSuccess(`Family member added successfully`).finally(() => {
            this.OnPageLoad();
          });
        }).catch((rej: any) => {
          this.common.logger.error(rej);
          this.app.HideLoader();
          this.CloseCreateIDModal();
          this.app.ShowError(`${rej.message}`);
        });
      }
  
  
    }
  
    localStorage.removeItem("emtext");
  };
  
  
  // ---------------------------- download card
  
  
  OnClickDownloadEmergencyCardID = (emID: any) => {
    console.log(emID);
    var items = [];
    for (var i = 0; i < emID.length; i++) {
      items.push(emID[i]);
    }
  
    window.localStorage.setItem("downloadDetails", JSON.stringify(items));
    this.router.navigate(['/dashboard/downloademid']);
  
    //this.route.navigate(["/admindashboard/download"]);
    // localStorage.setItem('downloadDetails',emID);
  
  };
  
  authToken: any = this.common.auth_token;
  
  OnClicklDownloadEmergencyCardID = (cardNumber: any) => {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
    const url = `${environment.baseApiUrl}vadmin/SearchALLEmergencyIDPagination?Svalue=${cardNumber}`;
    this.http.get(url, { headers }).subscribe(
      data => {
        if (data['statusCode'] === 200) {
          const apiData = data['objret'];
  
          // Create an array to store the values in specific indexes
          const downloadDetailsArray = [];
  
          // Iterate through the API data and extract the desired values
          apiData.forEach(item => {
            const downloadDetails = [
              item.id,
              item.emid,
              item.pin,
              item.pname,
              item.isPaidMember,
              item.package_name,
              item.package_validity
              // Add more values here as needed
            ];
  
            // Push each value from downloadDetails into downloadDetailsArray
            downloadDetailsArray.push(...downloadDetails);
          });
  
          // Convert the downloadDetailsArray to a JSON string
          const downloadDetailsArrayString = JSON.stringify(downloadDetailsArray);
  
          // Store the JSON string in local storage with the key "downloadDetails"
          localStorage.setItem("downloadDetails", downloadDetailsArrayString);
  
          this.router.navigate(['/dashboard/downloademid']);
  
          console.log(downloadDetailsArray);
        }
      }
    );
  
  
  };
  
  // ------------------------------------------ information modal
  
  @ViewChild('information') InfoIDModal: any;
  InfoIDModalRef: any;
  
  OpeninfoModal = () => {
    this.InfoIDModalRef = this.common.modal.OpenModal(this.InfoIDModal);
    this.InfoIDModalRef.result.finally(() => {
    });
  };
  
  
  cardStatus:any;
  // subscriberID = String(this.common.userInfo.userID);
  // subscriberID: string = this.common.userInfo.userID.toString();
  
  
  // subscriberID:string;
  
  
  //  subscriberID = localStorage.getItem('userID');
  
  OnClickEmergencyCardStatus = () => {
  
    // this.subscriberID = localStorage.getItem('userID');
  
  
    // console.log(this.subscriberID);
  
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
    const url = `${environment.baseApiUrl}User/ValidateCardCreation?UserID=${this.common.getUserId()}`;
  
    this.http.get(url, { headers }).subscribe(
      data => {
        console.log(data);
        if (data['statusCode'] === 200) {
           this.cardStatus = data['objret'];
           console.log(this.cardStatus);
            
          };
   
        });
  
      }
  
    openProfile() {
      let profile = document.querySelector('.profile');
      let menu = document.querySelector('.menu');
      menu.classList.toggle('active');
    }
  
    OnClickLogout = () => {
      this.common.userInfo = undefined;
      this.common.auth_token = undefined;
      this.common.refresh_token = undefined;
      localStorage.clear();
      this.app.ShowSuccess(`User logged out successfully`).finally(() => {
        this.router.navigate(['/home']);
      });
    };

    get userName(){
      const userName = JSON.parse(localStorage.getItem('userInfo'))?.uname;
      return userName;
    }
}
