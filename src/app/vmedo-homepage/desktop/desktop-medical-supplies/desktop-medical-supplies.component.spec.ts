import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopMedicalSuppliesComponent } from './desktop-medical-supplies.component';

describe('DesktopMedicalSuppliesComponent', () => {
  let component: DesktopMedicalSuppliesComponent;
  let fixture: ComponentFixture<DesktopMedicalSuppliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopMedicalSuppliesComponent]
    });
    fixture = TestBed.createComponent(DesktopMedicalSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
