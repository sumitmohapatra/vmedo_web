import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopVmedoSubscriptionComponent } from './desktop-vmedo-subscription.component';

describe('DesktopVmedoSubscriptionComponent', () => {
  let component: DesktopVmedoSubscriptionComponent;
  let fixture: ComponentFixture<DesktopVmedoSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopVmedoSubscriptionComponent]
    });
    fixture = TestBed.createComponent(DesktopVmedoSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
