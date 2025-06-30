import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileVmedoStoreComponent } from './mobile-vmedo-store.component';

describe('MobileVmedoStoreComponent', () => {
  let component: MobileVmedoStoreComponent;
  let fixture: ComponentFixture<MobileVmedoStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileVmedoStoreComponent]
    });
    fixture = TestBed.createComponent(MobileVmedoStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
