import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) { }

  generateAgentOTP(userMobile: string): Observable<any> {
    const body = { userMobile };
    return this.http.post(`${environment.baseApiUrl}auth/GenerateAgentOTP`, body);
  }

  verifyAgentOTP(agentMobile: string, agentOtp: string): Observable<any> {
    const body = { agentMobile, agentOtp };
    return this.http.post(`${environment.baseApiUrl}auth/AgentauthenticationOTP`, body);
  }
  
  registerCustomer(data: {
    userName: string;
    userMobile: string;
    userEmail: string;
    created_by: string;
  }): Observable<any> {
    return this.http.post(`${environment.baseApiUrl}agent/AgentRegisterUser`, data);
  }

  getRegisteredUsers(agentId: string): Observable<any[]> {
    const url = `${environment.baseApiUrl}agent/AgentUserRegisteredList?AgentId=${agentId}`;
    return this.http.get<any[]>(url);
  }
  
  generateRegisterOTP(payload: { userMobile: string }): Observable<any> {
    const url = `${environment.baseApiUrl}agent/AgentGenerateRegisterOTP`;
    return this.http.post<any>(url, payload);
  }

  authenticateRegisterOTP(payload: { Umobile: string; OTP: string }): Observable<any> {
    const url = `${environment.baseApiUrl}agent/AgentUserauthenticateRegisterOTP`;
    return this.http.post<any>(url, payload);
  }

  getAgentId(){
    const agentInfo = localStorage.getItem('agentInfo');
    const userId = JSON.parse(agentInfo)?.userID;
    return userId;
  }

  getUserId(){
    const userId = localStorage.getItem('userID');
    return userId;
  }
  
}
