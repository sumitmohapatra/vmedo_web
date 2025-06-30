import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalAdmissionComponentComponent } from './hospital-admission-component.component';

describe('HospitalAdmissionComponentComponent', () => {
  let component: HospitalAdmissionComponentComponent;
  let fixture: ComponentFixture<HospitalAdmissionComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalAdmissionComponentComponent]
    });
    fixture = TestBed.createComponent(HospitalAdmissionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
