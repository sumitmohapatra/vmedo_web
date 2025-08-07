import { Component, Output, EventEmitter, ViewChildren, QueryList, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  constructor(
    public common: CommonService,
    private router: Router,
    private agentService: AgentService,
    private app: AppComponent
  ) { }

  txtRegUserName = '';
  txtRegEmailId = '';
  txtRegMobileNo = '';
  isOTPSentOnRegister = false;
  isMobileVerified = false;
  isTermsAccepted = false;

  lblRegUserName?: string;
  lblRegEmailId?: string;
  lblRegMobileNo?: string;
  lblRegOTP?: string;
  lblTermsError?: string;

  @Output() closeModal = new EventEmitter<void>();
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;
  @Input() createCustomerModalRef: any;

  OnTextChanged(field: string, value: string) {
    // Placeholder: add per-field real-time validation if needed
  }

  AllowOnlyNumbers(event: KeyboardEvent) {
    if (!/^\d$/.test(event.key)) event.preventDefault();
  }

  onClose() {
    this.closeModal.emit();
  }

  onCancelRegister() {
    this.closeModal.emit();
    this.createCustomerModalRef.close();
  }

  onChangeNumber() {
    this.isOTPSentOnRegister = false;
    this.lblRegOTP = '';
    this.otpInputs?.forEach(input => (input.nativeElement.value = ''));
  }

  getOTPFromInputs(): string {
    return this.otpInputs.map(input => input.nativeElement.value).join('');
  }

  generateOTP() {
    const otpPayload = {
      userMobile: this.txtRegMobileNo.trim()
    };

    this.app.ShowLoader();
    this.agentService.generateRegisterOTP(otpPayload).subscribe({
      next: (res) => {
        this.app.HideLoader();
        if (res.statusCode === 200) {
          this.isOTPSentOnRegister = true;
          this.app.ShowSuccess('OTP sent successfully!');
          setTimeout(() => this.setupOTPListeners(), 100);
        } else {
          this.app.ShowError(res.message);
        }
      },
      error: () => this.app.HideLoader()
    });
  }

  userId: string;

  verifyOtp() {
    const otp = this.getOTPFromInputs();
    if (!/^\d{6}$/.test(otp)) {
      this.lblRegOTP = 'Enter a valid 6-digit OTP';
      return;
    }

    this.app.ShowLoader();
    const payload = {
      Umobile: this.txtRegMobileNo.trim(),
      OTP: otp
    };

    this.agentService.authenticateRegisterOTP(payload).subscribe({
      next: (res) => {
        this.app.HideLoader();
        if (res.statusCode === 200) {
          this.app.ShowSuccess('Mobile number verified!');
          this.isMobileVerified = true;
          this.skipOtp();
        } else {
          this.app.ShowError(res.message);
        }
      },
      error: () => this.app.HideLoader()
    });
  }

  OnClickRegisterUser() {
    // Reset validation labels
    this.lblRegUserName = this.lblRegEmailId = this.lblRegMobileNo = this.lblTermsError = '';

    let isValid = true;

    if (!this.txtRegUserName.trim()) {
      this.lblRegUserName = 'Name is required';
      isValid = false;
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!this.txtRegEmailId.trim()) {
      this.lblRegEmailId = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(this.txtRegEmailId.trim())) {
      this.lblRegEmailId = 'Enter a valid email';
      isValid = false;
    }

    if (!/^\d{10}$/.test(this.txtRegMobileNo.trim())) {
      this.lblRegMobileNo = 'Enter a valid 10-digit mobile number';
      isValid = false;
    }

    if (!isValid) return;

    this.app.ShowLoader();
    const payload = {
      userName: this.txtRegUserName.trim(),
      userEmail: this.txtRegEmailId.trim(),
      userMobile: this.txtRegMobileNo.trim(),
      created_by: this.agentService.getAgentId()
    };

    this.agentService.registerCustomer(payload).subscribe({
      next: (res) => {
        this.app.HideLoader();
        if (res.statusCode === 200) {
          this.app.ShowSuccess('Customer registered successfully!');
          this.userId = res.userID;
          this.generateOTP();
        } else {
          this.app.ShowError(res.message);
        }
      },
      error: () => this.app.HideLoader()
    });
  }

  skipOtp() {
    const userInfo: any = JSON.parse(localStorage.getItem('agentInfo'));
    userInfo.userID = this.userId;
    localStorage.setItem('userID', userInfo.userID);
    localStorage.setItem('auth_token', userInfo.autToken);
    localStorage.setItem('refresh_token', userInfo.refreshToken);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    this.common.viewSubscription('All');
    this.router.navigate(['/dashboard/package']);
  }

  // ngAfterViewInit() {
  //   const inputs = this.otpInputs.toArray();

  //   inputs.forEach((inputRef, index) => {
  //     const el = inputRef.nativeElement;

  //     el.addEventListener('input', (e: Event) => {
  //       const value = el.value.replace(/\D/g, ''); // Only digits
  //       el.value = value.slice(0, 1); // Trim to 1 character

  //       // Auto-move to next
  //       if (value && index < inputs.length - 1) {
  //         inputs[index + 1].nativeElement.focus();
  //       }
  //     });

  //     el.addEventListener('keydown', (e: KeyboardEvent) => {
  //       if (e.key === 'Backspace' && !el.value && index > 0) {
  //         inputs[index - 1].nativeElement.focus();
  //       }
  //     });

  //     el.addEventListener('focus', () => {
  //       el.select();
  //     });

  //     el.addEventListener('paste', (e: ClipboardEvent) => {
  //       e.preventDefault();
  //       const pasted = (e.clipboardData?.getData('text') || '').replace(/\D/g, '');
  //       pasted.split('').forEach((char, i) => {
  //         if (inputs[i]) inputs[i].nativeElement.value = char;
  //       });
  //       const lastFilled = Math.min(pasted.length, inputs.length) - 1;
  //       if (inputs[lastFilled]) inputs[lastFilled].nativeElement.focus();
  //     });
  //   });

  //   // Auto-focus first box
  //   setTimeout(() => {
  //     if (inputs.length) {
  //       inputs[0].nativeElement.focus();
  //     }
  //   }, 50);
  // }

  setupOTPListeners() {
    const inputs = this.otpInputs.toArray();

    inputs.forEach((inputRef, index) => {
      const el = inputRef.nativeElement;

      el.addEventListener('input', () => {
        const value = el.value.replace(/\D/g, '');
        el.value = value.slice(0, 1);
        if (value && index < inputs.length - 1) {
          inputs[index + 1].nativeElement.focus();
        }
      });

      el.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Backspace' && !el.value && index > 0) {
          inputs[index - 1].nativeElement.focus();
        }
      });

      el.addEventListener('focus', () => {
        el.select();
      });

      el.addEventListener('paste', (e: ClipboardEvent) => {
        e.preventDefault();
        const pasted = (e.clipboardData?.getData('text') || '').replace(/\D/g, '');
        pasted.split('').forEach((char, i) => {
          if (inputs[i]) inputs[i].nativeElement.value = char;
        });
        const lastFilled = Math.min(pasted.length, inputs.length) - 1;
        if (inputs[lastFilled]) inputs[lastFilled].nativeElement.focus();
      });
    });

    // Focus first box
    if (inputs.length) inputs[0].nativeElement.focus();
  }


}
