import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements AfterViewInit {
  constructor(private router: Router, private route: ActivatedRoute, private agentService: AgentService, private common:CommonService,
    private app:AppComponent
  ) { }
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;
  txtRegMobileNo: string = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.txtRegMobileNo = params['phone'] || '';
    });
  }

  onChangeNumber() {
    this.router.navigate(['agent/login']);
  }

  ngAfterViewInit() {
    const inputs = this.otpInputs.toArray();

    inputs.forEach((input, index) => {
      const el = input.nativeElement;

      el.addEventListener('keydown', (e: KeyboardEvent) => {
        if (
          !/^[0-9]{1}$/.test(e.key) &&
          e.key !== 'Backspace' &&
          e.key !== 'Delete' &&
          e.key !== 'Tab'
        ) {
          e.preventDefault();
        }

        if ((e.key === 'Backspace' || e.key === 'Delete') && !el.value && index > 0) {
          inputs[index - 1].nativeElement.focus();
        }
      });

      el.addEventListener('input', () => {
        if (el.value && index < inputs.length - 1) {
          inputs[index + 1].nativeElement.focus();
        } else if (index === inputs.length - 1) {
          // Optionally move focus to submit button
        }
      });

      el.addEventListener('focus', () => {
        el.select();
      });

      el.addEventListener('paste', (e: ClipboardEvent) => {
        e.preventDefault();
        const pasteData = e.clipboardData?.getData('text') || '';
        if (/^\d{4}$/.test(pasteData)) {
          pasteData.split('').forEach((char, i) => {
            if (inputs[i]) inputs[i].nativeElement.value = char;
          });
          inputs[inputs.length - 1].nativeElement.focus();
        }
      });
    });
  }

  onSubmit() {
    const code = this.otpInputs.map(i => i.nativeElement.value).join('');
    if (code.length !== 6) {
      this.app.ShowError('Please enter the full 6-digit OTP');
      return;
    }

    this.agentService.verifyAgentOTP(this.txtRegMobileNo, code).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.app.ShowSuccess('Agent login success!');

          if (res.objret) {
            this.common.userInfo = res.objret;
            localStorage.setItem('userInfo', JSON.stringify(res.objret));
          }
          this.router.navigate(['agent/manage-customer']);
        }else{
          this.app.ShowError(res.message);
        }
      },
      error: (err) => {
        this.app.ShowError('Invalid or expired OTP. Please try again.');
      }
    });
  }
}
