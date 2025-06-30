import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopReviewComponent } from './desktop-review.component';

describe('DesktopReviewComponent', () => {
  let component: DesktopReviewComponent;
  let fixture: ComponentFixture<DesktopReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopReviewComponent]
    });
    fixture = TestBed.createComponent(DesktopReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
