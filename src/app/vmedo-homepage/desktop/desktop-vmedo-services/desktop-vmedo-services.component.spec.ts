import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopVmedoServicesComponent } from './desktop-vmedo-services.component';

describe('DesktopVmedoServicesComponent', () => {
  let component: DesktopVmedoServicesComponent;
  let fixture: ComponentFixture<DesktopVmedoServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopVmedoServicesComponent]
    });
    fixture = TestBed.createComponent(DesktopVmedoServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
