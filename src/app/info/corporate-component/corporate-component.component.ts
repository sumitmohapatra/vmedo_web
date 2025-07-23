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
  selector: 'app-corporate-component',
  templateUrl: './corporate-component.component.html',
  styleUrls: ['./corporate-component.component.css'],
})
export class CorporateComponentComponent {

  formData = {
    organisation:'',
    name: '',
    phone: null, // Initialize phone as number
    email: '',
    employeecount: null,
    servicerequest:'',
    message:'',
    formtype: 1 // Fixed value

  };


  



  isSideMenuOpen2 = false;
  isOpen2 = false;

  showBulletPoints1: boolean = false;
  showBulletPoints2: boolean = false;
  showBulletPoints3: boolean = false;
  showBulletPoints4: boolean = false;

  toggleServices2() {
    this.isOpen2 = !this.isOpen2;
  }

  isDropdownDesktopOpen: boolean = false;

  toggleDropdownDesktop() {
    this.isDropdownDesktopOpen = !this.isDropdownDesktopOpen;
  }

  private window: any;
  phone1: any;

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

  corporateEnquiryForm: boolean = false;

  toggleCorporateEnquiryForm(): void {
    this.corporateEnquiryForm = !this.corporateEnquiryForm;
  }


   //Services popup
   corporateEnquiryFormMobile: boolean = false;

   toggleCorporateEnquiryFormMobile(): void {
     this.corporateEnquiryFormMobile = !this.corporateEnquiryFormMobile;
   }
 

  //mobile widget icons
  selectedIndex: number = -1; // Initialize selectedIndex to -1, indicating no icon is selected

  selectIcon(index: number) {
    this.selectedIndex = index; // Set the selectedIndex to the clicked icon index
  }

  // Toggle Speciality
  selectedService: string | null = null; // Track the selected service

  togglePopup2(service: string) {
    this.selectedService = service; // Set the selected service
  }

  clearPopup() {
    this.selectedService = null; // Clear the selected service when closing the popup
  }

  // Toggle Urgentcare at home
  selectedServiceDesktop: string | null = null; // Track the selected specialty

  togglePopup2Desktop(serviceDesktop: string) {
    this.selectedServiceDesktop = serviceDesktop; // Set the selected specialty
  }

  clearPopupDesktop() {
    this.selectedServiceDesktop = null; // Clear the selected specialty when closing the popup
  }

  // Toggle Urgentcare at home
  selectedServiceMobile: string | null = null; // Track the selected specialty

  togglePopup2Mobile(serviceMobile: string) {
    this.selectedServiceMobile = serviceMobile; // Set the selected specialty
  }

  clearPopupMobile() {
    this.selectedServiceMobile = null; // Clear the selected specialty when closing the popup
  }




    // Toggle Urgentcare at home
    selectedSolutionMobile: string | null = null; // Track the selected specialty

    toggleSolutionMobile(serviceMobile: string) {
      this.selectedSolutionMobile = serviceMobile; // Set the selected specialty
    }
  
    clearPopupSulutionMobile() {
      this.selectedSolutionMobile = null; // Clear the selected specialty when closing the popup
    }




  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth <= 768; // Adjust as needed
  }

  vmedo_labs_desktop: SwiperOptions = {
    slidesPerView: 2,
    navigation: true,
  };

  vmedo_review_desktop: SwiperOptions = {
    slidesPerView: 3,
  };

  vmedo_review_mobile: SwiperOptions = {
    slidesPerView: 1.2,
    pagination: false,
  };

  other_services_mobile: SwiperOptions = {
    slidesPerView: 2.4,
    pagination: false,
  };

  our_other_services_dektop: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 14,
  };

  our_services_dektop: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 14,
    navigation: true,
  };

  vmedo_urgent_care_at_home_mobile: SwiperOptions = {
    slidesPerView: 2.4,
    pagination: false,
  };

  ngOnInit(): void {
    this.phone1 = 7406000534;

    this.titleService.setTitle(
      'Occupational health services for corporates in India | VMEDO for corporates'
    );

    this.metaTagService.addTags([
      {
        name: 'description',
        content:
          'OHC clinics,Doctor,Nurse,Standby Ambulance,Health and safety training and employee checkup all under one roof',
      },
      {
        name: 'author',
        content: 'VMEDO',
      },
    ]);
  }


  submitForm() {

    this.app.ShowLoader();

    // Convert phone number from string to number
    this.formData.phone = Number(this.formData.phone);

    // Convert employee count from string to number
    this.formData.employeecount = Number(this.formData.employeecount);

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
                  employeecount: null,
                  servicerequest:'',
                  message:'',
                  formtype: 1 
              };
              // Close the form (you need to implement this logic based on how the form is displayed)
              // Close the form by toggling the visibility flag
              this.toggleCorporateEnquiryForm();
              this.toggleCorporateEnquiryFormMobile();

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
        employeecount: null,
        servicerequest: '',
        message: '',
        formtype: 1
    };
    
    // Close the form
    this.toggleCorporateEnquiryForm();
    this.toggleCorporateEnquiryFormMobile();
}


  closeForm() {

    console.log('Form Closes');
    // Add logic here to close the form, such as setting a boolean flag to false if the form is a modal or navigating away if it's a separate page
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
    public app: AppComponent,
    private http: HttpClient,
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
}
