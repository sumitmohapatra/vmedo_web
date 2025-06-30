import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as httpStatus from 'http-status-codes';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apis: any = {};

  /**
   * READING APIS FROM PROPERTIES
   * @param common
   */
  constructor(private common: CommonService) {
    this.common.property.GetProperties().then((resolve: any) => {
      if(resolve.api)
        this.apis = resolve.api;
    }).catch(() => {
      console.error(`No apis found !`);
    });
  }

  //#region USER

  /**
   * PREPARING ERROR STATUS
   * @param response
   * @returns (OBJECT)
   */
  GetStatus = (response: any): any => {
    var status = {
      statusCode: 0,
      statusText: '',
      message: response.message
    };

    if(response.statusCode){
      status.statusCode = response.statusCode;
      status.statusText = httpStatus.getStatusText(response.statusCode);
    }

    if(response.status){
      status.statusCode = response.status;
      status.statusText = httpStatus.getStatusText(response.status);
    }

    return status;
  };

  /**
   * USER LOGIN
   * @param userInfo
   * @returns (PROMISE)
   */
  UserLogin = (userInfo: any) => {
    return new Promise((resolve: any, reject: any) => {
      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var body = {
        userCredential: userInfo.userCredential,
        userPassword: userInfo.userPassword
        
      };

      var url = `${this.apis.baseUrl}${this.apis.user.login.url}`;
      this.common.http.SendRequest(url, this.apis.user.login.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200){
          this.common.auth_token = res.objret.autToken;
          this.common.refresh_token = res.objret.refreshToken;

          localStorage.setItem('apis', JSON.stringify(this.apis));
          localStorage.setItem('userID', res.objret.userID);
          localStorage.setItem('auth_token', res.objret.autToken);
          localStorage.setItem('refresh_token', res.objret.refreshToken);
          resolve(res);
        }
        else
          reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(rej);
      });
    });
  };

  /**
   * SEND OTP
   * @param userInfo
   * @returns (PROMISE)
   */
  SendOTP = (userInfo: any) => {
    return new Promise((resolve: any, reject: any) => {
      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var body = {
        userMobile: userInfo.userMobile
      };

      var url = `${this.apis.baseUrl}${this.apis.user.otp.url}`;
      this.common.http.SendRequest(url, this.apis.user.otp.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200){
          resolve(res);
        }
        else
          reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(rej);
      });
    });
  };

  /**
   * USER LOGIN THROUGH OTP
   * @param userInfo
   * @returns (PROMISE)
   */
  UserOTPLogin = (userInfo: any) => {
    return new Promise((resolve: any, reject: any) => {
      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var body = {
        userCredential: userInfo.userCredential,
        userOtp: userInfo.userOtp
      };

      var url = `${this.apis.baseUrl}${this.apis.user.otpLogin.url}`;
      this.common.http.SendRequest(url, this.apis.user.otpLogin.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200){
          this.common.auth_token = res.objret.autToken;
          this.common.refresh_token = res.objret.refreshToken;

          localStorage.setItem('apis', JSON.stringify(this.apis));
          localStorage.setItem('userID', res.objret.userID);
          localStorage.setItem('auth_token', res.objret.autToken);
          localStorage.setItem('refresh_token', res.objret.refreshToken);
          localStorage.setItem('Is-user-login', 'success');
          resolve(res);
        }
        else
          reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(rej);
      });
    });
  };


  //corporate login


  /**
   * SEND OTP
   * @param employeeInfo
   * @returns (PROMISE)
   */
  SendCorpOTP = (employeeInfo: any) => {
    return new Promise((resolve: any, reject: any) => {
      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var body = {
        empcredentials: employeeInfo.employeeMobile
      };

      var url = `${this.apis.baseUrl}${this.apis.corp.corpotp.url}`;
      this.common.http.SendRequest(url, this.apis.corp.corpotp.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200){
          resolve(res);
        }
        else
          reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(rej);
      });
    });
  };

  /**
   * USER LOGIN THROUGH OTP
   * @param employeeInfo
   * @returns (PROMISE)
   */
  corpOTPLogin = (employeeInfo: any) => {
    return new Promise((resolve: any, reject: any) => {
      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var body = {
        userCredential: employeeInfo.userCredential,
        userOtp: employeeInfo.userOtp
      };

      var url = `${this.apis.baseUrl}${this.apis.corp.corpotplogin.url}`;
      this.common.http.SendRequest(url, this.apis.corp.corpotplogin.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200){
          this.common.auth_token = res.objret.autToken;
          this.common.refresh_token = res.objret.refreshToken;

          localStorage.setItem('apis', JSON.stringify(this.apis));
          localStorage.setItem('userID', res.objret.userID);
          localStorage.setItem('auth_token', res.objret.autToken);
          localStorage.setItem('refresh_token', res.objret.refreshToken);
          localStorage.setItem('Is-corporate-login', 'success');
          resolve(res);
        }
        else
          reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(rej);
      });
    });
  };

  /**
   * AUTHENTICATE USER BY AUTH TOKEN (JWT)
   * @param userId
   * @param refreshToken
   * @returns (PROMISE)
   */
  AuthenticateUser = (userId: any, refreshToken: any) => {
    return new Promise((resolve: any, reject: any) => {
      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var body = {
        userID: userId,
        refreshToken: refreshToken
      };

      var url = `${this.apis.baseUrl}${this.apis.user.auth.url}`;
      this.common.http.SendRequest(url, this.apis.user.auth.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200){
          this.common.auth_token = res.objret.autToken;
          this.common.refresh_token = res.objret.refreshToken;
          localStorage.setItem('refresh_token', res.objret.refreshToken);
          resolve(res);
        }
        else
          reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(rej);
      });
    });
  };

  /**
   * USER REGISTER
   * @param userInfo
   * @returns (PROMISE)
   */
  UserRegister = (userInfo: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var body = {
        userName: userInfo.userName,
        userMobile: userInfo.userMobile,
        userEmail: userInfo.userEmail,
        userPassword: userInfo.userPassword,
        utype: userInfo.utype
      };

      var url = `${this.apis.baseUrl}${this.apis.user.register.url}`;
      this.common.http.SendRequest(url, this.apis.user.register.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
          else
            reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(rej);
      });
    });
  };

  /**
   * FETCH USER PROFILE
   * @param userId
   * @returns (PROMISE)
   */
  GetUserProfile = (userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.user.fetchProfile.url}${userId}`;
      this.common.http.SendRequest(url, this.apis.user.fetchProfile.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetUserProfile(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
            reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetUserProfile(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });
  };

  /**
   * UPDATE USER PROFILE
   * @param userInfo
   * @returns (PROMISE)
   */
  UpdateUserProfile = (userInfo: any) =>{
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      // headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        MyObj: {
          UserID: userInfo.MyObj.UserID,
          userName: userInfo.MyObj.userName,
          userMobile: userInfo.MyObj.userMobile,
          userEmail: userInfo.MyObj.userEmail,
          profileDOB: userInfo.MyObj.profileDOB,
          profileGender: userInfo.MyObj.profileGender,
          bloodDoner: userInfo.MyObj.bloodDoner
        },
        File: userInfo.FILE.file
      };

      const formData = new FormData();
      formData.append('MyObj', JSON.stringify(body.MyObj));
      formData.append('File', body.File);

      var url = `${this.apis.baseUrl}${this.apis.user.updateProfile.url}`;
      this.common.http.SendRequest(url, this.apis.user.updateProfile.method, headers, formData).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userInfo.userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateUserProfile(userInfo).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
            reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userInfo.userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateUserProfile(userInfo).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  //#endregion

  //#region HOSPITAL

  /**
   * FETCH ALL HOSITALS
   * @returns (PROMISE)
   */
  GetHospitals = () => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var url = `${this.apis.baseUrl}${this.apis.hospital.fetchDetails.url}`;
      this.common.http.SendRequest(url, this.apis.hospital.fetchDetails.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else
          reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(rej);
      });
    });
  };

  /**
   * FETCH HOSPITALS BY LOCATION
   * @param userId
   * @param location
   * @returns (PROMISE)
   */
  GetHospitalsByLocation = (userId: any, location: any, handle: any, city: any, lattitude: any, longitude: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.hospital.searchHospitalByLocation.url}`;
      url = url.replace('<location>',location).replace('<EType>',handle).replace('<hcity>',city).replace('<latt>',lattitude).replace('<longi>',longitude);
      this.common.http.SendRequest(url, this.apis.hospital.searchHospitalByLocation.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(!userId){
            if(res.statusCode === 401){
              this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
                this.GetHospitalsByLocation(userId, location, handle, city, lattitude, longitude).then((res1: any) => {
                  resolve(res1);
                }).catch((rej1: any) => {
                  reject(this.GetStatus(rej1));
                });
              }).catch((_rej: any) => {
                reject(this.GetStatus(_rej));
              });
            }
            else
              reject(this.GetStatus(res));
          }
          else{
            reject(this.GetStatus(res));
          }
        }
      }).catch((rej: any) => {
        if(!userId){
          if(rej.status !== 0)
            reject(this.GetStatus(rej));
            else{
              this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
                this.GetHospitalsByLocation(userId, location, handle, city, lattitude, longitude).then((res1: any) => {
                  resolve(res1);
                }).catch((rej1: any) => {
                  reject(this.GetStatus(rej1));
                });
              }).catch((_rej: any) => {
                reject(this.GetStatus(_rej));
              });

            }
        }
        else{
          reject(this.GetStatus(rej));
        }

      });
    });
  };

  /**
   * FETCH HOSPITAL BY USER
   * @param userId
   * @returns (PROMISE)
   */
  GetHospitalsByUser = (userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.hospital.fetchDetailsByUserId.url}${userId}`;
      this.common.http.SendRequest(url, this.apis.hospital.fetchDetailsByUserId.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
          else if(res.statusCode === 404){
            resolve(res);
          }
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetHospitalsByUser(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
            reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetHospitalsByUser(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });
  };

  /**
   * FETCH HOSPITAL DETAILS
   * @param userId
   * @param hospitalId
   * @returns (PROMISE)
   */
  GetHospitalInfoByHospitalId = (userId: any, hospitalId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.hospital.fetchDetailsById.url}${hospitalId}`;
      this.common.http.SendRequest(url, this.apis.hospital.fetchDetailsById.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(!userId){
            if(res.statusCode === 401){
              this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
                this.GetHospitalInfoByHospitalId(userId, hospitalId).then((res1: any) => {
                  resolve(res1);
                }).catch((rej1: any) => {
                  reject(this.GetStatus(rej1));
                });
              }).catch((_rej: any) => {
                reject(this.GetStatus(_rej));
              });
            }
            else
              reject(this.GetStatus(res));
          }
          else
            reject(this.GetStatus(res));

        }
      }).catch((rej: any) => {
        if(!userId){
          if(rej.status !== 0)
            reject(this.GetStatus(rej));
            else{
              this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
                this.GetHospitalInfoByHospitalId(userId, hospitalId).then((res1: any) => {
                  resolve(res1);
                }).catch((rej1: any) => {
                  reject(this.GetStatus(rej1));
                });
              }).catch((_rej: any) => {
                reject(this.GetStatus(_rej));
              });

            }
        }
        else{
          reject(rej);
        }


      });
    });
  };

  /**
   * FETCH HOSPITAL IMAGES
   * @param userId
   * @param hospitalId
   * @returns (PROMISE)
   */
  GetHospitalImagesByHospitalId = (userId: any, hospitalId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      // headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.hospital.fetchHospitalImages.url}${hospitalId}`;
      this.common.http.SendRequest(url, this.apis.hospital.fetchHospitalImages.method, headers, undefined).then((res: any) => {
        // if(res.statusCode && res.statusCode === 200)
        if(res.status && res.status === 200)
          resolve(res);
        else{
          // if (!userId)
          // {
          //   if(res.statusCode === 401){
          //     this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
          //       this.GetHospitalImagesByHospitalId(userId, hospitalId).then((res1: any) => {
          //         resolve(res1);
          //       }).catch((rej1: any) => {
          //         reject(this.GetStatus(rej1));
          //       });
          //     }).catch((_rej: any) => {
          //       reject(this.GetStatus(_rej));
          //     });
          //   }
          //   else
          //     reject(this.GetStatus(res));
          // }
          // else
          // {
          //   reject(this.GetStatus(res));
          // }
          reject(this.GetStatus(res));

        }
      }).catch((rej: any) => {
        // if(!userId){
        //   if(rej.status !== 0)
        //     reject(this.GetStatus(rej));
        //     else{
        //       this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
        //         this.GetHospitalImagesByHospitalId(userId, hospitalId).then((res1: any) => {
        //           resolve(res1);
        //         }).catch((rej1: any) => {
        //           reject(this.GetStatus(rej1));
        //         });
        //       }).catch((_rej: any) => {
        //         reject(this.GetStatus(_rej));
        //       });

        //     }
        // }
        // else{
        //   reject(this.GetStatus(rej));

        // }

        reject(this.GetStatus(rej));
      });
    });
  };

  /**
   * UPDATE HOSPITAL VISITOR
   * @param userId
   * @param hospitalId
   * @returns (PROMISE)
   */
  UpdateHospitalProfileVisitor = (userId: any, hospitalId: any) =>{
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        Enquired_by: userId,
        Enquired_on: new Date().toISOString().split('T')[0],
        HospitalID: hospitalId
      };

      var url = `${this.apis.baseUrl}${this.apis.hospital.updateProfileVisitor.url}`;
      this.common.http.SendRequest(url, this.apis.hospital.updateProfileVisitor.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateHospitalProfileVisitor(userId, hospitalId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
            reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateHospitalProfileVisitor(userId, hospitalId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * FETCH HOSPITAL REVIEWS
   * @param userId
   * @param hospitalId
   * @returns (PROMISE)
   */
  GetHospitalReview = (userId: any, hospitalId: any) =>{
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      // headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.hospital.fetchReview.url}${hospitalId}`;
      this.common.http.SendRequest(url, this.apis.hospital.fetchReview.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          reject(this.GetStatus(res));

        }
      }).catch((rej: any) => {
        // if(!userId){
        //   if(rej.status !== 0)
        //     reject(this.GetStatus(rej));
        //     else{
        //       this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
        //         this.GetHospitalReviews(userId, hospitalId).then((res1: any) => {
        //           resolve(res1);
        //         }).catch((rej1: any) => {
        //           reject(this.GetStatus(rej1));
        //         });
        //       }).catch((_rej: any) => {
        //         reject(this.GetStatus(_rej));
        //       });

        //     }
        // }
        // else{
        //   reject(this.GetStatus(rej));

        // }
        reject(this.GetStatus(rej));

      });
    });

  };

  GetHospitalReviewsByUser = (userId: any, hospitalId: any) =>{
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      // headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.hospital.fetchReviewByUser.url}`;
      url = url.replace('<HospitalID>', hospitalId).replace('<UserID>', userId);
      this.common.http.SendRequest(url, this.apis.hospital.fetchReviewByUser.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          // if(!userId){
          //   if(res.statusCode === 401){
          //     this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
          //       this.GetHospitalReviewsByUser(userId, hospitalId).then((res1: any) => {
          //         resolve(res1);
          //       }).catch((rej1: any) => {
          //         reject(this.GetStatus(rej1));
          //       });
          //     }).catch((_rej: any) => {
          //       reject(this.GetStatus(_rej));
          //     });
          //   }
          //   else
          //   reject(this.GetStatus(res));
          // }
          // else{
          //   reject(this.GetStatus(res));

          // }
          reject(this.GetStatus(res));

        }
      }).catch((rej: any) => {
        // if(!userId){
        //   if(rej.status !== 0)
        //     reject(this.GetStatus(rej));
        //     else{
        //       this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
        //         this.GetHospitalReviewsByUser(userId, hospitalId).then((res1: any) => {
        //           resolve(res1);
        //         }).catch((rej1: any) => {
        //           reject(this.GetStatus(rej1));
        //         });
        //       }).catch((_rej: any) => {
        //         reject(this.GetStatus(_rej));
        //       });

        //     }
        // }
        // else{
        //   reject(this.GetStatus(rej));

        // }
        reject(this.GetStatus(rej));

      });
    });

  };

  /**
   * UPDATE HOSPITAL REVIEW
   * @param reviewInfo
   * @param userId
   * @returns (PROMISE)
   */
  UpdateHospitalReview = (reviewInfo: any, userId: any) =>{
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        UserID: reviewInfo.UserID,
        HRating: reviewInfo.HRating,
        DReview: reviewInfo.DReview,
        HospitalID: reviewInfo.HospitalID,
        Review_On: reviewInfo.Review_On
      };

      var url = `${this.apis.baseUrl}${this.apis.hospital.updateReview.url}`;
      this.common.http.SendRequest(url, this.apis.hospital.updateReview.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateHospitalReview(userId, reviewInfo.HospitalID).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateHospitalReview(userId, reviewInfo.HospitalID).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  EditHospitalReview = (reviewInfo: any, userId: any) =>{
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        ID: reviewInfo.ID,
        UserID: reviewInfo.UserID,
        HRating: reviewInfo.HRating,
        DReview: reviewInfo.DReview,
        HospitalID: reviewInfo.HospitalID,
        Review_On: reviewInfo.Review_On
      };

      var url = `${this.apis.baseUrl}${this.apis.hospital.editReview.url}`;
      this.common.http.SendRequest(url, this.apis.hospital.editReview.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.EditHospitalReview(userId, reviewInfo.HospitalID).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.EditHospitalReview(userId, reviewInfo.HospitalID).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * PATIENT ENQUIRY
   * @param hospitalInfo
   * @param userId
   * @returns (PROMISE)
   */
  PatientEnquiry = (hospitalInfo: any, userId: any) =>{
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        Ptname: hospitalInfo.Ptname,
        Ptage: hospitalInfo.Ptage,
        Ptreason: hospitalInfo.Ptreason,
        HospitalID: hospitalInfo.HospitalID,
        Enquired_by: userId,
        Enquired_on: hospitalInfo.Enquired_on
      };

      var url = `${this.apis.baseUrl}${this.apis.hospital.addPatientEnquiry.url}`;
      this.common.http.SendRequest(url, this.apis.hospital.addPatientEnquiry.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.PatientEnquiry(userId, hospitalInfo.HospitalID).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.PatientEnquiry(userId, hospitalInfo.HospitalID).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * PATIENT ENQUIRY BY CALL
   * @param hospitalId
   * @param userId
   * @returns (PROMISE)
   */
  PatientEnquiryCall = (hospitalId: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        HospitalID: hospitalId,
        Enquired_by: userId,
        Enquired_on: new Date()
      };

      var url = `${this.apis.baseUrl}${this.apis.hospital.callPatientEnquiry.url}`;
      this.common.http.SendRequest(url, this.apis.hospital.callPatientEnquiry.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.PatientEnquiryCall(hospitalId, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.PatientEnquiryCall(hospitalId, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * REGISTER HOSPITAL
   * @param hospitalInfo
   * @param userId
   * @returns (PROMISE)
   */
  RegisterHospital = (hospitalInfo: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      // headers = headers.set('Content-Type', 'multipart/form-data');
      // headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        MyObj: {
          HLatitude: hospitalInfo.HLatitude,
          HLongitude: hospitalInfo.HLongitude,
          City: hospitalInfo.City,
          HEmail: hospitalInfo.HEmail,
          HospitalName: hospitalInfo.HospitalName,
          hmanager:hospitalInfo.hmanager,
          hmcontact:hospitalInfo.hmcontact,
          HospitalType: 1,
          EmergencyDContact: hospitalInfo.EmergencyDContact,
          GeneralDContact: hospitalInfo.GeneralDContact,
          HPincode: hospitalInfo.HPincode,
          HAddress: hospitalInfo.HAddress,
          Spelization: hospitalInfo.Spelization,
          EmergencyHandeled: hospitalInfo.EmergencyHandeled,
          UserID: userId
        },
        FILE: hospitalInfo.File
      };

      const formData = new FormData();
      formData.append('MyObj', JSON.stringify(body.MyObj));
      formData.append('FILE', JSON.stringify(body.FILE));

      var url = `${this.apis.baseUrl}${this.apis.hospital.register.url}`;
      this.common.http.SendRequest(url, this.apis.hospital.register.method, headers, formData).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.RegisterHospital(hospitalInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.RegisterHospital(hospitalInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });
  };

  /**
   * FETCH HOSPITAL SPECIALIZATION
   * @param userId
   * @returns (PROMISE)
   */
  GetSpecialization = (userId: any) =>{
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var url = `${this.apis.baseUrl}${this.apis.hospital.fetchSpecializationInfo.url}`;
      this.common.http.SendRequest(url, this.apis.hospital.fetchSpecializationInfo.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetSpecialization(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetSpecialization(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * FETCH HOSPITAL EMERGENCY HANDLED
   * @param userId
   * @returns (PROMISE)
   */
  GetEmergencyHandled = (userId: any) =>{
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var url = `${this.apis.baseUrl}${this.apis.hospital.fetchEmergencyInfo.url}`;
      this.common.http.SendRequest(url, this.apis.hospital.fetchEmergencyInfo.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          // if(res.statusCode === 401){
          //   this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
          //     this.GetEmergencyHandled(userId).then((res1: any) => {
          //       resolve(res1);
          //     }).catch((rej1: any) => {
          //       reject(this.GetStatus(rej1));
          //     });
          //   }).catch((_rej: any) => {
          //     reject(this.GetStatus(_rej));
          //   });
          // }
          // else
          // reject(this.GetStatus(res));
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        // if(rej.status !== 0)
        //   reject(this.GetStatus(rej));
        //   else{
        //     this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
        //       this.GetEmergencyHandled(userId).then((res1: any) => {
        //         resolve(res1);
        //       }).catch((rej1: any) => {
        //         reject(this.GetStatus(rej1));
        //       });
        //     }).catch((_rej: any) => {
        //       reject(this.GetStatus(_rej));
        //     });

        //   }

          reject(this.GetStatus(rej));
      });
    });

  };

  /**
   * FETCH HOSPITAL BED TYPES
   * @param userId
   * @returns (PROMISE)
   */
  GetBedTypes = (userId: any) =>{
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var url = `${this.apis.baseUrl}${this.apis.hospital.fetchBed.url}`;
      this.common.http.SendRequest(url, this.apis.hospital.fetchBed.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetBedTypes(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetBedTypes(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };


    //#region BLOOD DONORS

  /**
   * FETCH ALL BLOOD DONORS
   * @param userId
   * @returns (PROMISE)
   */
  GetAllPackages = (userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.user.package.url}`;
      this.common.http.SendRequest(url, this.apis.user.package.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetAllPackages(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetAllPackages(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };


  //#endregion

  //#region BLOOD DONORS

  /**
   * FETCH ALL BLOOD DONORS
   * @param userId
   * @returns (PROMISE)
   */
  GetAllDonors = (userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.bloodDonor.fetchAllDonors.url}`;
      this.common.http.SendRequest(url, this.apis.bloodDonor.fetchAllDonors.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetAllDonors(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetAllDonors(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * FETCH BLOOD DONOR DETAILS
   * @param userId
   * @returns (PROMISE)
   */
  GetDonorDetails = (userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.bloodDonor.fetchDonorDetails.url}${userId}`;
      this.common.http.SendRequest(url, this.apis.bloodDonor.fetchDonorDetails.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetDonorDetails(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetDonorDetails(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * FETCH DONOR
   * @param userId
   * @param location
   * @param bloodGroup
   * @returns (PROMISE)
   */
  GetDonors = (userId: any, location: any, bloodGroup: any, medicalCondition: any, city: any, lattitude: any, longitude: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        UserID: userId,
        Bgroup: bloodGroup,
        Ulocation: location,
        Umedicalcond: medicalCondition,
        Ucity: city,
        ulatti: lattitude,
        ulongitude: longitude
      };

      var url = `${this.apis.baseUrl}${this.apis.bloodDonor.searchDonors2.url}`;
      this.common.http.SendRequest(url, this.apis.bloodDonor.searchDonors2.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetDonors(userId, location, bloodGroup, medicalCondition, city, lattitude, longitude).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetDonors(userId, location, bloodGroup, medicalCondition, city, lattitude, longitude).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * FETCH DONOR BY LOCATION
   * @param userId
   * @param location
   * @returns (PROMISE)
   */
  GetDonorsByLocation = (userId: any, location: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.bloodDonor.searchDonorsByLocation.url}${location}`;
      this.common.http.SendRequest(url, this.apis.bloodDonor.searchDonorsByLocation.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetDonorsByLocation(userId, location).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetDonorsByLocation(userId, location).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * FETCH DONOR BY BLOOD GROUP
   * @param userId
   * @param bloodGroup
   * @returns (PROMISE)
   */
  GetDonorsByBloodGroup = (userId: any, bloodGroup: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.bloodDonor.searchDonorsByBloodGroup.url}${bloodGroup}`;
      this.common.http.SendRequest(url, this.apis.bloodDonor.searchDonorsByBloodGroup.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetDonorsByBloodGroup(userId, bloodGroup).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetDonorsByBloodGroup(userId, bloodGroup).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * UPDATE BLOOD DONATION STATUS
   * @param userInfo
   * @returns (PROMISE)
   */
  UpdateBloodDonationStatus = (userInfo: any) =>{
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        UserID: userInfo.UserID,
        Astatus: userInfo.Astatus
      };

      var url = `${this.apis.baseUrl}${this.apis.user.updateBloodDonationStatus.url}`;
      this.common.http.SendRequest(url, this.apis.user.updateBloodDonationStatus.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userInfo.userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateBloodDonationStatus(userInfo).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
            reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userInfo.userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateBloodDonationStatus(userInfo).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * ADD NEW BLOOD DONOR
   * @param donorInfo
   * @param userId
   * @returns (PROMISE)
   */
  AddDonor = (donorInfo: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        UserID: userId,
        Uname: donorInfo.Uname,
        DOB: donorInfo.DOB,
        Pincode: donorInfo.Pincode,
        Location: donorInfo.Location,
        BloodGrop: donorInfo.BloodGrop,
        Added_on: new Date(),
        ulatti: donorInfo.Lattitude,
        ulongitude: donorInfo.Longitude
    }

    var url = `${this.apis.baseUrl}${this.apis.bloodDonor.addDonor.url}`;
      this.common.http.SendRequest(url, this.apis.bloodDonor.addDonor.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.AddDonor(donorInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.AddDonor(donorInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * UPDATE BLOOD DONOR
   * @param donorInfo
   * @param userId
   * @returns (PROMISE)
   */
  UpdateDonor = (donorInfo: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        UserID: userId,
        Uname: donorInfo.Uname,
        DOB: donorInfo.DOB,
        Pincode: donorInfo.Pincode,
        Location: donorInfo.Location,
        BloodGrop: donorInfo.BloodGrop,
        Added_on: new Date(),
        ulatti: donorInfo.Lattitude,
        ulongitude: donorInfo.Longitude
    }

    var url = `${this.apis.baseUrl}${this.apis.bloodDonor.updateDonor.url}`;
      this.common.http.SendRequest(url, this.apis.bloodDonor.updateDonor.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateDonor(donorInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateDonor(donorInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * FETCH DONOR MOBILE
   * @param id
   * @returns (PROMISE)
   */
  GetDonorMobile = (id: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.bloodDonor.fetchMobile.url}${id}`;
      this.common.http.SendRequest(url, this.apis.bloodDonor.fetchMobile.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        reject(this.GetStatus(rej));
      });
    });

  };

  /**
   * FETCH ALL BLOOD DONATIONS
   * @param userId
   * @returns (PROMISE)
   */
  GetAllDonations = (userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.bloodDonor.fetchAllDonations.url}${userId}`;
      this.common.http.SendRequest(url, this.apis.bloodDonor.fetchAllDonations.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetBedTypes(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetBedTypes(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * ADD NEW BLOOD DONATIONS
   * @param donationInfo
   * @param userId
   * @returns (PROMISE)
   */
  AddDonation = (donationInfo: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        UserID: userId,
        Donated_on: donationInfo.Donated_on,
        Description: donationInfo.Description,
        Location: donationInfo.Location
    }

    var url = `${this.apis.baseUrl}${this.apis.bloodDonor.addDonation.url}`;
      this.common.http.SendRequest(url, this.apis.bloodDonor.addDonation.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.AddDonation(donationInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.AddDonation(donationInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  EditDonation = (donationInfo: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        UserID: userId,
        ID: donationInfo.ID,
        Donated_on: donationInfo.Donated_on,
        Description: donationInfo.Description,
        Location: donationInfo.Location
    }

    var url = `${this.apis.baseUrl}${this.apis.bloodDonor.editDonation.url}`;
      this.common.http.SendRequest(url, this.apis.bloodDonor.editDonation.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.EditDonation(donationInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.EditDonation(donationInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  DeleteDonation = (donationInfo: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.bloodDonor.deleteDonation.url}${donationInfo.ID}`;
      this.common.http.SendRequest(url, this.apis.bloodDonor.deleteDonation.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.DeleteDonation(donationInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.DeleteDonation(donationInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  //#endregion

  //#region EMERGENCY CARD

  /**
   * FETCH ALL EMERGENCY CARDS
   * @param userId
   * @returns (PROMISE)
   */
  GetAllEmergencyCards = (userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.emergency.fetchCards.url}${userId}`;
      this.common.http.SendRequest(url, this.apis.emergency.fetchCards.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetAllEmergencyCards(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetAllEmergencyCards(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  SearchEmergencyCard = (emidInfo: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.emergency.searchCard.url}`;
      url = url.replace('<EMID>', emidInfo.EMID).replace('<EPin>', emidInfo.Pin);
      this.common.http.SendRequest(url, this.apis.emergency.searchCard.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.SearchEmergencyCard(emidInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.SearchEmergencyCard(emidInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };
  // ----------------------------------------------------
  /**
   * ADD NEW EMERGENCY CARDS
   * @param cardInfo
   * @param userId
   * @returns (PROMISE)
   */
  AddEmergencyCard = (cardInfo: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      // headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        MyObj: {
          EMID: cardInfo.EMID,
          Pname:cardInfo.Pname,
          Emobile:cardInfo.Emobile,
          PDob:cardInfo.PDob,
          Pbloodgroup:cardInfo.Pbloodgroup,
          PGender:cardInfo.PGender,
          PcontName:cardInfo.PcontName,
          PcontMobile:cardInfo.PcontMobile,
          PcontRelation:cardInfo.PcontRelation,
          ScontName:cardInfo.ScontName,
          ScontMobile:cardInfo.ScontMobile,
          ScontRelation:cardInfo.ScontRelation,
          Insuranceprovider:cardInfo.Insuranceprovider,
          Policynumber:cardInfo.Policynumber,
          Medicalcondition:cardInfo.Medicalcondition,
          Emergencydrug:cardInfo.Emergencydrug,
          Eaddress:cardInfo.Eaddress,
          Epostalcode:cardInfo.Epostalcode,
          EhouseNo:cardInfo.EhouseNo,
          Ecity:cardInfo.Ecity,
          Estate:cardInfo.Estate,
          Abha:cardInfo.Abha,
          Organdoner:cardInfo.Organdoner,
          CreatedBy:userId
        },
        File: ""
      };

      if(!cardInfo.File || !cardInfo.File.file)
        body.File = "";
      else
        body.File = cardInfo.File.file

      const formData = new FormData();
      formData.append('MyObj', JSON.stringify(body.MyObj));
      formData.append('FILE', body.File);

      var url = `${this.apis.baseUrl}${this.apis.emergency.addCard.url}`;
      this.common.http.SendRequest(url, this.apis.emergency.addCard.method, headers, formData).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.AddEmergencyCard(cardInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.AddEmergencyCard(cardInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * UPDATE EMERGENCY CARD
   * @param cardInfo
   * @param userId
   * @returns (PROMISE)
   */
  UpdateEmergencyCard = (cardInfo: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      // headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        MyObj: {
          EMID: cardInfo.EMID,
          Pname:cardInfo.Pname,
          Emobile:cardInfo.Emobile,
          PDob:cardInfo.PDob,
          Pbloodgroup:cardInfo.Pbloodgroup,
          PGender:cardInfo.PGender,
          PcontName:cardInfo.PcontName,
          PcontMobile:cardInfo.PcontMobile,
          PcontRelation:cardInfo.PcontRelation,
          ScontName:cardInfo.ScontName,
          ScontMobile:cardInfo.ScontMobile,
          ScontRelation:cardInfo.ScontRelation,
          Insuranceprovider:cardInfo.Insuranceprovider,
          Policynumber:cardInfo.Policynumber,
          Medicalcondition:cardInfo.Medicalcondition,
          Emergencydrug:cardInfo.Emergencydrug,
          Eaddress:cardInfo.Eaddress,
          Epostalcode:cardInfo.Epostalcode,
          EhouseNo:cardInfo.EhouseNo,
          Ecity:cardInfo.Ecity,
          Estate:cardInfo.Estate,
          Abha:cardInfo.Abha,
          Organdoner:cardInfo.Organdoner,
          CreatedBy:userId
        },
        File: ""
      };


      if(!cardInfo.File || !cardInfo.File.file)
        body.File = "";
      else
        body.File = cardInfo.File.file

      const formData = new FormData();
      formData.append('MyObj', JSON.stringify(body.MyObj));
      formData.append('FILE', body.File);

      var url = `${this.apis.baseUrl}${this.apis.emergency.updateCard.url}`;
      this.common.http.SendRequest(url, this.apis.emergency.updateCard.method, headers, formData).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateEmergencyCard(cardInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateEmergencyCard(cardInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };
  // ----------------------------------------------------

  /**
   * ADD NEW EMERGENCY CARDS
   * @param cardInfo
   * @param userId
   * @returns (PROMISE)
   */
  AddCorpEmergencyCard = (cardInfo: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      // headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        MyObj: {
          EMID: cardInfo.EMID,
          Pname:cardInfo.Pname,
          Emobile:cardInfo.Emobile,
          PDob:cardInfo.PDob,
          Pbloodgroup:cardInfo.Pbloodgroup,
          PGender:cardInfo.PGender,
          PcontName:cardInfo.PcontName,
          PcontMobile:cardInfo.PcontMobile,
          PcontRelation:cardInfo.PcontRelation,
          ScontName:cardInfo.ScontName,
          ScontMobile:cardInfo.ScontMobile,
          ScontRelation:cardInfo.ScontRelation,
          Insuranceprovider:cardInfo.Insuranceprovider,
          Policynumber:cardInfo.Policynumber,
          Medicalcondition:cardInfo.Medicalcondition,
          Emergencydrug:cardInfo.Emergencydrug,
          Eaddress:cardInfo.Eaddress,
          Epostalcode:cardInfo.Epostalcode,
          EhouseNo:cardInfo.EhouseNo,
          Ecity:cardInfo.Ecity,
          Estate:cardInfo.Estate,
          Abha:cardInfo.Abha,
          Organdoner:cardInfo.Organdoner,
          CreatedBy:userId
        },
        File: ""
      };

      if(!cardInfo.File || !cardInfo.File.file)
        body.File = "";
      else
        body.File = cardInfo.File.file

      const formData = new FormData();
      formData.append('MyObj', JSON.stringify(body.MyObj));
      formData.append('FILE', body.File);

      var url = `${this.apis.baseUrl}${this.apis.corp.generateemid.url}`;
      this.common.http.SendRequest(url, this.apis.corp.generateemid.method, headers, formData).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.AddCorpEmergencyCard(cardInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.AddCorpEmergencyCard(cardInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  /**
   * UPDATE EMERGENCY CARD
   * @param cardInfo
   * @param userId
   * @returns (PROMISE)
   */
  UpdateCorpEmergencyCard = (cardInfo: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      // headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        MyObj: {
          EMID: cardInfo.EMID,
          Pname:cardInfo.Pname,
          Emobile:cardInfo.Emobile,
          PDob:cardInfo.PDob,
          Pbloodgroup:cardInfo.Pbloodgroup,
          PGender:cardInfo.PGender,
          PcontName:cardInfo.PcontName,
          PcontMobile:cardInfo.PcontMobile,
          PcontRelation:cardInfo.PcontRelation,
          ScontName:cardInfo.ScontName,
          ScontMobile:cardInfo.ScontMobile,
          ScontRelation:cardInfo.ScontRelation,
          Insuranceprovider:cardInfo.Insuranceprovider,
          Policynumber:cardInfo.Policynumber,
          Medicalcondition:cardInfo.Medicalcondition,
          Emergencydrug:cardInfo.Emergencydrug,
          Eaddress:cardInfo.Eaddress,
          Epostalcode:cardInfo.Epostalcode,
          EhouseNo:cardInfo.EhouseNo,
          Ecity:cardInfo.Ecity,
          Estate:cardInfo.Estate,
          Abha:cardInfo.Abha,
          Organdoner:cardInfo.Organdoner,
          CreatedBy:userId
        },
        File: ""
      };

      if(!cardInfo.File || !cardInfo.File.file)
        body.File = "";
      else
        body.File = cardInfo.File.file

      const formData = new FormData();
      formData.append('MyObj', JSON.stringify(body.MyObj));
      formData.append('FILE', body.File);

      var url = `${this.apis.baseUrl}${this.apis.corp.updateemid.url}`;
      this.common.http.SendRequest(url, this.apis.corp.updateemid.method, headers, formData).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateCorpEmergencyCard(cardInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateCorpEmergencyCard(cardInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }

      });
    });

  };

  

  /**
   * UPDATE EMERGENCY CARD PROFILE VISITOR
   * @param cardInfo
   * @param userId
   * @returns (PROMISE)
   */
  UpdateEmergencyIDProfileVisitor = (cardInfo: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        EMID: cardInfo.EMID,
        Enquired_by: cardInfo.Enquired_by,
        Enquired_on: new Date()
      };

      var url = `${this.apis.baseUrl}${this.apis.emergency.profileVisitor.url}`;
      this.common.http.SendRequest(url, this.apis.emergency.profileVisitor.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.UpdateEmergencyIDProfileVisitor(cardInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
        else{
          this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
            this.UpdateEmergencyIDProfileVisitor(cardInfo, userId).then((res1: any) => {
              resolve(res1);
            }).catch((rej1: any) => {
              reject(this.GetStatus(rej1));
            });
          }).catch((_rej: any) => {
            reject(this.GetStatus(_rej));
          });

        }
      });
    });

  };

  GetEmergencyIDProfileVisitor = (emid: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.emergency.fetchProfileVisitor.url}${emid}`;
      this.common.http.SendRequest(url, this.apis.emergency.fetchProfileVisitor.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.GetEmergencyIDProfileVisitor(emid, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
        else{
          this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
            this.GetEmergencyIDProfileVisitor(emid, userId).then((res1: any) => {
              resolve(res1);
            }).catch((rej1: any) => {
              reject(this.GetStatus(rej1));
            });
          }).catch((_rej: any) => {
            reject(this.GetStatus(_rej));
          });

        }
      });
    });

  };

  

  /**
   * VALIDATE EMERGENCY NUMBER
   * @param cardNumber
   * @param userId
   * @returns (PROMISE)
   */
  ValidateEmergencyNumber = (cardNumber: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.emergency.validateCard.url}${cardNumber}`;
      this.common.http.SendRequest(url, this.apis.emergency.validateCard.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.ValidateEmergencyNumber(cardNumber, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.ValidateEmergencyNumber(cardNumber, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }
      });
    });

  };

  ValidateEmergencyNumberWithPIN = (cardNumber: any, pin: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var url = `${this.apis.baseUrl}${this.apis.emergency.validateCardWithPin.url}`;
      url = url.replace('<emid>',cardNumber).replace('<pin>',pin);

      this.common.http.SendRequest(url, this.apis.emergency.validateCardWithPin.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        reject(this.GetStatus(rej));
      });
    });

  };

  /**
   * FETCH LOCATION BY NAME
   * @param locationName
   * @returns (PROMISE)
   */
  GetLocationsByName = (locationName: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var url = `${this.apis.baseUrl}${this.apis.common.fetchLocationByName.url}${locationName}`;
      this.common.http.SendRequest(url, this.apis.common.fetchLocationByName.method, headers, undefined).then((res: any) => {
        if(res.status && res.status === 200)
          resolve(res);
        else
        reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(this.GetStatus(rej));
      });
    });
  };

  /**
   * FETCH LOCATION BY PLACE ID
   * @param placeId
   * @returns (PROMISE)
   */
  GetLocationsByPlaceId = (placeId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var url = `${this.apis.baseUrl}${this.apis.common.fetchLocationByPlaceId.url}${placeId}`;
      this.common.http.SendRequest(url, this.apis.common.fetchLocationByPlaceId.method, headers, undefined).then((res: any) => {
        if(res.status && res.status === 200)
          resolve(res);
        else
        reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(this.GetStatus(rej));
      });
    });
  };

  GetEmidOtp = (userInfo: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var body = {
        userMobile: userInfo.userMobile
      };

      var url = `${this.apis.baseUrl}${this.apis.emergency.fetchOtp.url}`;
      this.common.http.SendRequest(url, this.apis.emergency.fetchOtp.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else
        reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(this.GetStatus(rej));
      });
    });
  };

  GetEmidDetails = (userInfo: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var body = {
        emidMobile: userInfo.emidMobile,
        userOtp:userInfo.userOtp,
        Sent_On: new Date(),
        emidNumber: userInfo.emidNumber,
        emidPin:userInfo.emidPin
      };

      var url = `${this.apis.baseUrl}${this.apis.emergency.fetchCardDetails.url}`;
      this.common.http.SendRequest(url, this.apis.emergency.fetchCardDetails.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else
        reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(this.GetStatus(rej));
      });
    });
  };
  //#endregion




  GetBanners = () => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var url = `${this.apis.baseUrl}${this.apis.common.fetchBanner.url}`;
      this.common.http.SendRequest(url, this.apis.common.fetchBanner.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else
        reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(this.GetStatus(rej));
      });
    });
  };

  GenerateOTPOnRegister = (userInfo: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var body = {
        userMobile: userInfo.userMobile
      };

      var url = `${this.apis.baseUrl}${this.apis.user.generateRegisterOTP.url}`;
      this.common.http.SendRequest(url, this.apis.user.generateRegisterOTP.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else
        reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(this.GetStatus(rej));
      });
    });
  };

  AuthenticateOTPOnRegister = (userInfo: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var body = {
        Umobile: userInfo.Umobile,
        OTP: userInfo.OTP
      };

      var url = `${this.apis.baseUrl}${this.apis.user.authenticateRegisterOTP.url}`;
      this.common.http.SendRequest(url, this.apis.user.authenticateRegisterOTP.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else
        reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(this.GetStatus(rej));
      });
    });
  };

  ForgotPassword = (mobileNo: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var url = `${this.apis.baseUrl}${this.apis.user.forgetPassword.url}${mobileNo}`;
      this.common.http.SendRequest(url, this.apis.user.forgetPassword.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else
        reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(this.GetStatus(rej));
      });
    });
  };

  ChangePassword = (userInfo: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var body = {
        UserID : userInfo.UserID,
        OPassword : userInfo.OPassword,
        NPassword :userInfo.NPassword
      };

      var url = `${this.apis.baseUrl}${this.apis.user.changePassword.url}`;
      this.common.http.SendRequest(url, this.apis.user.changePassword.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.ChangePassword(userInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.ChangePassword(userInfo, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }
      });
    });

  };

  GetLocations = (searchInput: any) : Observable<any> =>{

    return new Observable((observer: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var url = `${this.apis.baseUrl}${this.apis.common.fetchLocationByName.url}${searchInput}`;
      this.common.http.SendRequest(url, this.apis.common.fetchLocationByName.method, headers, undefined).then((res: any) => {
        if(res.status && res.status === 200){
          if(res && res.objrt && res.objrt.predictions && res.objrt.predictions.length > 0){
            observer.next(res.objrt.predictions.map((s: any) => s.description));
          }
          else{
            var arr: any = [];
            observer.next(arr);
          }
        }
        else{
          var arr: any = [];
          observer.next(arr);
        }
      }).catch((rej: any) => {
        var arr: any = [];
        observer.next(arr);
      }).finally(() => {
        observer.complete();
      });

    });
  };

  DeleteEmergencyId = (emid: any, userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.emergency.deleteCard.url}${emid}`;
      this.common.http.SendRequest(url, this.apis.emergency.deleteCard.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.DeleteEmergencyId(emid, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.DeleteEmergencyId(emid, userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }
      });
    });

  };

  VerifyEmailId = (userId: any) => {
    return new Promise((resolve: any, reject: any) => {

      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

      var url = `${this.apis.baseUrl}${this.apis.user.verifyEmail.url}${userId}`;
      this.common.http.SendRequest(url, this.apis.user.verifyEmail.method, headers, undefined).then((res: any) => {
        if(res.statusCode && res.statusCode === 200)
          resolve(res);
        else{
          if(res.statusCode === 401){
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.VerifyEmailId(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });
          }
          else
          reject(this.GetStatus(res));
        }
      }).catch((rej: any) => {
        if(rej.status !== 0)
          reject(this.GetStatus(rej));
          else{
            this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
              this.VerifyEmailId(userId).then((res1: any) => {
                resolve(res1);
              }).catch((rej1: any) => {
                reject(this.GetStatus(rej1));
              });
            }).catch((_rej: any) => {
              reject(this.GetStatus(_rej));
            });

          }
      });
    });

  };





// --------------------------------------------------------------------------------------------------------------
  /**
   * SEND OTP
   * @param employeeInfo
   * @returns (PROMISE)
   */
  CorpSendOTP = (employeeInfo: any) => {
    return new Promise((resolve: any, reject: any) => {
      var headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');

      var body = {
        empcredentials: employeeInfo.empMobile
      };


      var url = `${this.apis.baseUrl}${this.apis.corp.corpotp.url}`;
      this.common.http.SendRequest(url, this.apis.corp.corpotp.method, headers, body).then((res: any) => {
        if(res.statusCode && res.statusCode === 200){
          resolve(res);
        }
        else
          reject(this.GetStatus(res));
      }).catch((rej: any) => {
        reject(rej);
      });
    });
  };

    /**
   * USER LOGIN THROUGH OTP
   * @param employeeInfo
   * @returns (PROMISE)
   */
    CorpOTPLogin = (employeeInfo: any) => {
      return new Promise((resolve: any, reject: any) => {
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
  
        var body = {
          userCredential: employeeInfo.corpCredential,
          userOtp: employeeInfo.corpOtp
        };
  
        var url = `${this.apis.baseUrl}${this.apis.corp.corpotplogin.url}`;
        this.common.http.SendRequest(url, this.apis.corp.corpotplogin.method, headers, body).then((res: any) => {
          if(res.statusCode && res.statusCode === 200){
            this.common.auth_token = res.objret.autToken;
            this.common.refresh_token = res.objret.refreshToken;
  
            localStorage.setItem('apis', JSON.stringify(this.apis));
            localStorage.setItem('userID', res.objret.userID);
            localStorage.setItem('auth_token', res.objret.autToken);
            localStorage.setItem('refresh_token', res.objret.refreshToken);
            localStorage.setItem('Is-corporate-login', 'success');
            resolve(res);
          }
          else
            reject(this.GetStatus(res));
        }).catch((rej: any) => {
          reject(rej);
        });
      });
    };


// -----------------------------------------------------------------------------------------------------------

 /**
   * FETCH USER PROFILE
   * @param userId
   * @returns (PROMISE)
   */
 GetCorpProfile = (userId: any) => {
  return new Promise((resolve: any, reject: any) => {

    var headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

    var url = `${this.apis.baseUrl}${this.apis.corp.fetchcorpdetails.url}${userId}`;
    this.common.http.SendRequest(url, this.apis.corp.fetchcorpdetails.method, headers, undefined).then((res: any) => {
      if(res.statusCode && res.statusCode === 200)
        resolve(res);
      else{
        if(res.statusCode === 401){
          this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
            this.GetCorpProfile(userId).then((res1: any) => {
              resolve(res1);
            }).catch((rej1: any) => {
              reject(this.GetStatus(rej1));
            });
          }).catch((_rej: any) => {
            reject(this.GetStatus(_rej));
          });
        }
        else
          reject(this.GetStatus(res));
      }
    }).catch((rej: any) => {
      if(rej.status !== 0)
        reject(this.GetStatus(rej));
        else{
          this.AuthenticateUser(userId, this.common.refresh_token).then((_res: any) => {
            this.GetCorpProfile(userId).then((res1: any) => {
              resolve(res1);
            }).catch((rej1: any) => {
              reject(this.GetStatus(rej1));
            });
          }).catch((_rej: any) => {
            reject(this.GetStatus(_rej));
          });

        }

    });
  });
};

// ----------------------------------------------------------------------------------------------------------------------

 /**
   * UPDATE USER PROFILE
   * @param userInfo
   * @returns (PROMISE)
   */
 UpdateCorpProfile = (userInfo: any) =>{
  return new Promise((resolve: any, reject: any) => {

    var headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${this.common.auth_token}`);

    var body = {
      MyObj: {
        emp_id: userInfo.MyObj.UserID,
        emp_name: userInfo.MyObj.userName,
        emp_mobile: userInfo.MyObj.userMobile,
        emp_email: userInfo.MyObj.userEmail,
        emp_gender: userInfo.MyObj.profileGender,
        emp_dob: userInfo.MyObj.profileDOB,
        emp_bloodgroup: userInfo.MyObj.empBloodgroup
      },
      File: userInfo.FILE.file
    };

    const formData = new FormData();
    formData.append('MyObj', JSON.stringify(body.MyObj));
    formData.append('File', body.File);

    var url = `${this.apis.baseUrl}${this.apis.corp.updatecorpdetails.url}`;
    this.common.http.SendRequest(url, this.apis.corp.updatecorpdetails.method, headers, formData).then((res: any) => {
      if(res.statusCode && res.statusCode === 200)
        resolve(res);
      else{
        if(res.statusCode === 401){
          this.AuthenticateUser(userInfo.userId, this.common.refresh_token).then((_res: any) => {
            this.UpdateCorpProfile(userInfo).then((res1: any) => {
              resolve(res1);
            }).catch((rej1: any) => {
              reject(this.GetStatus(rej1));
            });
          }).catch((_rej: any) => {
            reject(this.GetStatus(_rej));
          });
        }
        else
          reject(this.GetStatus(res));
      }
    }).catch((rej: any) => {
      if(rej.status !== 0)
        reject(this.GetStatus(rej));
        else{
          this.AuthenticateUser(userInfo.userId, this.common.refresh_token).then((_res: any) => {
            this.UpdateCorpProfile(userInfo).then((res1: any) => {
              resolve(res1);
            }).catch((rej1: any) => {
              reject(this.GetStatus(rej1));
            });
          }).catch((_rej: any) => {
            reject(this.GetStatus(_rej));
          });

        }

    });
  });

};

/**
   * FETCH USER PROFILE
   * @param userId
   * @returns (PROMISE)
   */
 GetSubscribePackages  = () => {
  return new Promise((resolve: any, reject: any) => {
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');

        var url = `${this.apis.baseUrl}${this.apis.common.SubscribePackages.url}`;
        this.common.http.SendRequest(url, this.apis.common.SubscribePackages.method, headers, undefined).then((res: any) => {
          if(res.statusCode && res.statusCode === 200)
            resolve(res);
          else
          reject(this.GetStatus(res));
        }).catch((rej: any) => {
          reject(this.GetStatus(rej));
        });
      });
  };

}