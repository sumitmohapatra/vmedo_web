import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopMiniBannersComponent } from './desktop-mini-banners.component';

describe('DesktopMiniBannersComponent', () => {
  let component: DesktopMiniBannersComponent;
  let fixture: ComponentFixture<DesktopMiniBannersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopMiniBannersComponent]
    });
    fixture = TestBed.createComponent(DesktopMiniBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
