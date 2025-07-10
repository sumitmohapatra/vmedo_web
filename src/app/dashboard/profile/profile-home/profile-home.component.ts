import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { Title, Meta } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from 'jquery';
import { interval } from 'rxjs';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css']
})
export class ProfileHomeComponent implements OnInit {
  regex: any;  
  links: any = {};
  device_type: any;

 
  counter = interval(5000);
  id:any;



  constructor(public common: CommonService,private router: Router,private route: ActivatedRoute, public app: AppComponent,
    private titleService: Title,
    private metaTagService: Meta) {
    this.common.modal.CloseAllModal();

   }

   
  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }
  
  ngOnInit(): void {

  //  this.id = setInterval(() => {
  //   this.LoadProfile();
  //  },5000 )



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
           
            this.LoadProfile().then((res: any) => {
      
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
  profileImage: any = [];
  txtisPaidMember: any = false;
  txtisUnpaidPaidMember: any = false;
  txtpackageName:any;
  txtpackagevalid_till:any;

  /**
   * LOADING PROFILE
   * @returns
   */
  packageExpired: boolean = false;
  LoadProfile = () => {
    return new Promise((_res: any, _rej: any) => {
      this.common.api.GetUserProfile(this.common.userInfo.userID).then((res: any) => {
        if(res.objret){
          this.profileInfo = res.objret;
          this.txtName = res.objret.userName;
          this.txtisPaidMember = res.objret.isPaidMember? true :false;
          this.txtisUnpaidPaidMember = res.objret.isPaidMember? false :true;
          this.txtpackageName = res.objret.packageName;
          this.txtpackagevalid_till = res.objret.packagevalid_till;

          const today = new Date();
          const validTill = new Date(this.txtpackagevalid_till);
          this.packageExpired = validTill < today;

          if(this.common.IsFile(res.objret.profilePhoto)){
            const album = {
              src: res.objret.profilePhoto
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
  
   goToPackage(displayPackage: any) {
    this.common.viewSubscription(displayPackage);
    this.router.navigate(['/dashboard/package']);
  }
  
}
