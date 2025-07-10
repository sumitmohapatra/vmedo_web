import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmedoHomepageDesktopComponent } from './vmedo-homepage-desktop.component';

describe('VmedoHomepageDesktopComponent', () => {
  let component: VmedoHomepageDesktopComponent;
  let fixture: ComponentFixture<VmedoHomepageDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VmedoHomepageDesktopComponent]
    });
    fixture = TestBed.createComponent(VmedoHomepageDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
