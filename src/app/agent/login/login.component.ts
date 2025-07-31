import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private agentService:AgentService,private common:CommonService,
    private app:AppComponent
  ) {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const phone = this.loginForm.value.phone;
      // You can send OTP API request here if needed before routing
      const body = {
        userMobile: phone
      };
      this.app.ShowLoader();
      this.agentService.generateAgentOTP(phone).subscribe({
        next: (res) => {
          this.app.HideLoader();
          if(res.statusCode === 200){
            this.app.ShowSuccess('Otp succesfully sent to your registered number!');
            this.router.navigate(['agent/verify-otp'], { queryParams: { phone } });
          }else{
            this.app.ShowError(res.message);
          }
        },error: (err) => {
          this.app.HideLoader();
        }
      });
    }
  }
}
