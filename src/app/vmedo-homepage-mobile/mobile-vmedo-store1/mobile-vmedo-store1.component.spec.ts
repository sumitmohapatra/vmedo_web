import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileVmedoStore1Component } from './mobile-vmedo-store1.component';

describe('MobileVmedoStore1Component', () => {
  let component: MobileVmedoStore1Component;
  let fixture: ComponentFixture<MobileVmedoStore1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileVmedoStore1Component]
    });
    fixture = TestBed.createComponent(MobileVmedoStore1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
