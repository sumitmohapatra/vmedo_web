import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateEnquiryFormComponent } from './corporate-enquiry-form.component';

describe('CorporateEnquiryFormComponent', () => {
  let component: CorporateEnquiryFormComponent;
  let fixture: ComponentFixture<CorporateEnquiryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorporateEnquiryFormComponent]
    });
    fixture = TestBed.createComponent(CorporateEnquiryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
