import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements AfterViewInit {
  constructor(private router:Router){}
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

  onSubmit() {
    const code = this.otpInputs.map(i => i.nativeElement.value).join('');
    console.log('OTP submitted:', code);
    this.router.navigate(['agent/manage-customer']);
  }
}
