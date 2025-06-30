import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-blood-donation-info',
  templateUrl: './blood-donation-info.component.html',
  styleUrls: ['./blood-donation-info.component.css']
})
export class BloodDonationInfoComponent implements OnInit {
  isLoading = false;
  regex: any;

  constructor(private common: CommonService,private parserFormatter: NgbDateParserFormatter, private router: Router, private app: AppComponent) { 
    this.common.modal.CloseAllModal();
  }

  ngOnInit(): void {
    this.common.ValidateUser(this.router, this.app).then(() => {
      this.OnPageLoad();
    });
  }

  OnPageLoad = () => {
    this.isLoading = true;
    setTimeout(() => {
      this.common.property.GetProperties().then((res: any) => {
          if(res)
            this.common.propInfo = res;
          this.regex = this.common.propInfo.regex;
          try{
            this.GetAllDonations();
          }
          catch(ex){
            this.app.ShowError(ex);
          }
      }).catch((rej: any) => {
        this.app.ShowError(`${rej.message}`);
      });
    },500);
  };

  donations: any;
  
  GetAllDonations = () => {
    this.common.api.GetAllDonations(this.common.userInfo.userID).then((res: any) => {
      if(this.common.donor_location === undefined || this.common.donor_location === ''){
        if(res.objret)
          this.donations = res.objret;
      }
      else{
        if(res.objret)
          this.donations = res.objret;
        this.donations = this.donations.filter((s: any) => s.location === this.common.donor_location);
        if(this.donations.length === 0){
          this.app.ShowError(`No donors found for location ${location}`);
          this.donations = res.objret;
        }
      }
    }).catch((rej: any) => {
      this.common.logger.error(rej);
    }).finally(() => {
      this.isLoading = false;
    });
  };

  @ViewChild('donation') donationModal: any;
  donationModalRef: any;

  txtDate: any;
  lblDate: any;
  txtComments: any;
  lblComments: any;
  txtLocation: any;
  lblLocation: any;

  OnClickNewDonation = () => {
    this.donationModalRef = this.common.modal.OpenModal(this.donationModal);
    this.donationModalRef.result.finally(() => {
      this.ClearDonationModal();
    });
  };

  CloseDonationModal = () => {
    this.donationModalRef.close();
  };

  ClearDonationModal = () => {
    this.txtDate = '';
    this.txtComments = '';
    this.txtLocation = '';
  };

  IsValidDonation = () => {
    let date = this.parserFormatter.format(this.txtDate);
    if(!date || date.trim() === ''){
      this.lblDate = "Date should not be empty";
      return false;
    }

    if(!this.txtLocation || this.txtLocation.trim().length === 0){
      this.lblLocation = "Location should not be empty";
      return false;
    }

    return true;
  };

  OnClickSubmit = () => {
    if(this.IsValidDonation()){
      this.app.ShowLoader();

      var donationInfo = {
        Donated_on: `${this.txtDate.year}-${this.txtDate.month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${this.txtDate.day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
        Description: this.txtComments,
        Location: this.txtLocation
      };

      this.common.api.AddDonation(donationInfo, this.common.userInfo.userID).then((res: any) => {
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
  };
}
