import { Component,  OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-emergency-service',
  templateUrl: './emergency-service.component.html',
  styleUrls: ['./emergency-service.component.css']
})
export class EmergencyServiceComponent implements OnInit {

  isLoading = false;
  regex: any;
  links: any = {};
  maxDate: any;
  device_type: any;
  profileImage: any = [];
  paramEmId: any;
  paramPin: any;
  panelOpenState = false;
  phone:any;

  constructor(public common: CommonService,private router: Router,private route: ActivatedRoute, public app: AppComponent,
    private titleService: Title,
    private metaTagService: Meta) {
    this.common.modal.CloseAllModal();

   }

   public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
}

  ngOnInit(): void {

    this.phone=9343180000;

    this.titleService.setTitle("Medical Emergency Helpline India | 24*7 Doctor, Ambulance and Hospital admission support");

    this.metaTagService.addTags([
      { name: 'description', content: 'Contact 24x7 medical emergency helpline india and get hospital admission, ambulance booking and online doctor consultation'
     },
     { name: 'author', content: 'Medical Emergency Helpline India | 24*7 Doctor, Ambulance and Hospital admission support'},
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
  OnClickPartnerWithUs = () => {
    
    this.router.navigate(['/info/partner-with-us']);
  };
  
  OnClickContactUs = () => {
    
    this.router.navigate(['/info/contact-us']);
  };
  OnClickAmbulance = () => {

    this.router.navigate(['/services/ambulance-service-india']);

  };

}
