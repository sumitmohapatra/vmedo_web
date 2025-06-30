import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  positionClass = 'toast-top-right';
  
  /**
   * SUCCESS NOTIFICATION
   * @param body 
   * @param header 
   */
  Success(body: any, header: any = undefined) {
    if(header)
      this.toastr.success(body, header, {
        positionClass: this.positionClass 
     });
    else
      this.toastr.success(body, '', {
        positionClass: this.positionClass 
     });
  }
    
  /**
   * FAILED NOTIFICATION
   * @param body 
   * @param header 
   */
  Error(body: any, header: any = undefined) {
    if(header)
      this.toastr.error(body, header, {
        positionClass: this.positionClass 
     });
    else
      this.toastr.error(body, '', {
        positionClass: this.positionClass 
     });
  }
    
  /**
   * INFO NOTIFICATION
   * @param body 
   * @param header 
   */
  Info(body: any, header: any = undefined) {
    if(header)
      this.toastr.info(body, header, {
        positionClass: this.positionClass 
     });
    else
      this.toastr.info(body, '', {
        positionClass: this.positionClass 
     });
  }
    
  /**
   * WARNING NOTIFICATION
   * @param body 
   * @param header 
   */
  Warning(body: any, header: any = undefined) {
    if(header)
      this.toastr.warning(body, header, {
        positionClass: this.positionClass 
     });
    else
      this.toastr.warning(body, '', {
        positionClass: this.positionClass 
     });
  }
}
