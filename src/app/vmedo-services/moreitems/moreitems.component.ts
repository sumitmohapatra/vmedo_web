import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { AppComponent } from 'src/app/app.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-moreitems',
  templateUrl: './moreitems.component.html',
  styleUrls: ['./moreitems.component.css']
})
export class MoreitemsComponent implements OnInit {

  constructor(private router: Router, public app: AppComponent, public common: CommonService) { }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }

  links: any = {};



  ngOnInit(): void {

   


    this.common.property.GetProperties().then((res: any) =>
    {
      if (this.common.propInfo.links)
        this.links = this.common.propInfo.links;
    }).catch((rej: any) =>
    {
      this.app.ShowError(`${rej.message}`);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // The event.url will give you the current route URL
      console.log('Current Route:', event.url);
    });
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

  OnClickCorporates = () => {
    
    this.router.navigate(['/info/occupational-health-services']);
  };

  OnClickAbouts = () => {
    
    this.router.navigate(['/info/aboutus']);
  };
  OnClickPartnerWithUs = () => {
    
    this.router.navigate(['/info/partner-with-us']);
  };
  OnClickContactUs = () => {
    
    this.router.navigate(['/info/contact-us']);
  };

    /**
   * ON CLICK BLOOD DONOR MENU
   */

    OnClickBloodDonor = () => {

      this.router.navigate(['/services/find-blood-donor']);
        // this.router.navigate(['/dashboard/blooddonation']);

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

}
