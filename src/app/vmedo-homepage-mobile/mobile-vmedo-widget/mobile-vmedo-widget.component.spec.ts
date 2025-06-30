import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileVmedoWidgetComponent } from './mobile-vmedo-widget.component';

describe('MobileVmedoWidgetComponent', () => {
  let component: MobileVmedoWidgetComponent;
  let fixture: ComponentFixture<MobileVmedoWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileVmedoWidgetComponent]
    });
    fixture = TestBed.createComponent(MobileVmedoWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
