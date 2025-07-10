import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-vmedo-services2',
  templateUrl: './mobile-vmedo-services2.component.html',
  styleUrls: ['./mobile-vmedo-services2.component.css']
})
export class MobileVmedoServices2Component {
  showSection: boolean = true;

  toggleSection(): void {
    this.showSection = !this.showSection;
  }
}
