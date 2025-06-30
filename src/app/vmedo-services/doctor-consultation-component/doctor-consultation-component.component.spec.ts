import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorConsultationComponentComponent } from './doctor-consultation-component.component';

describe('DoctorConsultationComponentComponent', () => {
  let component: DoctorConsultationComponentComponent;
  let fixture: ComponentFixture<DoctorConsultationComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorConsultationComponentComponent]
    });
    fixture = TestBed.createComponent(DoctorConsultationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
