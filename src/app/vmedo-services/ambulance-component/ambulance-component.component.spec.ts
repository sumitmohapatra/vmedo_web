import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceComponentComponent } from './ambulance-component.component';

describe('AmbulanceComponentComponent', () => {
  let component: AmbulanceComponentComponent;
  let fixture: ComponentFixture<AmbulanceComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmbulanceComponentComponent]
    });
    fixture = TestBed.createComponent(AmbulanceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
