import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopDiagnosticsComponent } from './desktop-diagnostics.component';

describe('DesktopDiagnosticsComponent', () => {
  let component: DesktopDiagnosticsComponent;
  let fixture: ComponentFixture<DesktopDiagnosticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopDiagnosticsComponent]
    });
    fixture = TestBed.createComponent(DesktopDiagnosticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
