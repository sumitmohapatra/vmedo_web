import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateComponentComponent } from './corporate-component.component';

describe('CorporateComponentComponent', () => {
  let component: CorporateComponentComponent;
  let fixture: ComponentFixture<CorporateComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorporateComponentComponent]
    });
    fixture = TestBed.createComponent(CorporateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
