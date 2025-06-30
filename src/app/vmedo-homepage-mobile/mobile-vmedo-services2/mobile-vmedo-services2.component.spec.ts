import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileVmedoServices2Component } from './mobile-vmedo-services2.component';

describe('MobileVmedoServices2Component', () => {
  let component: MobileVmedoServices2Component;
  let fixture: ComponentFixture<MobileVmedoServices2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileVmedoServices2Component]
    });
    fixture = TestBed.createComponent(MobileVmedoServices2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
