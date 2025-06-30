import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyIdComponent } from './emergency-id.component';

describe('EmergencyIdComponent', () => {
  let component: EmergencyIdComponent;
  let fixture: ComponentFixture<EmergencyIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
