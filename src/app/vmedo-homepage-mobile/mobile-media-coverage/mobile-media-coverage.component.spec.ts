import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMediaCoverageComponent } from './mobile-media-coverage.component';

describe('MobileMediaCoverageComponent', () => {
  let component: MobileMediaCoverageComponent;
  let fixture: ComponentFixture<MobileMediaCoverageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileMediaCoverageComponent]
    });
    fixture = TestBed.createComponent(MobileMediaCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
