import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-corporate-enquiry-form',
  templateUrl: './corporate-enquiry-form.component.html',
  styleUrls: ['./corporate-enquiry-form.component.css']
})
export class CorporateEnquiryFormComponent {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public common: CommonService,
    private router: Router,
    public app: AppComponent,
    private http: HttpClient,
    private titleService: Title,
    private metaTagService: Meta
  ) {

  }

  formData = {
    organisation: '',
    name: '',
    phone: null, // Initialize phone as number
    email: '',
    employeecount: null,
    servicerequest: '',
    message: '',
    formtype: 1 // Fixed value

  };

  @Output() closeModal:EventEmitter<void> = new EventEmitter<void>();

  private sanitizePhone(phone: string): string {
    return phone.replace(/\D/g, '').slice(-10);
  }

  submitForm() {

    this.app.ShowLoader();

    // Convert phone number from string to number
    // this.formData.phone = Number(this.formData.phone);
    this.formData.phone = this.sanitizePhone(this.formData.phone);

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
              organisation: '',
              name: '',
              phone: null,
              email: '',
              employeecount: null,
              servicerequest: '',
              message: '',
              formtype: 1
            };
            this.closeModal.emit();
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
    this.closeModal.emit()
  }
}
