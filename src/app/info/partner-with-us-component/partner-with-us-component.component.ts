import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, HostListener, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { environment } from 'src/environments/environment';

import SwiperCore, {
  SwiperOptions,
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectFade,
} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay, EffectFade]);

declare var gtag: Function;

@Component({
  selector: 'app-partner-with-us-component',
  templateUrl: './partner-with-us-component.component.html',
  styleUrls: ['./partner-with-us-component.component.css']
})
export class PartnerWithUsComponentComponent {

  formData = {
    organisation:'',
    name: '',
    phone: null, // Initialize phone as number
    email: '',
    dropdown:'',
    message:'',
    formtype: 2 // Fixed value

  };


  isSideMenuOpen2 = false;
  isOpen2 = false;

  toggleServices2() {
    this.isOpen2= !this.isOpen2;
  }

  isDropdownDesktopOpen: boolean = false;

  toggleDropdownDesktop() {
      this.isDropdownDesktopOpen = !this.isDropdownDesktopOpen;
  }

  
  private window: any;
  phone:any;

  isSideMenuOpen: boolean = false;

  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

   //Services popup
   showPopup: boolean = false;

   togglePopup(): void {
     this.showPopup = !this.showPopup;
   }

       //Services popup
       partnerEnquiryForm: boolean = false;

       togglePartnerEnquiryForm(): void {
         this.partnerEnquiryForm = !this.partnerEnquiryForm;
       }

//Services popup
partnerEnquiryFormMobile: boolean = false;

togglePartnerEnquiryFormMobile(): void {
  this.partnerEnquiryFormMobile = !this.partnerEnquiryFormMobile;
}

     //mobile widget icons
  selectedIndex: number = -1; // Initialize selectedIndex to -1, indicating no icon is selected

  selectIcon(index: number) {
    this.selectedIndex = index; // Set the selectedIndex to the clicked icon index
  }

  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth <= 768; // Adjust as needed
  }

  vmedo_review_desktop: SwiperOptions = {
    slidesPerView: 4,
  };


  ngOnInit(): void {

    this.phone=9343180000;

    this.titleService.setTitle("Together, we save more lives - Partner with VMEDO");

    this.metaTagService.addTags([
      { name: 'description', content: 'Join hands with VMEDO to improve accessibility of Emergency healthcare services in India, to serve more people, to grow your business and help save more lives.'
     },
     { name: 'author', content: 'VMEDO'},
    ]);

 
  }

    /**
   * CONSTRUCTOR
   * @param common
   * @param route
   * @param app
   */

    constructor(
      @Inject(DOCUMENT) private document: Document,
      public common: CommonService,
      private router: Router,
      private http: HttpClient,
      public app: AppComponent,
      private titleService: Title,
      private metaTagService: Meta
    ) {
      this.checkIfMobile();
      this.window = this.document.defaultView;
      this.common.modal.CloseAllModal();
  
      gtag('event', 'page_view', {
        send_to: 'G-9VRNKZ96W9',
        page_title: 'Home page',
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }

    vmedo_review_mobile: SwiperOptions = {
      slidesPerView: 1.2,
      pagination: true
    };

    other_services_mobile: SwiperOptions = {
      slidesPerView: 2.4,
      pagination: false,
    };

    our_other_services_dektop: SwiperOptions = {
      slidesPerView: 5,
      spaceBetween: 14,
    };


    submitForm() {

      this.app.ShowLoader();
  
      // Convert phone number from string to number
      this.formData.phone = Number(this.formData.phone);
  
      //https://apitest.vmedo.com/api/Emailtemplate/GetBedTyperecords
      const url = `${environment.baseApiUrl}Emailtemplate/GetBedTyperecords`;
  
      this.http.post(url, this.formData, { observe: 'response' })
        .subscribe(
          (response: HttpResponse<any>) => { // Make sure to type response properly or use any
            console.log('API Response:', response);
  
            
  
            // Check if the response contains a status code
            if (response && response.status === 200) {
                // Clear the form data
                this.formData = {
                    organisation:'',
                    name: '',
                    phone: null, 
                    email: '',
                    dropdown:'',
                    message:'',
                    formtype: 2 
                };
                // Close the form (you need to implement this logic based on how the form is displayed)
                // Close the form by toggling the visibility flag
                this.togglePartnerEnquiryForm();
                this.togglePartnerEnquiryFormMobile();
  
                this.app.ShowSuccess(`Form submitted successfully`);
            }
            // Handle success, maybe show a success message to the user
          },
          error => {
            console.error('API Error:', error);
            // Handle error, maybe show an error message to the user
          }
        );
    }
  
    
  
    cancelForm() {
      // Reset form fields
      this.formData = {
          organisation: '',
          name: '',
          phone: null,
          email: '',
          dropdown: '',
          message: '',
          formtype: 2
      };
      
      // Close the form
      this.togglePartnerEnquiryForm();
      this.togglePartnerEnquiryFormMobile();
  }
  
  
    closeForm() {
  
      console.log('Form Closes');
      // Add logic here to close the form, such as setting a boolean flag to false if the form is a modal or navigating away if it's a separate page
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
    
}
