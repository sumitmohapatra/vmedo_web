import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpService } from './http.service';
import { LoggerService } from './logger.service';
import { ModalService } from './modal.service';
import { PropertyService } from './property.service';
import { ToasterService } from './toaster.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ImageService } from './image.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public property!: PropertyService;
  public modal!: ModalService;
  public toaster!: ToasterService;
  public http!: HttpService;
  public api!: ApiService
  public logger!: LoggerService;
  public imgCompressor!: ImageService;
  public subcribtionCardToDisplay:any = '';

  public propInfo: any;
  public userInfo: any;
  public employeeInfo: any;
  public auth_token: any;
  public refresh_token: any;

  public donor_location: any;

  constructor(private _property: PropertyService, 
              private _modal: ModalService,
              private _toaster: ToasterService,
              private _http: HttpService,
              private _logger: LoggerService,
              private _device: DeviceDetectorService,
              private _imgCompressor: ImageService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.property = this._property;
    this.modal = this._modal;
    this.toaster = this._toaster;
    this.http = this._http;
    this.logger = this._logger;
    this.imgCompressor = this._imgCompressor;
    this.api = new ApiService(this);

    if (isPlatformBrowser(this.platformId)){

      var session_userInfo: any = localStorage.getItem('userInfo');
      this.userInfo = JSON.parse(session_userInfo);

      // var session_employeeInfo: any = localStorage.getItem('userInfo');
      // this.employeeInfo = JSON.parse(session_employeeInfo);
  
      this.auth_token = localStorage.getItem('auth_token');
      this.refresh_token = localStorage.getItem('refresh_token');
    }

  }

  /**
   * FETCHING DEVICE TYPE 
   * @returns (DESKTOP | MOBILE | TABLET)
   */
  GetDeviceType = (): any => {
    if(this._device.isDesktop())
      return 'desktop';
    if(this._device.isMobile())
      return 'mobile';
    if(this._device.isTablet())
      return 'tablet';
    return '';
  };

  /**
   * VALIDATING INPUT BY REGULAR EXPRESSIONS
   * @param name 
   * @param value 
   * @param regExObj 
   * @returns (TRUE | FALSE)
   */
  IsValid = (name: any, value: any, regExObj: any) => {
    if(!value)
      value = '';
      
    var regex = new RegExp(regExObj[name].pattern);
    return regex.test(value);
  };

  /**
   * ALLOWING INPUT ONLY NUMBERS
   * @param event 
   * @returns (TRUE | FALSE)
   */
  AllowOnlyNumbers = (event: any) => {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  };

  /**
   * VALIDATING USER IF LOGGED IN
   * @param router 
   * @param app 
   * @returns PROMISE
   */
  ValidateUser = (router: any, app: any) => {
    return new Promise((res: any, rej: any) => {
      
      // if(router.url !== '/dashboard/hospitals' && router.url !== '/dashboard/blooddonation')
      if(!router.url.includes('/dashboard/hospitals')){
        if(!this.auth_token){
          app.ShowWarn('No active Session found, please Login ! Redirecting to home page...').finally(() => {
              router.navigate(['/home']);
              rej();
          });
        }
        else{
          res();
        }
      }
      else{
        res();
      }
    });
  };

  /**
   * FETCHING DISTINCT ITEMS FROM AN ARRAY
   * @param itemArray 
   * @returns (ARRAY OF ITEMS)
   */
  GetUniqueItems = (itemArray: any) => {
    return itemArray.filter(function(elem: any, index: any, self: any) {
      return index === self.indexOf(elem);
    });
  };

  IsPropValuesEqual = (subject: any, target: any, propNames: any) => propNames.every((propName: any) => subject[propName] === target[propName]);

  /**
   * FETCHING DISTINCT ITEMS FROM AN ARRAY ITEMS
   * @param itemArray 
   * @param propName 
   * @returns (ARRAY OF ARRAY ITEMS)
   */
  GetUniqueItemsByProperties = (itemArray: any, propName: any) => {
    const propNamesArray = Array.from(propName);
  
    return itemArray.filter((item: any, index: any, array: any) =>
      index === array.findIndex((foundItem: any) => this.IsPropValuesEqual(foundItem, item, propNamesArray))
    );
  };
  
  /**
   * VALIDATING AN URL IF FILE
   * @param url 
   * @returns (TRUE | FALSE)
   */
  IsFile = (url: any) => {
    url = new URL(url);
    return url.pathname.split('/').pop().indexOf('.') > 0;
  };

  /**
   * FETCHING DIFFERENCE BETWEEN TO DATES IN DAYS
   * @param startDate 
   * @param endDate 
   * @returns (DAYS)
   */
  GetDayDifference = (startDate: string, endDate: string) => {
    var _startDate: any = new Date(startDate);
    var _endDate: any = new Date(endDate);
    var diffTime = Math.abs(_endDate - _startDate);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  /**
   * SORTING ARRAY OF OBJECTS
   * @param arrayObject 
   * @param property 
   * @returns (ARRAY OF ITEMS)
   */
  Sort = (arrayObject: any, property: any) => {
    return arrayObject.sort((a:any, b: any) => a[property].localeCompare(b[property]));
  };

  /**
   * SORTING ARRAY OF OBJECTS BY DATE
   * @param arrayObject 
   * @param property 
   * @returns (ARRAY OF ITEMS)
   */
  SortByDate = (arrayObject: any, property: any) => {
    return arrayObject.sort((a: any,b: any) => (new Date(a[property]) > new Date(b[property])) ? 1 : ((new Date(b[property]) > new Date(a[property])) ? -1 : 0))
  };

  /**
   * CONVERTING STRING TO DATE
   * @param date 
   * @returns (DATE)
   */
  StringToDate = (date: string) => {
    var dateObj = {};
    var dateArray = date.split('-');
    if(dateArray.length === 3){
      dateObj = {
        year: parseInt(dateArray[0]),
        month: parseInt(dateArray[1]),
        day: parseInt(dateArray[2])
      };
    }

    return dateObj;
  };

  /**
   * UPLOADING IMAGE
   * @param event 
   * @returns (PROMISE)
   */
  OnImageUpload = (event: any) => {
    var images: any = [];

    return new Promise((res: any, rej: any) => {
      if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = e => {          
            const album = {
                src: reader.result,
                caption: reader.result,
                thumb: reader.result
            };
            images = [];
            images.push(album);
          }
          reader.readAsDataURL(file);
      }

      if(images.length > 0)
        res(images);
      else
        rej(images);
    });
  };

  DisableSpecialCharOnKeyPress = (event: any) => {   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k == 44 || k == 46 || (k >= 48 && k <= 57)); 
  };

  RedirectToUrl = (url: any) => {
    document.location.href = url;
  };

  viewSubscription(subcritionType: any) {
    this.subcribtionCardToDisplay = subcritionType;
  }

  getSubscriptionCardToDisplay() {
    return this.subcribtionCardToDisplay;
  }
}
