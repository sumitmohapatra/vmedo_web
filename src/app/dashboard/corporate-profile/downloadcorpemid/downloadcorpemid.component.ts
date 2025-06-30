import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-downloadcorpemid',
  templateUrl: './downloadcorpemid.component.html',
  styleUrls: ['./downloadcorpemid.component.css']
})
export class DownloadcorpemidComponent {
  userData: any = [];
  iamanArray: any;
  emid: any;
  pin: any;
  username: any;
  emidUrl: any;
  emidPage: any;
  slNo: any;

  regex: any;
  links: any = {};
  device_type: any;

  myAngularxQrCode: any;
  userDataUrl: any;

  isPaidMember: any;
  package_Name: any;
  pckage_validity: any;
  subscribedDate: any;
  orgName: any;


  /**
   * CONSTRUCTOR
   * @param router 
   * @param common 
   * @param parserFormatter 
   * @param app 
   */
  constructor(@Inject(DOCUMENT) public document: Document, private router: Router, private route: ActivatedRoute, public common: CommonService, private parserFormatter: NgbDateParserFormatter, public app: AppComponent) {

    this.emidPage = `${window.location.protocol}//${window.location.host}/emid`;

  }

  ngOnInit(): void {

    this.app.ShowLoader();


    this.common.ValidateUser(this.router, this.app).then(() => {
      this.OnPageLoad();
    });


    this.userData = JSON.parse(window.localStorage.getItem('downloadDetails') as any);
    this.slNo = this.userData[0];
    this.emid = this.userData[1];
    this.pin = this.userData[2];
    this.username = this.userData[3];
    this.isPaidMember = this.userData[4];
    this.package_Name = this.userData[5];
    this.pckage_validity = this.userData[6];
    this.orgName = this.userData[7];

    console.log(this.userData);

    // Assuming 'valid_till' is already assigned a value, e.g., '2024-05-13'
    const validTillDate = new Date(this.pckage_validity);
    const subscriptionYear = validTillDate.getFullYear() - 1;

    const subscriptionDate = new Date(subscriptionYear, validTillDate.getMonth(), validTillDate.getDate());

    this.subscribedDate = subscriptionDate.toISOString();

    console.log(this.subscribedDate);

    this.userDataUrl = `https://vmedo.com/emid?id=` + this.emid + `&pin=` + this.pin;


    // this.userDataUrl = 'https://vmedo.com/emid?id='+this.emid+'&pin='+this.pin;


  }

  ngAfterViewInit() {
    setTimeout(() => {

      this.openCombinedPDF();

    }, 500)
  }



  secondPageContent: string = 'This is the second page';

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA, { scale: 3 }).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4', true);
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      // Add the second page
      PDF.addPage();
      PDF.setFontSize(14);
      PDF.text(this.secondPageContent, 10, 10);
      // PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      // Download the PDF file
       PDF.save(this.username + '_emergencycard.pdf');

      // Navigate to the next page
       this.router.navigate(['/dashboard/profile/2']);
    });
  }


  public openCombinedPDF(): void {
    // Get references to the two HTML elements
    let WelcomeLetter: any = document.getElementById('htmlData2');
    let Qrcode: any = document.getElementById('htmlData');

    // Create a new PDFDocument instance for the combined document
    const combinedPdfDoc = new jsPDF('p', 'mm', 'a4', true);

    // Define some variables for positioning the content in the PDF
    let position = 0;
    let fileWidth = 208;

    // Use html2canvas to capture the contents of the second element as an image
    html2canvas(WelcomeLetter, { scale: 1 }).then((canvas) => {

      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');

      // Add the image to the first page of the combined PDF document
      combinedPdfDoc.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      position += fileHeight;

      // Use html2canvas to capture the contents of the first element as an image
      html2canvas(Qrcode, { scale: 1 }).then((canvas) => {
        let fileHeight2 = (canvas.height * fileWidth) / canvas.width;
        const FILEURI2 = canvas.toDataURL('image/png');

        // Add the second image to the second page of the combined PDF document
        combinedPdfDoc.addPage();
        combinedPdfDoc.addImage(FILEURI2, 'PNG', 0, 0, fileWidth, fileHeight2);

        // Save the combined PDF document to the user's device
         combinedPdfDoc.save(this.slNo + '-' + this.username + '-Healthcard.pdf');

        // Navigate to the next page
         this.router.navigate(['/dashboard/corporate/2']);
      });
    });
  }

  
  OnPageLoad = () => {

    this.CorpLoadProfile();
    this.common.property.GetProperties().then((res: any) => {



      if (res)
        this.common.propInfo = res;
      if (this.common.propInfo.regex)
        this.regex = this.common.propInfo.regex;
      if (this.common.propInfo.links)
        this.links = this.common.propInfo.links;

      setTimeout(() => {

      }, 500);
    }).catch((rej: any) => {
      this.app.ShowError(`${rej.message}`);
    })



    setTimeout(() => {
      this.common.property.GetProperties().then((res: any) => {

        if (res)
          this.common.propInfo = res;
        this.device_type = this.common.GetDeviceType();


        this.regex = this.common.propInfo.regex;
        try {

          this.CorpLoadProfile().then((res: any) => {

          }).catch((rej: any) => {
            if (rej.message.toLowerCase().includes('invalid refresh token')) {
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
        catch (ex) {
          this.app.ShowError(ex);
        }
      }).catch((rej: any) => {
        this.app.ShowError(`${rej.message}`);
      });
    }, 500);
  };

  profileInfo: any;
  IsDonorAvailable: any = false;
  txtName: any;
  profileImage: any = [];
  txtisPaidMember: any;
  txtpackageName: any;
  txtpackagevalid_till: any;

  /**
   * LOADING PROFILE
   * @returns
   */

  CorpLoadProfile = () => {
    return new Promise((_res: any, _rej: any) => {
      this.common.api.GetCorpProfile(this.common.userInfo.userID).then((res: any) => {
        if (res.objret) {
          this.profileInfo = res.objret;
          this.txtName = res.objret.emp_name;
          this.orgName = res.objret.emp_organisation; 
          this.txtisPaidMember = res.objret.emp_plan;
    

          if (this.common.IsFile(res.objret.emp_profilepic)) {
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


}
