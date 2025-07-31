import { Component, Output, EventEmitter, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/service/common.service';
import { AgentService } from 'src/app/services/agent.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements AfterViewInit {
  constructor(public common: CommonService, private router: Router, private agentService: AgentService, private app: AppComponent) { }
  txtRegUserName = '';
  txtRegEmailId = '';
  txtRegMobileNo = '';
  txtRegOTP = '';
  isOTPSentOnRegister = false;
  isMobileVerified = false;

  lblRegUserName?: string;
  lblRegEmailId?: string;
  lblRegMobileNo?: string;
  lblRegOTP?: string;

  isTermsAccepted = false;
  lblTermsError?: string;



  @Output() closeModal = new EventEmitter<void>();

  OnTextChanged(field: string, value: string) {
    // validation placeholder
  }

  AllowOnlyNumbers(event: KeyboardEvent) {
    if (!/^\d$/.test(event.key)) event.preventDefault();
  }

  OnClickSendOTPOnRegister() {
    this.isOTPSentOnRegister = true;
  }

  OnClickRegisterUser(displayPackage: string) {
    // Reset error messages
    this.lblRegUserName = '';
    this.lblRegEmailId = '';
    this.lblRegMobileNo = '';

    let isValid = true;

    if (!this.txtRegUserName || !this.txtRegUserName.trim()) {
      this.lblRegUserName = 'Name is required';
      isValid = false;
    }

    if (!this.txtRegEmailId || !this.txtRegEmailId.trim()) {
      this.lblRegEmailId = 'Email is required';
      isValid = false;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.txtRegEmailId)) {
      this.lblRegEmailId = 'Enter a valid email';
      isValid = false;
    }

    if (!this.txtRegMobileNo || !this.txtRegMobileNo.trim()) {
      this.lblRegMobileNo = 'Mobile number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(this.txtRegMobileNo)) {
      this.lblRegMobileNo = 'Enter a valid 10-digit mobile number';
      isValid = false;
    }

    if (!this.isTermsAccepted) {
      this.lblTermsError = 'You must accept the Terms and Conditions';
      isValid = false;
    } else {
      this.lblTermsError = '';
    }

    if (!isValid) return; // Stop if any field is invalid
    this.app.ShowLoader();

    const payload = {
      userName: this.txtRegUserName.trim(),
      userEmail: this.txtRegEmailId.trim(),
      userMobile: this.txtRegMobileNo.trim(),
      created_by: this.common.userInfo.userID
    };

    this.agentService.registerCustomer(payload).subscribe({
      next: (res) => {
        this.app.HideLoader();
        if (res.statusCode === 200) {
          this.app.ShowSuccess('Customer registered successfully!');
          this.isMobileVerified = true;
          this.closeModal.emit();
          this.common.viewSubscription(displayPackage);
          this.router.navigate(['/dashboard/package']);
        } else {
          this.app.ShowError(res.message);
        }

      },
      error: (err) => {
        this.app.HideLoader();
      }
    });
  }



  onClose() {
    this.closeModal.emit();
  }

  onChangeNumber() {
    this.isOTPSentOnRegister = false;
    this.txtRegOTP = '';
    this.lblRegOTP = '';
  }

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

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

}
