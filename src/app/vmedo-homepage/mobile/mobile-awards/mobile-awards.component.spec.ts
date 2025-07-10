import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAwardsComponent } from './mobile-awards.component';

describe('MobileAwardsComponent', () => {
  let component: MobileAwardsComponent;
  let fixture: ComponentFixture<MobileAwardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileAwardsComponent]
    });
    fixture = TestBed.createComponent(MobileAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
