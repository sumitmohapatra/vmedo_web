import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmedoLabsComponentComponent } from './vmedo-labs-component.component';

describe('VmedoLabsComponentComponent', () => {
  let component: VmedoLabsComponentComponent;
  let fixture: ComponentFixture<VmedoLabsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VmedoLabsComponentComponent]
    });
    fixture = TestBed.createComponent(VmedoLabsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
