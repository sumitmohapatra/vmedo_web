import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmedoHomepageMobileComponent } from './vmedo-homepage-mobile.component';

describe('VmedoHomepageMobileComponent', () => {
  let component: VmedoHomepageMobileComponent;
  let fixture: ComponentFixture<VmedoHomepageMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VmedoHomepageMobileComponent]
    });
    fixture = TestBed.createComponent(VmedoHomepageMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
