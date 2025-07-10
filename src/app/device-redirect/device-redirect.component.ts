// device-redirect.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-redirect',
  template: '', // no UI needed
})
export class DeviceRedirectComponent implements OnInit {
  constructor(private router: Router) {}

  isMobile: boolean = false;

  ngOnInit(): void {
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }
}
