import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencycardComponent } from './emergencycard.component';

describe('EmergencycardComponent', () => {
  let component: EmergencycardComponent;
  let fixture: ComponentFixture<EmergencycardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencycardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
