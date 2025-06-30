import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentCareAtHomeComponentComponent } from './urgent-care-at-home-component.component';

describe('UrgentCareAtHomeComponentComponent', () => {
  let component: UrgentCareAtHomeComponentComponent;
  let fixture: ComponentFixture<UrgentCareAtHomeComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UrgentCareAtHomeComponentComponent]
    });
    fixture = TestBed.createComponent(UrgentCareAtHomeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
