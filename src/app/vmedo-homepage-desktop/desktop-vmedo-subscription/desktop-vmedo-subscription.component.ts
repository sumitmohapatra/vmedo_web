import { Component } from '@angular/core';

@Component({
  selector: 'app-desktop-vmedo-subscription',
  templateUrl: './desktop-vmedo-subscription.component.html',
  styleUrls: ['./desktop-vmedo-subscription.component.css']
})
export class DesktopVmedoSubscriptionComponent {
  videoReady = false;

  ngOnInit() {
    setTimeout(() => {
      this.videoReady = true;
    }, 2000); // Delay after page load
  }
  
}
