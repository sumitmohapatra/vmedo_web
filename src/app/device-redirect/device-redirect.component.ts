// device-redirect.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-redirect',
  template: '', // no UI needed
})
export class DeviceRedirectComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
    this.router.navigate([isMobile ? 'home/mobile' : 'home/desktop']);
  }
}
