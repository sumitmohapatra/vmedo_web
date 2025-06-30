import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAboutUsComponent } from './mobile-about-us.component';

describe('MobileAboutUsComponent', () => {
  let component: MobileAboutUsComponent;
  let fixture: ComponentFixture<MobileAboutUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileAboutUsComponent]
    });
    fixture = TestBed.createComponent(MobileAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
