import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardCustomerComponent } from './onboard-customer.component';

describe('OnboardCustomerComponent', () => {
  let component: OnboardCustomerComponent;
  let fixture: ComponentFixture<OnboardCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnboardCustomerComponent]
    });
    fixture = TestBed.createComponent(OnboardCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
