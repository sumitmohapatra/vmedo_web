import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSidemenuComponent } from './mobile-sidemenu.component';

describe('MobileSidemenuComponent', () => {
  let component: MobileSidemenuComponent;
  let fixture: ComponentFixture<MobileSidemenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileSidemenuComponent]
    });
    fixture = TestBed.createComponent(MobileSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
