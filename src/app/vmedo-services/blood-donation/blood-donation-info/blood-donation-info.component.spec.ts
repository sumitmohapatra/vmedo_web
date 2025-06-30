import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodDonationInfoComponent } from './blood-donation-info.component';

describe('BloodDonationInfoComponent', () => {
  let component: BloodDonationInfoComponent;
  let fixture: ComponentFixture<BloodDonationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodDonationInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodDonationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
