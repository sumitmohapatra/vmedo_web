import { Component } from '@angular/core';

@Component({
  selector: 'app-desktop-middle-section',
  templateUrl: './desktop-middle-section.component.html',
  styleUrls: ['./desktop-middle-section.component.css']
})
export class DesktopMiddleSectionComponent {
  isDropdownDesktopOpen: boolean = false;

  toggleDropdownDesktop() {
      this.isDropdownDesktopOpen = !this.isDropdownDesktopOpen;
  }

}
