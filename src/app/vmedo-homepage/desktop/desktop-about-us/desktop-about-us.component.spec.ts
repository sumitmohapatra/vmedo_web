import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopAboutUsComponent } from './desktop-about-us.component';

describe('DesktopAboutUsComponent', () => {
  let component: DesktopAboutUsComponent;
  let fixture: ComponentFixture<DesktopAboutUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopAboutUsComponent]
    });
    fixture = TestBed.createComponent(DesktopAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
