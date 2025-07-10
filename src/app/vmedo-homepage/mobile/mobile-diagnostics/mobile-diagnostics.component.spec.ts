import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDiagnosticsComponent } from './mobile-diagnostics.component';

describe('MobileDiagnosticsComponent', () => {
  let component: MobileDiagnosticsComponent;
  let fixture: ComponentFixture<MobileDiagnosticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileDiagnosticsComponent]
    });
    fixture = TestBed.createComponent(MobileDiagnosticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
