import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBloodDonorComponentComponent } from './find-blood-donor-component.component';

describe('FindBloodDonorComponentComponent', () => {
  let component: FindBloodDonorComponentComponent;
  let fixture: ComponentFixture<FindBloodDonorComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindBloodDonorComponentComponent]
    });
    fixture = TestBed.createComponent(FindBloodDonorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
