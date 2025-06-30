import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalinfoComponent } from './hospitalinfo.component';

describe('HospitalinfoComponent', () => {
  let component: HospitalinfoComponent;
  let fixture: ComponentFixture<HospitalinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
