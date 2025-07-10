import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopMediaCoverageComponent } from './desktop-media-coverage.component';

describe('DesktopMediaCoverageComponent', () => {
  let component: DesktopMediaCoverageComponent;
  let fixture: ComponentFixture<DesktopMediaCoverageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopMediaCoverageComponent]
    });
    fixture = TestBed.createComponent(DesktopMediaCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
