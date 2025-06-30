import { Component, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import {  filter } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-corporate-home',
  templateUrl: './corporate-home.component.html',
  styleUrls: ['./corporate-home.component.css']
})
export class CorporateHomeComponent implements OnInit{
  regex: any;  
  links: any = {};
  device_type: any;
 

  constructor(public common: CommonService,private router: Router,private route: ActivatedRoute, public app: AppComponent,
    private titleService: Title,
    private metaTagService: Meta) {
    this.common.modal.CloseAllModal();

   }

   
  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }

  ngOnInit(): void {

    this.app.HideLoader();
    this.common.ValidateUser(this.router, this.app).then(() => {
      this.OnPageLoad();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // The event.url will give you the current route URL
      console.log('Current Route:', event.url);
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
       
        },500);
    }).catch((rej: any) => {
      this.app.ShowError(`${rej.message}`);
    })



    setTimeout(() => {
      this.common.property.GetProperties().then((res: any) => {
        
          if(res)
            this.common.propInfo = res;
            this.device_type = this.common.GetDeviceType();

      
          this.regex = this.common.propInfo.regex;
          try{
           
            this.CorpLoadProfile().then((res: any) => {
      
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
          }
          catch(ex){
            this.app.ShowError(ex);
          }
      }).catch((rej: any) => {
        this.app.ShowError(`${rej.message}`);
      });
    },500);
  };



  profileInfo: any;
  IsDonorAvailable: any = false;
  txtName: any;
  txtComp: any;
  empid:any;
  corplogo: any;
  profileImage: any = [];
  txtisPaidMember: any;
  txtpackageName:any;
  txtpackagevalid_till:any;

  /**
   * LOADING PROFILE
   * @returns
   */

  CorpLoadProfile = () => {
    return new Promise((_res: any, _rej: any) => {
      this.common.api.GetCorpProfile(this.common.userInfo.userID).then((res: any) => {
        if(res.objret){
          this.profileInfo = res.objret;
          this.txtName = res.objret.emp_name;
          this.txtComp = res.objret.emp_organisation;
          this.empid = res.objret.emp_id;
          this.corplogo = res.objret.emp_corplogo;
          this.txtisPaidMember = res.objret.emp_plan;
      

          if(this.common.IsFile(res.objret.emp_corplogo)){
            const album = {
              src: res.objret.emp_corplogo
            };
            this.profileImage.push(album);
          }
      
        }
        else
          this.app.ShowError('No records found');
          _res();
      }).catch((rej: any) => {
        _rej(rej);
      });
    });
  };


  onClick(){
    this.OpenpremiumFeaturesModal();
  }


  @ViewChild('premiumFeatures') premiumFeaturesModal: any;
  premiumFeaturesModalRef: any;

  OpenpremiumFeaturesModal = () => {
    this.premiumFeaturesModalRef = this.common.modal.OpenModal(this.premiumFeaturesModal);
    this.premiumFeaturesModalRef.result.finally(() => {
    });
  };

  ClosepremiumFeaturesModal = () => {
    this.premiumFeaturesModalRef.close();
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
      return '/home';
    }
  }
}
