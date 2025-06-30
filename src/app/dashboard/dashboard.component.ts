import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /**
   * CONSTRUCTOR
   * @param router
   * @param common
   */
  constructor(private router: Router, private common: CommonService) { }

  /**
   * ON PAGE INITIALIZED
   */
  ngOnInit(): void {
    this.common.property.GetProperties().then((res: any) => {
      this.common.propInfo = res;
    }).catch((rej: any) => {
      this.common.logger.error(rej);
    });
  }
  OnClickCorporates = () => {
  
    this.router.navigate(['/info/occupational-health-services']);
  };
  OnClickAbouts = () => {
    
    this.router.navigate(['/info/aboutus']);
  };
  OnClickContactUs = () => {
    
    this.router.navigate(['/info/contact-us']);
  };
  OnClickPartnerWithUs = () => {
 
    this.router.navigate(['/info/partner-with-us']);
  };
  OnClickAmbulance = () => {

    this.router.navigate(['/services/ambulance-service-india']);

  };
}
