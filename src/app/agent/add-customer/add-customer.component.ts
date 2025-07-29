import { Component, Output, EventEmitter, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements AfterViewInit {
  constructor(public common: CommonService, private router: Router) { }
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

  OnClickVerifyOTPOnRegister(displayPackage: string) {
    const code = this.otpInputs.map(i => i.nativeElement.value).join('');
    console.log('OTP submitted:', code);
    this.isMobileVerified = true;
    this.closeModal.emit();
    this.common.viewSubscription(displayPackage);
    this.router.navigate(['/dashboard/package']);
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
