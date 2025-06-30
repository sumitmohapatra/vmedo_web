import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmedoHomepageComponent } from './vmedo-homepage.component';

describe('VmedoHomepageComponent', () => {
  let component: VmedoHomepageComponent;
  let fixture: ComponentFixture<VmedoHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VmedoHomepageComponent]
    });
    fixture = TestBed.createComponent(VmedoHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
