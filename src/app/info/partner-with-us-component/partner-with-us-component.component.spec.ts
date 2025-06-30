import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerWithUsComponentComponent } from './partner-with-us-component.component';

describe('PartnerWithUsComponentComponent', () => {
  let component: PartnerWithUsComponentComponent;
  let fixture: ComponentFixture<PartnerWithUsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerWithUsComponentComponent]
    });
    fixture = TestBed.createComponent(PartnerWithUsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
