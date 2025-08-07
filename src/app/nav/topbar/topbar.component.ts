import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  constructor(public common: CommonService, private router:Router,public app: AppComponent){}

  @Input() backRouteUrl:string;

  openProfile() {
    let profile = document.querySelector('.profile');
    let menu = document.querySelector('.menu');
    menu.classList.toggle('active');
  }

  OnClickLogout = () => {
    this.common.userInfo = undefined;
    this.common.auth_token = undefined;
    this.common.refresh_token = undefined;
    localStorage.clear();
    this.app.ShowSuccess(`User logged out successfully`).finally(() => {
      this.router.navigate(['/agent/login']);
    });
  };
}
