import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsComponentComponent } from './contact-us-component.component';

describe('ContactUsComponentComponent', () => {
  let component: ContactUsComponentComponent;
  let fixture: ComponentFixture<ContactUsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactUsComponentComponent]
    });
    fixture = TestBed.createComponent(ContactUsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
