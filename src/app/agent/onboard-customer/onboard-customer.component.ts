import { Component } from '@angular/core';

@Component({
  selector: 'app-onboard-customer',
  templateUrl: './onboard-customer.component.html',
  styleUrls: ['./onboard-customer.component.css']
})
export class OnboardCustomerComponent {
  currentStep = 0;

  steps = ['Personal Info', 'Account Info', 'Confirmation'];

  goToStep(index: number): void {
    this.currentStep = index;
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submit(): void {
    // You would ideally collect data from child components here
    alert('Form submitted!');
  }

}
