import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUrgentCareComponent } from './mobile-urgent-care.component';

describe('MobileUrgentCareComponent', () => {
  let component: MobileUrgentCareComponent;
  let fixture: ComponentFixture<MobileUrgentCareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileUrgentCareComponent]
    });
    fixture = TestBed.createComponent(MobileUrgentCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
