import { Component, ViewChild  } from '@angular/core';
import { CommonService } from './service/common.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  
  isReadOnly:boolean = true;
  inputValue = '';

  onInputClick() {
    this.isReadOnly = false;
    
  }
  

  regex: any = {};

  /**
   * CONSTRUCTOR
   * @param common
   * @param route
   * 

   */
 
  constructor(public common: CommonService, private route: Router ){
    this.OnPageLoad();
    
  }
 
 

  
  /**
   * LOADING PAGE (PROPERTIES | REGEX)
   */
  OnPageLoad = () => {
    this.common.property.GetProperties().then((res: any) => {
      if (res)
        this.common.propInfo = res;
      this.regex = this.common.propInfo.regex;
    }).catch((rej: any) => {
      this.ShowError(`${rej.message}`);
    });

    
  };

  /**
   * RESETTING INPUT FIELD
   * @param model
   * @param event
   */
  OnTextChanged = (model: any, event: any) => {
    if (model === 'txtLoginId')
      this.lblLoginId = undefined;
    if (model === 'txtLoginPass')
      this.lblLoginPass = undefined;
    if (model === 'txtRegUserName')
      this.lblRegUserName = undefined;
    if (model === 'txtRegEmailId')
      this.lblRegEmailId = undefined;
    if (model === 'txtRegMobileNo')
      this.lblRegMobileNo = undefined;
   
    if (model === 'txtMobileNo')
      this.lblMobileNo = undefined;
    if (model === 'txtOTP')
      this.lblOTP = undefined;
    if (model === 'txtRegOTP')
      this.lblRegOTP = undefined;
  };

  //#region LOGIN MODAL

  /** LOGIN MODAL OBJECTS & VARIABLES */
  @ViewChild('login') loginModal: any;
  loginModalRef: any;
  // public loginType: any = 'user';
  public loginType: any = 'otp';
  public IsEnableUserLogin: any = true;
  private loginError: any;

  /**
   * OPENING LOGIN MODAL
   * @param content
   */
  OpenLoginModal(content: any) {
    this.loginModalRef = this.common.modal.OpenModal(content);
    this.loginModalRef.result.finally(() => {
      this.ClearLoginModal();
    });
  }
 
  onClosePopup() {
    this.isReadOnly = true;
  }

  /**
   * CLOSING LOGIN MODAL
   * @param message
   */
  CloseLoginModal = (message: any) => {
    this.onClosePopup();
    this.loginModalRef.close(message);
  };

  /**
   * RESETTING LOGIN MODAL
   */
  private ClearLoginModal = () => {

    this.onClosePopup();

    this.txtLoginId = '';
    this.txtLoginPass = '';
    this.txtMobileNo = '';
    this.txtOTP = '';
    this.lblLoginId = undefined;
    this.lblLoginPass = undefined;
    this.lblMobileNo = undefined;
    this.lblOTP = undefined;
    this.isOTPSent = false;
    this.loginType = 'otp';
    this.IsEnableUserLogin = true;
  };

  //#endregion

  //#region LOGIN FORM

  /** LOGIN MODAL VARIABLES & PROPERTIES */
  txtLoginId: any;
  txtLoginPass: any;
  lblLoginId: any;
  lblLoginPass: any;
  txtMobileNo: any;
  lblMobileNo: any;
  txtOTP: any;
  lblOTP: any;
  isOTPSent: any = false;
  isResendOTPSent: any = false;

  /**
   * VALIDATING LOGIN FORM CONTROLS
   * @returns (BOOLEAN)
   */
  IsValidLogin = () => {
    if (this.loginType === 'user') {
      if (this.txtLoginId === undefined || this.txtLoginId === '') {
        this.lblLoginId = `Please enter valid email id !`;
        return false;
      }

      if (!this.common.IsValid('email', this.txtLoginId, this.regex)) {
        this.lblLoginId = this.regex['email'].message;
        return false;
      }

      if (!this.common.IsValid('short-string', this.txtLoginPass, this.regex)) {
        this.lblLoginPass = this.regex['short-string'].message;
        return false;
      }
    }
    if (this.loginType === 'otp') {
      if (this.txtMobileNo === undefined || this.txtMobileNo === '') {
        this.lblMobileNo = `Please enter valid mobile no !`;
        return false;
      }

      if (!this.common.IsValid('mobile', this.txtMobileNo, this.regex)) {
        this.lblMobileNo = this.regex['mobile'].message;
        return false;
      }

      if (this.txtOTP !== undefined && this.isOTPSent === true) {
        if (!this.common.IsValid('otp', this.txtOTP, this.regex)) {
          this.lblOTP = this.regex['otp'].message;
          return false;
        }
      }
    }

    return true;
  };

  /**
   * ON CLICKING LOGIN BUTTON
   * @returns (PROMISE)
   */
  OnClickLogin = () => {
    this.loginError = undefined;

    return new Promise((res: any, rej: any) => {
      if (this.IsValidLogin()) {
        this.ShowLoader();

        var userInfo = {
          userCredential: this.txtLoginId,
          userPassword: this.txtLoginPass
        };

        this.common.api.UserLogin(userInfo).then((resolve: any) => {
          this.common.logger.info('USER LOGIN >> SUCCESS');
          if (resolve.objret) {
            this.common.userInfo = resolve.objret;
            localStorage.setItem('userInfo', JSON.stringify(resolve.objret));
          }
          this.CloseLoginModal('success');
        }).catch((reject: any) => {
          this.common.logger.error('USER LOGIN >> FAILED');
          this.loginError = reject;
          this.ShowError(`Invalid Username or Password!`).finally(() => this.HideLoader());
          // this.CloseLoginModal('failed');
        });
      }
    });
  };

  /**
   * ON CLICKING SEND OTP BUTTON
   * @returns (PROMISE)
   */
  OnClickSendOTP = () => {
    this.loginError = undefined;

    return new Promise((res: any, rej: any) => {
      if (this.IsValidLogin()) {
        this.ShowLoader();

        var userInfo = {
          userMobile: this.txtMobileNo
        };

        this.common.api.SendOTP(userInfo).then((resolve: any) => {
          this.common.logger.info('USER SEND OTP >> SUCCESS');
          this.isOTPSent = true;
          this.txtOTP = '';
          this.ShowSuccess(`OTP sent successfully`).finally(() => this.HideLoader());
        }).catch((reject: any) => {
          this.common.logger.error('USER SEND OTP >> FAILED');
          this.isOTPSent = false;
          this.loginError = reject;
          this.ShowError(reject.message).finally(() => this.HideLoader());
        });
      }
    });
  };

  /**
   * ON CLICKING OTP LOGIN BUTTON
   * @returns (PROMISE)
   */
  OnClickOTPLogin = () => {
    this.loginError = undefined;

    return new Promise((res: any, rej: any) => {
      if (this.IsValidLogin()) {
        this.ShowLoader();

        var userInfo = {
          userCredential: this.txtMobileNo,
          userOtp: this.txtOTP
        };

        this.common.api.UserOTPLogin(userInfo).then((resolve: any) => {
          this.common.logger.info('USER OTP LOGIN >> SUCCESS');
          if (resolve.objret) {
            this.common.userInfo = resolve.objret;
            localStorage.setItem('userInfo', JSON.stringify(resolve.objret));
          }
          this.CloseLoginModal('success');
        }).catch((reject: any) => {
          this.common.logger.error('USER OTP LOGIN >> FAILED');
          this.loginError = reject;
          // this.CloseLoginModal('failed');
          this.ShowError(reject.message).finally(() => this.HideLoader());
        });
      }
    });
  };

  /**
   * ON CLICKING PROFILE ICON
   */
  OnOpenLoginForm = (path: any, flag: any = false) => {
    localStorage.setItem("subscriptionPackagesName", flag);
    this.common.viewSubscription(flag);
    if (!this.common.auth_token) {
      this.Login().then((res: any) => {
        if (res === 'success'){
          // this.route.navigate(['/dashboard/profile']);
          var userInfo: any = JSON.parse(localStorage.getItem("userInfo"));
          if (userInfo.isPaidUser) {
            this.route.navigate(['/dashboard/profile']);
          }else{
            this.route.navigate([`/${path}`]);
          }
        }
      });
    }
    else {
      if (flag === true)
        this.route.navigate([`/${path}`]);
      else
        //  this.route.navigate(['/dashboard/profile/1']);
        this.route.navigate(['/dashboard/profile']);
    }
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


  // Corporate Login 


  /**
   * RESETTING INPUT FIELD
   * @param model
   * @param event
   */
  OnCorpTextChanged = (model: any, event: any) => {
    if (model === 'txtCorpLoginId')
      this.lblCorpLoginId = undefined;
  
 
    if (model === 'txtCorpRegMobileNo')
      this.lblCorpRegMobileNo = undefined;

    if (model === 'txtCorpMobileNo')
      this.lblCorpMobileNo = undefined;
    if (model === 'txtCorpOTP')
      this.lblCorpOTP = undefined;
    if (model === 'txtCorpRegOTP')
      this.lblCorpRegOTP = undefined;
  };

  //#region LOGIN MODAL

  /** LOGIN MODAL OBJECTS & VARIABLES */
  @ViewChild('corporatelogin') loginCorpModal: any;
  loginCorpModalRef: any;
  // public loginType: any = 'user';
  public loginCorpType: any = 'CorpOTP';
  public IsEnableUserCorpLogin: any = true;
  private loginCorpError: any;

  /**
   * OPENING LOGIN MODAL
   * @param content
   */
  OpenLoginCorpModal(content: any) {
    this.loginCorpModalRef = this.common.modal.OpenModal(content);
    this.loginCorpModalRef.result.finally(() => {
      this.ClearCorpLoginModal();
    });
  }
 
  onCloseCorpPopup() {
    this.isReadOnly = true;
  }

  /**
   * CLOSING LOGIN MODAL
   * @param message
   */
  CloseLoginCorpModal = (message: any) => {
    this.onCloseCorpPopup();
    this.loginCorpModalRef.close(message);
  };

  /**
   * RESETTING LOGIN MODAL
   */
  private ClearCorpLoginModal = () => {

    this.onCloseCorpPopup();

    this.txtCorpLoginId = '';
   
    this.txtCorpMobileNo = '';
    this.txtCorpOTP = '';
    this.lblCorpLoginId = undefined;
   
    this.lblCorpMobileNo = undefined;
    this.lblCorpOTP = undefined;
    this.isCorpOTPSent = false;
    this.loginCorpType = 'CorpOTP';
    this.IsEnableUserCorpLogin = true;
  };

  //#endregion

  //#region LOGIN FORM

  /** LOGIN MODAL VARIABLES & PROPERTIES */
  txtCorpLoginId: any;
 
  lblCorpLoginId: any;
 
  txtCorpMobileNo: any;
  lblCorpMobileNo: any;
  txtCorpOTP: any;
  lblCorpOTP: any;
  isCorpOTPSent: any = false;
  isCorpResendOTPSent: any = false;

  /**
   * VALIDATING LOGIN FORM CONTROLS
   * @returns (BOOLEAN)
   */
  IsCorpValidLogin = () => {
 
    if (this.loginCorpType === 'otp') {
      if (this.txtCorpMobileNo === undefined || this.txtCorpMobileNo === '') {
        this.lblCorpMobileNo = `Please enter valid mobile no !`;
        return false;
      }

      if (!this.common.IsValid('mobile', this.txtCorpMobileNo, this.regex)) {
        this.lblCorpMobileNo = this.regex['mobile'].message;
        return false;
      }

      if (this.txtCorpOTP !== undefined && this.isCorpOTPSent === true) {
        if (!this.common.IsValid('otp', this.txtCorpOTP, this.regex)) {
          this.lblCorpOTP = this.regex['otp'].message;
          return false;
        }
      }
    }

    return true;
  };

  /**
   * ON CLICKING LOGIN BUTTON
   * @returns (PROMISE)
   */
  OnClickCorpLogin = () => {
    this.loginCorpError = undefined;

    return new Promise((res: any, rej: any) => {
      if (this.IsValidLogin()) {
        this.ShowLoader();

        var userInfo = {
          userCredential: this.txtLoginId,
          userPassword: this.txtLoginPass
        };

        this.common.api.UserLogin(userInfo).then((resolve: any) => {
          this.common.logger.info('USER LOGIN >> SUCCESS');
          if (resolve.objret) {
            this.common.userInfo = resolve.objret;
            localStorage.setItem('userInfo', JSON.stringify(resolve.objret));
          }
          this.CloseLoginModal('success');
        }).catch((reject: any) => {
          this.common.logger.error('USER LOGIN >> FAILED');
          this.loginError = reject;
          this.ShowError(`Invalid Username or Password!`).finally(() => this.HideLoader());
          // this.CloseLoginModal('failed');
        });
      }
    });
  };

  /**
   * ON CLICKING SEND OTP BUTTON
   * @returns (PROMISE)
   */
  OnClickSendCorpOTP = () => {
    this.loginCorpError = undefined;

    return new Promise((res: any, rej: any) => {
      if (this.IsCorpValidLogin()) {
        this.ShowLoader();

        var employeeInfo = {
          employeeMobile: this.txtCorpMobileNo
        };

        console.log(employeeInfo);

        this.common.api.SendCorpOTP(employeeInfo).then((resolve: any) => {
          this.common.logger.info('EMPLOYEE SEND OTP >> SUCCESS');
          this.isCorpOTPSent = true;
          this.txtCorpOTP = '';
          this.ShowSuccess(`OTP sent successfully`).finally(() => this.HideLoader());
        }).catch((reject: any) => {
          this.common.logger.error('EMPLOYEE SEND OTP >> FAILED');
          this.isCorpOTPSent = false;
          this.loginCorpError = reject;
          this.ShowError(reject.message).finally(() => this.HideLoader());
        });
      }
    });
  };

   /**
   * ON CLICKING OTP LOGIN BUTTON
   * @returns (PROMISE)
   */
   OnClickCorpOTPLogin = () => {
    this.loginCorpError = undefined;

    return new Promise((res: any, rej: any) => {
      if (this.IsCorpValidLogin()) {
        this.ShowLoader();

        var employeeInfo = {
          userCredential: this.txtCorpMobileNo,
          userOtp: this.txtCorpOTP
        };

        this.common.api.corpOTPLogin(employeeInfo).then((resolve: any) => {
          this.common.logger.info('EMPLOYEE OTP LOGIN >> SUCCESS');
          if (resolve.objret) {
            this.common.userInfo = resolve.objret;
            localStorage.setItem('userInfo', JSON.stringify(resolve.objret));
          }
          // this.CloseLoginCorpModal('success');
          this.ClearCorpLoginModal();
          this.route.navigate(['/dashboard/corporate']);
          // this.CloseLoginCorpModal('success');

        }).catch((reject: any) => {
          this.common.logger.error('EMPLOYEE OTP LOGIN >> FAILED');
          this.loginCorpError = reject;
          // this.CloseLoginModal('failed');
          this.ShowError(reject.message).finally(() => this.HideLoader());
        });
      }
    });
  };


  /**
   * ON CLICKING OTP LOGIN BUTTON
   * @returns (PROMISE)
   */
  // OnClickCorpOTPLogin = () => {
  //   this.loginCorpError = undefined;

  //   return new Promise((res: any, rej: any) => {
     
  //       this.ShowLoader();

  //       var employeeInfo = {
  //         userCredential: this.txtCorpMobileNo,
  //         userOtp: this.txtCorpOTP
  //       };

  //       this.common.api.corpOTPLogin(employeeInfo).then((resolve: any) => {
  //         this.common.logger.info('EMPLOYEE OTP LOGIN >> SUCCESS');
  //         if (resolve.objret) {
  //           this.common.userInfo = resolve.objret;
  //           localStorage.setItem('userInfo', JSON.stringify(resolve.objret));
  //         }
  //         this.CloseLoginCorpModal('success');
  //       }).catch((reject: any) => {
  //         this.common.logger.error('EMPLOYEE OTP LOGIN >> FAILED');
  //         this.loginCorpError = reject;
  //         // this.CloseLoginModal('failed');
  //         this.ShowError(reject.message).finally(() => this.HideLoader());
  //       });
      
  //   });
  // };

  /**
   * ON CLICKING PROFILE ICON
   */
  OnOpenCorpLoginForm = (path: any, flag: any = false) => {
    if (!this.common.auth_token) {
      this.corpLogin().then((res: any) => {
        if (res === 'success')
          // this.route.navigate(['/dashboard/profile']);
          this.route.navigate([`/${path}`]);
        
      });
    }
    else {
      if (flag === true)
        this.route.navigate([`/${path}`]);
      else
        //  this.route.navigate(['/dashboard/profile/1']);
        this.route.navigate(['/dashboard/corporate']);
        
    }
    
  };


  //Corporate Login



  /**
 * ON CLICKING PROFILE ICON
 */
  OnOpenEmergencyLoginForm = (path: any, flag: any = false) => {
    if (!this.common.auth_token) {
      this.Login().then((res: any) => {
        if (res === 'success') {


          localStorage.setItem('emtext', "hello");


          this.route.navigate([`/${path}`]).then(() => {


            // do whatever you need after navigation succeeds
          });

        }
      });
    }
    else {
      if (flag === true) {
        localStorage.setItem('emtext', "createemcard");
        this.route.navigate([`/${path}`]);
      }

      else
        this.route.navigate(['/dashboard/profile/1']);
    }
  };





  /**
   * LOGIN PROCESS
   * @returns (PROMISE)
   */
  Login = () => {
    this.HideLoader();
    this.loginModalRef = this.common.modal.OpenModal(this.loginModal);
    return new Promise((resolve: any, reject: any) => {
      this.loginModalRef.result.then((res: any) => {
        if (res === 'success') {
          this.ShowSuccess('User logged in successfully').finally(() => {
            resolve(res);
          });
        }
        if (res === 'failed') {
          // var msg = this.loginError.message;
          var msg = 'Invalid username or password !';
          this.ShowError(`${msg}`).finally(() => {
            resolve(res);
          });
        }
      }).catch(() => {
        resolve('auto');
      }).finally(() => {
        this.ClearLoginModal();
      });
    });
  };

  //#endregion

  // Corporate Login

    /**
   * LOGIN PROCESS
   * @returns (PROMISE)
   */
    corpLogin = () => {
      this.HideLoader();
      this.loginModalRef = this.common.modal.OpenModal(this.loginCorpModal);
      return new Promise((resolve: any, reject: any) => {
        this.loginCorpModal.result.then((res: any) => {
          if (res === 'success') {
            this.ShowSuccess('Employee logged in successfully').finally(() => {
              resolve(res);
            });
          }
          if (res === 'failed') {
            // var msg = this.loginError.message;
            var msg = 'Invalid username or password !';
            this.ShowError(`${msg}`).finally(() => {
              resolve(res);
            });
          }
        }).catch(() => {
          resolve('auto');
        }).finally(() => {
          this.ClearCorpLoginModal();
        });
      });
    };

  //#region REGISTER MODAL

  /** REGISTER MODAL OBJECTS & VARIABLES */
  @ViewChild('register') registerModal: any;
  registerModalRef: any;
  private registerError: any;

  /**
   * OPENING REGISTER MODAL
   * @param content
   */
  OpenRegisterModal(content: any) {
    this.CloseLoginModal('auto');
    this.registerModalRef = this.common.modal.OpenModal(content);
    this.registerModalRef.result.finally(() => {
      this.ClearRegisterModal();
    });
  }

  /**
   * CLOSING REGISTER MODAL
   * @param message
   */

  CloseRegisterModal = (message: any) => {
    this.registerModalRef.close(message);
  };

  /**
   * RESETIING REGISTER MODAL
   */
  ClearRegisterModal = () => {
    this.txtRegUserName = '';
    this.txtRegEmailId = '';
    this.txtRegMobileNo = '';
    this.txtRegOTP = '';
   
    this.lblRegUserName = undefined;
    this.lblRegEmailId = undefined;
    this.lblRegMobileNo = undefined;
    this.lblRegOTP = undefined;

    this.isOTPSentOnRegister = false;
    this.isMobileVerified = false;
  };

  //#endregion

  //#region REGISTER FORM

  /** LOGIN MODAL VARIABLES & PROPERTIES */
  txtRegUserName: any;
  txtRegEmailId: any;
  txtRegMobileNo: any;
  txtRegNewPassword: any;
  lblRegUserName: any;
  lblRegEmailId: any;
  lblRegMobileNo: any;
  



  /** CorpLOGIN MODAL VARIABLES & PROPERTIES */

  txtCorpRegMobileNo: any;

  lblCorpRegMobileNo: any;


  /**
   * VALIDATING REGISTER FORM CONTROLS
   * @returns (BOOLEAN)
   */
  IsValidRegister = () => {
    if (this.txtRegUserName === undefined || this.txtRegUserName === '') {
      this.lblRegUserName = `Please enter valid user name !`;
      return false;
    }

    if (!this.common.IsValid('short-string2', this.txtRegUserName, this.regex)) {
      this.lblRegUserName = this.regex['short-string2'].message;
      return false;
    }

    if (this.txtRegEmailId === undefined || this.txtRegEmailId === '') {
      this.lblRegEmailId = `Please enter valid email id !`;
      return false;
    }

    if (!this.common.IsValid('email', this.txtRegEmailId, this.regex)) {
      this.lblRegEmailId = this.regex['email'].message;
      return false;
    }

    if (this.txtRegMobileNo === undefined || this.txtRegMobileNo === '') {
      this.lblRegMobileNo = `Please enter valid mobile number !`;
      return false;
    }

    if (!this.common.IsValid('mobile', this.txtRegMobileNo, this.regex)) {
      this.lblRegMobileNo = this.regex['mobile'].message;
      return false;
    }

  

    /*if(!this.common.IsValid('password', this.txtRegConfirmPassword, this.regex)){
      this.lblRegConfirmPassword = this.regex['password'].message;
      return false;
    }

    if(this.txtRegNewPassword !== this.txtRegConfirmPassword){
      this.lblRegConfirmPassword = 'Password did not match !';
      return false;
    }*/

    return true;
  };

  /**
   * ON CLICKING REGISTER BUTTON
   * @returns (PROMISE)
   */
  OnClickRegister = () => {
    this.registerError = undefined;

    return new Promise((res: any, rej: any) => {
      if (this.IsValidRegister()) {
        this.ShowLoader();

        var userInfo = {
          userName: this.txtRegUserName,
          userMobile: this.txtRegMobileNo,
          userEmail: this.txtRegEmailId,
          userPassword: this.txtRegNewPassword = "",
          utype: 1
        };

        const userAutoLoginData = {
          userMobile: userInfo.userMobile,
          
        };

        this.common.api.UserRegister(userInfo).then((resolve: any) => {
          this.common.logger.info('USER REGISTER >> SUCCESS');
          this.CloseRegisterModal('success');


          localStorage.setItem('userData', JSON.stringify(userAutoLoginData));
          // this.ShowSuccess('User registered successfully');


        }).catch((reject: any) => {
          this.common.logger.error('USER REGISTER >> FAILED');
          this.registerError = reject;
          // this.CloseRegisterModal('failed');
          this.ShowError(reject.message).finally(() => this.HideLoader());
        });
      }
    });
  };

  /**
   * ON CLICKING REGISTER USER
   */
  OnOpenRegisterForm = () => {
    this.CloseLoginModal('auto');
    this.Register();
  };

  OnOpennCorpLoginForm = () => {
    this.CloseLoginModal('auto');
    this.onCloseCorpPopup();
    this.ClearCorpLoginModal();
   
    this.corpLogin();
    // this.OnOpenCorpLoginForm('');
    
  }

 

  /**
   * REGISTER PROCESS
   * @returns (PROMISE)
   */
  Register = () => {
    this.HideLoader();
    this.registerModalRef = this.common.modal.OpenModal(this.registerModal);
    return new Promise((resolve: any, reject: any) => {
      this.registerModalRef.result.then((res: any) => {
        
        if (res === 'success') {

          let userCredential = this.txtRegEmailId;
          let userPassword = this.txtRegNewPassword = "";

          const userData = JSON.parse(localStorage.getItem('userData') || '{}');

          if (userData && userData.userEmail && userData.userPassword) {
            userCredential = userData.userEmail;
            userPassword = userData.userPassword;
          }

          var userInfo = {
            userCredential: userCredential,
            userPassword: userPassword
          };

          console.log(userInfo);

          this.common.api.UserLogin(userInfo).then((resolve: any) => {
            this.common.logger.info('USER LOGIN >> SUCCESS');
            if (resolve.objret) {
              this.common.userInfo = resolve.objret;
              localStorage.setItem('userInfo', JSON.stringify(resolve.objret));
              this.common.viewSubscription('All');
              this.route.navigate(['/dashboard/package']);

              const userInfoPromise = new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve(localStorage.getItem('userID'));
                }, 0);
              });
  
              userInfoPromise.then((data: any) => {
                this.route.navigate(['/dashboard/package']);
              });

            }

            // this.CloseLoginModal('success');
          }).catch((reject: any) => {
            this.common.logger.error('USER LOGIN >> FAILED');
            this.loginError = reject;
            this.ShowError(`Invalid Username or Password!`).finally(() => this.HideLoader());
            // this.CloseLoginModal('failed');
          });


         //  this.route.navigate(['/dashboard/package']);

          // this.ShowSuccess('OTP validated successfully').then(() => {

          //   this.route.navigate(['/dashboard/package']);

          // }).finally(() => {
          //   resolve(res);
          // });


        }

        
        // this.route.navigate(['/dashboard/package']).then(() => {
  
        //   // do whatever you need after navigation succeeds
        // }).finally(() => {
        //   resolve(res);
        // });


        if (res === 'failed') {
          this.ShowError(`${this.registerError.message}`).finally(() => {
            resolve(res);
          });
        }
      }).catch(() => {
        resolve('auto');
      }).finally(() => {
        this.ClearRegisterModal();
      });
    });
  };

  //#endregion

  //#region CONTACT MODAL

  /** CONTACT MODAL OBJECTS & VARIABLES */
  @ViewChild('contact') contactModal: any;
  contactModalRef: any;

  /**
   * OPENING CONTACT MODAL
   * @param content
   */
  OpenContactModal(content: any) {
    this.contactModalRef = this.common.modal.OpenModal(content);
    this.contactModalRef.result.finally(() => {
      this.ClearContactModal();
    });
  }

  /**
   * CLOSING CONTACT MODAL
   * @param message
   */
  CloseContactModal = (message: any) => {
    this.contactModalRef.close(message);
  };

  /**
   * RESETTING CONTACT MODAL
   */
  ClearContactModal = () => {
    this.contacts = [];
  };

  //#endregion

  //#region CONTACT FORM

  contacts: any = [];

  /**
   * SHOWING CONTACTS
   * @param contacts
   */
  ShowContact = (contacts: any) => {
    this.contacts = contacts;
    this.OpenContactModal(this.contactModal);
  };

  //#endregion




  //#region STATUS MODAL

  /** STATUS MODAL OBJECTS & VARIABLES */
  @ViewChild('status') statusModal: any;
  statusModalRef: any;
  statusType: any;
  statusMessage: any;

    /**
   * SHOWING SUCCESS MODAL
   * @param message
   * @returns (PROMISE)
   */
    ShowModal = (message: any) => {
      this.HideLoader();
      this.statusType = 'modal-pop-up';
      this.statusMessage = message;
      this.statusModalRef = this.common.modal.OpenModal(this.statusModal);
      return new Promise((resolve: any, reject: any) => {
        this.statusModalRef.result.finally(() => {
          resolve();
        });
      });
    };

  /**
   * SHOWING SUCCESS MODAL
   * @param message
   * @returns (PROMISE)
   */
  ShowSuccess = (message: any) => {
    this.HideLoader();
    this.statusType = 'success';
    this.statusMessage = message;
    this.statusModalRef = this.common.modal.OpenModal(this.statusModal);
    return new Promise((resolve: any, reject: any) => {
      this.statusModalRef.result.finally(() => {
        resolve();
      });
    });
  };

  /**
   * SHOWING ERROR | FAILED MODAL
   * @param message
   * @returns (PROMISE)
   */
  ShowError = (message: any) => {
    this.HideLoader();
    this.statusType = 'failed';
    this.statusMessage = message;
    this.statusModalRef = this.common.modal.OpenModal(this.statusModal);
    return new Promise((resolve: any, reject: any) => {
      this.statusModalRef.result.finally(() => {
        resolve();
      });
    });
  };

  /**
   * SHOWING INFO MODAL
   * @param message
   * @returns (PROMISE)
   */
  ShowInfo = (message: any) => {
    this.HideLoader();
    this.statusType = 'info';
    this.statusMessage = message;
    this.statusModalRef = this.common.modal.OpenModal(this.statusModal);
    return new Promise((resolve: any, reject: any) => {
      this.statusModalRef.result.finally(() => {
        resolve();
      });
    });
  };

  /**
   * SHOWING WARNING MODAL
   * @param message
   * @returns (PROMISE)
   */
  ShowWarn = (message: any) => {
    this.HideLoader();
    this.statusType = 'warn';
    this.statusMessage = message;
    this.statusModalRef = this.common.modal.OpenModal(this.statusModal);
    return new Promise((resolve: any, reject: any) => {
      this.statusModalRef.result.then((res: any) => {
        if (res === 'OK')
          resolve();
        else
          reject();
      }).catch((rej: any) => {
        reject();
      });
    });
  };

  //#endregion

  //#region STATUS LOADER

  statusLoader: any = false;
  onlyBackdrop: any = false;

  /**
   * SHOWING LOADER
   */
  ShowLoader = (isOnlyBackdrop: any = false) => {
    this.onlyBackdrop = isOnlyBackdrop;
    this.statusLoader = true;
    if (this.statusModalRef)
      this.common.modal.CloseModal(this.statusModalRef);
  };

  /**
   * HIDING LOADER
   */
  HideLoader = (isOnlyBackdrop: any = false) => {
    this.onlyBackdrop = isOnlyBackdrop;
    this.statusLoader = false;
    if (this.statusModalRef)
      this.common.modal.CloseModal(this.statusModalRef);
  };

  //#endregion

  ShowErrorMessage = (message: any) => {
    this.common.toaster.Error(message);
  };


  isOTPSentOnRegister: any = false;
  isMobileVerified: any = false;
  txtRegOTP: any;
  lblRegOTP: any;

  IsValidRegOTP = () => {
    if (this.txtRegOTP === undefined)
      this.txtRegOTP = '';

    if (this.txtRegOTP === '') {
      this.lblRegOTP = 'Please enter valid OTP';
      return false;
    }

    return true;
  };


  

  txtCorpRegOTP: any;
  lblCorpRegOTP: any;

  IsCorpValidRegOTP = () => {
    if (this.txtCorpRegOTP === undefined)
      this.txtCorpRegOTP = '';

    if (this.txtCorpRegOTP === '') {
      this.lblCorpRegOTP = 'Please enter valid OTP';
      return false;
    }

    return true;
  };


  OnClickSendOTPOnRegister = () => {
    if (this.IsValidRegister()) {
      this.ShowLoader();

      var userInfo = {
        userMobile: this.txtRegMobileNo
      };

      this.common.api.GenerateOTPOnRegister(userInfo).then((res: any) => {
        this.isOTPSentOnRegister = true;
        this.HideLoader();
      }).catch((rej: any) => {
        this.isOTPSentOnRegister = false;
        this.ShowError(rej.message).finally(() => this.HideLoader());
      });
    }
  };

  OnClickVerifyOTPOnRegister = () => {
    if (this.IsValidRegOTP()) {
      this.ShowLoader();

      var userInfo = {
        Umobile: this.txtRegMobileNo,
        OTP: this.txtRegOTP
      };

      this.common.api.AuthenticateOTPOnRegister(userInfo).then((res: any) => {
        this.HideLoader();
        this.isMobileVerified = true;
        this.OnClickRegister();
      }).catch((rej: any) => {
        this.isMobileVerified = false;
        this.ShowError(rej.message).finally(() => this.HideLoader());
      });
    }
  };


  @ViewChild('forgotPassword') forgotPasswordModal: any;
  forgotPasswordModalRef: any;

  txtForgotMobileNo: any;
  lblForgotMobileNo: any;

  OpenForgotPasswordModal() {
    this.CloseLoginModal('');
    this.forgotPasswordModalRef = this.common.modal.OpenModal(this.forgotPasswordModal);
    this.forgotPasswordModalRef.result.finally(() => {
      this.ClearForgotPasswordModal();
    });
  }

  CloseForgotPasswordModal = (message: any) => {
    this.forgotPasswordModalRef.close(message);
  };

  private ClearForgotPasswordModal = () => {
    this.txtForgotMobileNo = '';
    this.lblForgotMobileNo = undefined;
  };

  IsValidForgotPassword = () => {
    if (this.txtForgotMobileNo === undefined)
      this.txtForgotMobileNo = '';

    if (this.txtForgotMobileNo === '') {
      this.lblForgotMobileNo = 'Please enter valid Mobile no';
      return false;
    }
    if (!this.common.IsValid('mobile', this.txtForgotMobileNo, this.regex)) {
      this.lblForgotMobileNo = this.regex['mobile'].message;
      return false;
    }

    return true;
  };

  OnClickSubmitForgotPassword = () => {
    if (this.IsValidForgotPassword()) {
      this.ShowLoader();
      this.common.api.ForgotPassword(this.txtForgotMobileNo).then((res: any) => {
        this.HideLoader();
        this.CloseForgotPasswordModal('');
        this.ShowSuccess(res.message);
      }).catch((rej: any) => {
        this.HideLoader();
        this.ShowError(rej.message);
      });
    }
  };



  @ViewChild('changePassword') changePasswordModal: any;
  changePasswordModalRef: any;

  txtOldPassword: any;
  lblOldPassword: any;
  txtNewPassword: any;
  lblNewPassword: any;
  txtConfPassword: any;
  lblConfPassword: any;

  OnClickChangePassword = () => {
    this.OpenChangePasswordModal();
  };

  OpenChangePasswordModal = () => {
    this.changePasswordModalRef = this.common.modal.OpenModal(this.changePasswordModal);
    this.changePasswordModalRef.result.finally(() => {
      this.ClearChangePasswordModal();
    });
  };

  CloseChangePasswordModal = () => {
    this.changePasswordModalRef.close();
  };

  ClearChangePasswordModal = () => {
    this.txtOldPassword = '';
    this.txtNewPassword = '';
    this.txtConfPassword = '';
  };

  OnModelValueChanged = (model: any, event: any) => {
    if (model === 'txtOldPassword')
      this.lblOldPassword = undefined;
    if (model === 'txtNewPassword')
      this.lblNewPassword = undefined;
    if (model === 'txtConfPassword')
      this.lblConfPassword = undefined;
  };

  IsValidPassword = () => {
    if (this.txtOldPassword === undefined)
      this.txtOldPassword = '';
    if (this.txtNewPassword === undefined)
      this.txtNewPassword = '';
    if (this.txtConfPassword === undefined)
      this.txtConfPassword = '';

    if (this.txtOldPassword === '') {
      this.lblOldPassword = 'Please enter valid password!';
      return false;
    }
    if (!this.common.IsValid('password', this.txtOldPassword, this.regex)) {
      this.lblOldPassword = this.regex['password'].message;
      return false;
    }

    if (this.txtNewPassword === '') {
      this.lblNewPassword = 'Please enter new password!';
      return false;
    }
    if (!this.common.IsValid('password', this.txtNewPassword, this.regex)) {
      this.lblNewPassword = this.regex['password'].message;
      return false;
    }

    if (this.txtConfPassword === '') {
      this.lblConfPassword = 'Please enter confirm password!';
      return false;
    }
    if (!this.common.IsValid('password', this.txtConfPassword, this.regex)) {
      this.lblConfPassword = this.regex['password'].message;
      return false;
    }

    if (this.txtNewPassword !== this.txtConfPassword) {
      this.lblConfPassword = 'Password mismatched!';
      return false;
    }

    return true;
  };

  OnClickUpdatePassword = () => {
    if (this.IsValidPassword()) {
      this.ShowLoader();

      var userInfo = {
        UserID: this.common.userInfo.userID,
        OPassword: this.txtOldPassword,
        NPassword: this.txtNewPassword
      };

      this.common.api.ChangePassword(userInfo, this.common.userInfo.userID).then((res: any) => {
        this.HideLoader();
        this.CloseChangePasswordModal();
        this.ShowSuccess(`Password changed successfully`);
      }).catch((rej: any) => {
        this.HideLoader();
        this.ShowError(rej.message);
      });
    } 
  };
}