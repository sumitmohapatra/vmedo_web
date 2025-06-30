import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopBannerComponent } from './desktop-banner.component';

describe('DesktopBannerComponent', () => {
  let component: DesktopBannerComponent;
  let fixture: ComponentFixture<DesktopBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopBannerComponent]
    });
    fixture = TestBed.createComponent(DesktopBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
