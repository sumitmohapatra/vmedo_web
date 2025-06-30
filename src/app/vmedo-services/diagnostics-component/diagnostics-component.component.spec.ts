import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticsComponentComponent } from './diagnostics-component.component';

describe('DiagnosticsComponentComponent', () => {
  let component: DiagnosticsComponentComponent;
  let fixture: ComponentFixture<DiagnosticsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiagnosticsComponentComponent]
    });
    fixture = TestBed.createComponent(DiagnosticsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
