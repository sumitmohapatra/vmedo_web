import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-vmedo-services',
  templateUrl: './mobile-vmedo-services.component.html',
  styleUrls: ['./mobile-vmedo-services.component.css']
})
export class MobileVmedoServicesComponent {
  showPopup: boolean = false;

  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }

}
