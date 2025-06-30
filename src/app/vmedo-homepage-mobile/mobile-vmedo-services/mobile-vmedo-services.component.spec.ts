import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileVmedoServicesComponent } from './mobile-vmedo-services.component';

describe('MobileVmedoServicesComponent', () => {
  let component: MobileVmedoServicesComponent;
  let fixture: ComponentFixture<MobileVmedoServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileVmedoServicesComponent]
    });
    fixture = TestBed.createComponent(MobileVmedoServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
