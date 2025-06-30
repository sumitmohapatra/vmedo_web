import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel, NgbDateParserFormatter, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { NgbDateCustomParserFormatter } from 'src/app/service/dateformat.service';

@Component({
  selector: 'app-hospitalinfo',
  templateUrl: './hospitalinfo.component.html',
  styleUrls: ['./hospitalinfo.component.css'],
  providers:[{provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]
})
export class HospitalinfoComponent implements OnInit {

  /** Common page variables & properties */
  property: any = {};
  regex: any = {};
  isLoading: any = false;
  entity: any;
  bannerImages: any = [];
  maxReviewOnHospital: any = 1;
  hospitalRating: any = 0;
  entity2: any;
  entity3: any;

  constructor(public common: CommonService, private route: ActivatedRoute, private router: Router, public app: AppComponent) {
    this.common.modal.CloseAllModal();
  }

  ngOnInit(): void {
    //this.common.ValidateUser(this.router, this.app).then(() => {
      this.OnPageLoad();
    //});
  }

  OnPageLoad = () => {
    this.common.property.GetProperties().then((res: any) => {
      if(res.home)
        this.property = res.home;
      if(res.regex)
        this.regex = res.regex;
      if(res.maxReviewOnHospital)
        this.maxReviewOnHospital = res.maxReviewOnHospital;

      if(this.route.snapshot.paramMap.get('hospitalId')){
        this.isLoading = true;
        setTimeout(() => {
          this.GetHospitalInfo(this.route.snapshot.paramMap.get('hospitalId'));
          this.GetHospitalImages(this.route.snapshot.paramMap.get('hospitalId'));
          this.GetHospitalReview(this.route.snapshot.paramMap.get('hospitalId'));
          this.GetHospitalReviews(this.route.snapshot.paramMap.get('hospitalId'));
        },500);
      }
      else
        this.app.ShowError('No records found').finally(() => {
          this.router.navigate(['/dashboard/hospitals']);
        });
    }).catch((rej: any) => {
      this.app.ShowError(`${rej.message}`).finally(() => {
        this.router.navigate(['/dashboard/hospitals']);
      });
    })
  };

  GetHospitalInfo = (hospitalId: any) => {
    var userId = undefined;
    if(this.common.userInfo && this.common.userInfo.userID)
      userId = this.common.userInfo.userID;
    this.common.api.GetHospitalInfoByHospitalId(userId, hospitalId).then((res: any) => {
      if(res.objhosp){
        this.entity = res.objhosp;
        
       this.entity2 = res.objhosp.lSpelization.filter((m:any) => m.eStatus === "Approved");
       this.entity3 = res.objhosp.emergencyHandeled.filter((m:any) => m.eStatus === "Approved");
        // this.bannerImages.push(this.entity.hImage);
      }
      else
        this.app.ShowError('No records found').finally(() => {
          this.router.navigate(['/dashboard/hospitals']);
        });
    }).catch((rej: any) => {
      this.app.ShowError(`${rej.message}`).finally(() => {
        this.router.navigate(['/dashboard/hospitals']);
      });
    }).finally(() => {
      this.isLoading = false;
    });
  };

  GetHospitalImages = (hospitalId: any) => {
    this.bannerImages = [];
    var userId = undefined;
    if(this.common.userInfo && this.common.userInfo.userID)
      userId = this.common.userInfo.userID;

    this.common.api.GetHospitalImagesByHospitalId(userId, hospitalId).then((res: any) => {
      if(res.objimages){
        res.objimages.forEach((element: any) => {
          this.bannerImages.push(element.himages);
          // console.log(this.bannerImages);
        });
      }
    });
  };

  GetHospitalReview = (hospitalId: any) => {
    this.hospitalReviews = [];
    var userId = undefined;
    if(this.common.userInfo && this.common.userInfo.userID)
      userId = this.common.userInfo.userID;
    this.common.api.GetHospitalReview(userId, hospitalId).then((res: any) => {
      if(res.objret && res.objret.length > 0){
        this.hospitalRating = res.objret[0].hRating;
      }
    });
  };

  hospitalReviews: any = [];
  hospitalReviewsByCurrentUser: any = [];

  GetHospitalReviews = (hospitalId: any) => {
    this.hospitalReviews = [];
    var userId = undefined;
    if(this.common.userInfo && this.common.userInfo.userID)
      userId = this.common.userInfo.userID;
    this.common.api.GetHospitalReviewsByUser(userId, hospitalId).then((res: any) => {
      if(res.objret && res.objret.length > 0){
        this.hospitalReviews = res.objret;
        this.hospitalReviews.forEach((review: any) => {
          review.review_dt = this.common.GetDayDifference(review.review_On, new Date().toISOString());
        });
        this.hospitalReviews = this.common.SortByDate(this.hospitalReviews, 'review_dt');
        // this.hospitalReviews = this.common.GetUniqueItemsByProperties(this.hospitalReviews, 'id');
        if(this.common.userInfo)
        this.hospitalReviewsByCurrentUser = this.hospitalReviews.filter((s: any) => s.username === this.common.userInfo.uname);
      }
    });
  };


  /** Enquiry Modal Variables */
  enquiryModal: any;
  txtPatientName: any;
  txtPatientAge: any;
  txtEnquiryReason: any;
  lblPatientName: any;
  lblPatientAge: any;
  lblEnquiryReason: any;

  /** Open Enquiry Modal */
  OpenEnquiryModal(content: any) {
    if(!this.common.auth_token){
      this.app.Login().then((res: any) => {
        if(res === 'success')
        {
          this.enquiryModal = this.common.modal.OpenModal(content);
          this.enquiryModal.result.finally(() => {
            this.ClearEnquiryModal();
          });
        }
      }).catch((rej: any) => {
        this.app.ShowError(rej.message);
      });
    }
    else{
      this.enquiryModal = this.common.modal.OpenModal(content);
      this.enquiryModal.result.finally(() => {
        this.ClearEnquiryModal();
      });
    }
  }

  /** Close Enquiry Modal */
  CloseEnquiryModal = () => {
    this.enquiryModal.close();
  };

  /** Resetting controls for Enquiry Modal */
  private ClearEnquiryModal = () => {
    this.txtPatientName = '';
    this.txtPatientAge = '';
    this.txtEnquiryReason = '';
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
    if(this.txtPatientName === undefined)
      this.txtPatientName = '';

    if(this.txtPatientName === ''){
      this.lblPatientName = 'Please enter patient name!';
      return false;
    }

    if(!this.common.IsValid('string', this.txtPatientName, this.regex)){
      this.lblPatientName = this.regex['string'].message;
      return false;
    }

    if(this.txtPatientAge === undefined)
      this.txtPatientAge = '';

      if(this.txtPatientAge === ''){
        this.lblPatientAge = 'Please enter patient age!';
        return false;
      }

    if(!this.common.IsValid('age', this.txtPatientAge, this.regex)){
      this.lblPatientAge = this.regex['age'].message;
      return false;
    }

    if(this.txtEnquiryReason === undefined)
      this.txtEnquiryReason = '';

    if(this.txtEnquiryReason === ''){
      this.lblEnquiryReason = 'Please enter reason!';
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
        HospitalID: this.route.snapshot.paramMap.get('hospitalId'),
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
    if(!this.common.auth_token){
      this.app.Login().then((res: any) => {
        if(res === 'success')
        {
          this.app.ShowLoader();
          this.common.api.PatientEnquiryCall(this.route.snapshot.paramMap.get('hospitalId'), this.common.userInfo.userID).then((res: any) => {
            this.app.HideLoader();
            var contacts = [
              {
                name: 'Emergency Contact',
                number: this.entity.emergencyDContact
              },
              {
                name: 'General Contact',
                number: this.entity.generalDContact
              }
            ]
            this.app.ShowContact(contacts);
          }).catch((rej: any) => {
            this.app.HideLoader();
            this.app.ShowError(rej.message);
          });
        }
      }).catch((rej: any) => {
        this.app.ShowError(rej.message);
      });
    }
    else{
      this.app.ShowLoader();
      this.common.api.PatientEnquiryCall(this.route.snapshot.paramMap.get('hospitalId'), this.common.userInfo.userID).then((res: any) => {
        this.app.HideLoader();
        var contacts = [
          {
            name: 'Emergency Contact',
            number: this.entity.emergencyDContact
          },
          {
            name: 'General Contact',
            number: this.entity.generalDContact
          }
        ]
        this.app.ShowContact(contacts);
      }).catch((rej: any) => {
        this.app.HideLoader();
        this.app.ShowError(rej.message);
      });
    }
  };

  /** Review Modal Variables */
  @ViewChild('reviewModal') reviewModal: any;
  reviewModalRef: any;
  txtComment: any = '';
  txtRating: any = 0;
  IsReviewModalEdit: any = false;

  /** Open Enquiry Modal */
  OpenReviewModal() {
    if(!this.common.auth_token){
      this.app.Login().then((res: any) => {
        if(res === 'success')
        {
          if(this.common.userInfo){
            this.hospitalReviewsByCurrentUser = this.hospitalReviews.filter((s: any) => s.username === this.common.userInfo.uname);
            if(this.hospitalReviewsByCurrentUser.length === this.maxReviewOnHospital)
              return;
          }
          this.reviewModalRef = this.common.modal.OpenModal(this.reviewModal);
          this.reviewModalRef.result.finally(() => {
            this.ClearReviewModal();
          });
        }
      }).catch((rej: any) => {
        this.app.ShowError(rej.message);
      });
    }
    else{
      if(this.common.userInfo){
        this.hospitalReviewsByCurrentUser = this.hospitalReviews.filter((s: any) => s.username === this.common.userInfo.uname);
        if(this.hospitalReviewsByCurrentUser.length === this.maxReviewOnHospital && !this.IsReviewModalEdit)
          return;
      }

      this.reviewModalRef = this.common.modal.OpenModal(this.reviewModal);
      this.reviewModalRef.result.finally(() => {
        this.ClearReviewModal();
      });
    }
  }

  /** Close Enquiry Modal */
  CloseReviewModal = () => {
    this.reviewModalRef.close();
  };

  /** Resetting controls for Enquiry Modal */
  private ClearReviewModal = () => {
    this.txtComment = '';
    this.txtRating = 0;
    this.IsReviewModalEdit = false;
    this.selectedReview = undefined;
  };

  OnClickReview = () => {
    if (this.txtRating === 0)
      return this.common.toaster.Error(`Please select rating !`);

    var reviewInfo: any = {
      UserID: this.common.userInfo.userID,
      HRating: this.txtRating,
      DReview: this.txtComment,
      Review_On: new Date().toISOString().split('T')[0],
      HospitalID: this.route.snapshot.paramMap.get('hospitalId')
    };

    if (!this.IsReviewModalEdit)
    {
      this.app.ShowLoader();

      this.common.api.UpdateHospitalReview(reviewInfo, this.common.userInfo.userID).then((res: any) =>
      {
        this.CloseReviewModal();
        this.app.ShowSuccess(`Review submitted successfully`).finally(() => {
          this.app.HideLoader();
          this.OnPageLoad();
        });
        this.GetHospitalReviews(this.route.snapshot.paramMap.get('hospitalId'));
      }).catch((rej: any) =>
      {
        this.CloseReviewModal();

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
          this.app.ShowError(rej.message).finally(() => this.app.HideLoader());
      });
    }
    else{
      reviewInfo.ID = this.selectedReview.id;

      this.app.ShowLoader();

      this.common.api.EditHospitalReview(reviewInfo, this.common.userInfo.userID).then((res: any) =>
      {
        this.CloseReviewModal();
        this.app.ShowSuccess(`Review updated successfully`).finally(() => {
          this.app.HideLoader();
          this.OnPageLoad();
        });
        this.GetHospitalReviews(this.route.snapshot.paramMap.get('hospitalId'));
      }).catch((rej: any) =>
      {
        this.CloseReviewModal();
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
        this.app.ShowError(rej.message).finally(() => this.app.HideLoader());
      });
    }
  };

  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/1400/500`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;

  TogglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  OnSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.TogglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.TogglePaused();
    }
  }

  active = 1;


  selectedReview: any;

  OnEditReview = (review: any, username: any) => {

    if(!this.common.auth_token){
      this.app.Login().then((res: any) => {
        if(res === 'success')
        {
          if(username === this.common.userInfo.uname){
            this.selectedReview = review;
            this.IsReviewModalEdit = true;
            this.txtComment = review.dReview;
            this.txtRating = review.hRating;
            //this.hospitalReviewsByCurrentUser = this.hospitalReviews.filter((s: any) => s.username === this.common.userInfo.uname);
            this.OpenReviewModal();
          }
        }
      }).catch((rej: any) => {
        this.app.ShowError(rej.message);
      });
    }
    else{
      this.selectedReview = review;
      this.IsReviewModalEdit = true;
      this.txtComment = review.dReview;
      this.txtRating = review.hRating;
      this.OpenReviewModal();
    }
  };

  IsHavingMoreLines = (id: any) => {
    var element = document.getElementById(id);
    if(element && element.clientHeight < element.scrollHeight)
      return true;
    return false;
  };

  OnClickViewMore = (id: any) => {
    var element = document.getElementById(id);
    if(element && element.clientHeight < element.scrollHeight){
      element.style.maxHeight = `${element.scrollHeight.toString()}px`;
    }
  };
}
