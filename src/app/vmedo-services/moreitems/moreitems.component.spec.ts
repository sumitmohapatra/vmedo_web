import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreitemsComponent } from './moreitems.component';

describe('MoreitemsComponent', () => {
  let component: MoreitemsComponent;
  let fixture: ComponentFixture<MoreitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreitemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
