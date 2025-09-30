import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { Title, Meta } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-package-subscription',
  templateUrl: './package-subscription.component.html',
  styleUrls: ['./package-subscription.component.css']
})
export class PackageSubscriptionComponent implements OnInit {

  regex: any;  
  links: any = {};
  isLoading = false;
  selectedCard: any;
  amountPayable: any;
  authToken: any = this.common.auth_token;
  currentDateTime: any;
  couponCode: any = '';
  couponApplied: any;
  couponDiscountAmount: any;
  finalAmount: any;
  packageDetails: any;
  totalAmount: any;
  redirectUrl: any;
  originalPackageAmount: any;
  couponCodeActive: boolean = false;
  couponDiscountType:any;
  isPackageSelected: boolean = false;
  subscriptionPackagesName: any = '';

  constructor(public common: CommonService,private router: Router,private route: ActivatedRoute, public app: AppComponent,
    private titleService: Title,private http: HttpClient, private datePipe: DatePipe,
    private metaTagService: Meta, private cdr: ChangeDetectorRef) {
      
    this.common.modal.CloseAllModal();

   }

  ngOnInit(): void {

    this.subscriptionPackagesName = this.common.getSubscriptionCardToDisplay();
    if(this.subscriptionPackagesName === null || this.subscriptionPackagesName === undefined || this.subscriptionPackagesName === ''){
      this.subscriptionPackagesName = localStorage.getItem("subscriptionPackagesName");
    }
    else{
      localStorage.setItem("subscriptionPackagesName", this.subscriptionPackagesName);
    }

    this.common.ValidateUser(this.router, this.app).then(() => {
      this.app.ShowLoader();

      this.OnPageLoad()
    });

  }

  // Call this method after updating the state
updateView() {
  this.cdr.detectChanges();
}

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken
    })
  };

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


    this.GetAllPackages();

    
      this.app.HideLoader();
 

  };


  packages: any;

  GetAllPackages = () => {
    this.common.api.GetAllPackages(this.common.userInfo.userID).then((res: any) => {
      if(res.objret)
        this.packages = res.objret;
     
    }).catch((rej: any) => {
      this.app.ShowError(rej.message);
    }).finally(() => {
      this.isLoading = false;
    });
  };
  

  hasZeroAmountPackage(): boolean {
    if (this.packages && Array.isArray(this.packages)) {
      return this.packages.some(p => p.packageDiscount === 0.00);
    }
    return false;
  }

  onPackageSelection(selectedPackageDetails:any){

    this.selectedCard = selectedPackageDetails;

    this.couponCodeActive = true;

    this.originalPackageAmount = selectedPackageDetails.packageDiscount;

    localStorage.setItem("packageSubscriptionDetails", JSON.stringify(selectedPackageDetails));

    // Set the flag to true when a package is selected
    this.isPackageSelected = true;

  }


  submitCouponCode() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);

    const currentTime = new Date();
    const timezone = 'Kolkata';
    const formattedTime = this.datePipe.transform(currentTime, 'yyyy-MM-ddTHH:mm:ss', timezone);
    console.log(formattedTime);

    this.currentDateTime = formattedTime;

      const url = `${environment.baseApiUrl}user/ValidateCouponDetails`;
    
    // Send a POST request to your API endpoint with the coupon code and current date, and headers
    this.http.post<any>(url, { couponCode: this.couponCode, valid_date: this.currentDateTime }, { headers }).subscribe({
      next: (response) => {
        // Calculate the final amount by subtracting the discounted amount from the initial amount
        // this.finalAmount = this.initialAmount - response.discountedAmount;
        console.log(response);

        if (response.statusCode === 200) {
          this.couponApplied = true;
        }else {
          this.app.ShowError('Invalid Coupon')
        }

        this.couponDiscountAmount = response.objret.couponDiscount;
        this.couponDiscountType = response.objret.discountType;
        console.log(this.couponDiscountAmount);

        if (this.couponDiscountType === 1) {
          this.finalAmount = this.originalPackageAmount - this.couponDiscountAmount;
        } else if (this.couponDiscountType === 2) {
          this.finalAmount = this.originalPackageAmount * (1 - this.couponDiscountAmount / 100);
        } else {
          // Handle other discount types or invalid cases
          this.finalAmount = this.originalPackageAmount;
        }
      },

      error: (error) => {
        console.error('Error applying coupon:', error);
      },
    });
  }
  


  onPackageSelectionPayment() {

    if (this.finalAmount !== undefined) {
      // coupon code applied
      this.totalAmount = this.finalAmount;
    } else {
      // coupon code not applied
      this.totalAmount = this.originalPackageAmount;
    }

    const requestdata = {

      userId: this.common.getUserId(),
      packageName: this.selectedCard.packageName,
      amountPaid: this.totalAmount,
      packageId: this.selectedCard.id,
      couponName: this.couponCode
    };

    console.log(requestdata);
    const url = `${environment.baseApiUrl}payment/GeneratePaymentLink`;
    return this.http.post<any>(url, requestdata).subscribe((res: any) => {

      console.log(res);

      this.redirectUrl = res.paymentUrl;
      console.log(this.redirectUrl);
      window.location.href = this.redirectUrl;

    });

  }

  

  onConfirm(){

    //  this.app.ShowSuccess(`You have successfully registered your account`)
    //  this.router.navigate(['/dashboard/package']);

     this.app.ShowSuccess(`You have successfully registered your account`).finally(() => {
      if(this.common.userInfo.roleID === 4){
        this.router.navigate(['agent/manage-customer']);
      }else{
        this.router.navigate(['/dashboard/profile']);
      }
    });


  }

  
  onPackageSelectionInformation(packageDetails:any){
    this.app.ShowModal(packageDetails)
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

  onBackClick(){
    if(this.common.userInfo.roleID === 4){
      this.router.navigate(['agent/manage-customer']);
    }else{
      this.router.navigate(['dashboard/profile']);
    }
  }

  onLogoClick(){
    if(this.common.userInfo.roleID === 4){
      this.router.navigate(['agent/manage-customer']);
    }else{
      this.router.navigate(['home']);
    }
  }

  onProfileClick(){
    if(this.common.userInfo.roleID === 4){
      this.router.navigate(['agent/manage-customer']);
    }else{
      this.router.navigate(['dashboard/profile/1']);
    }
  }
}