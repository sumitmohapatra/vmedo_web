import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopMiddleSectionComponent } from './desktop-middle-section.component';

describe('DesktopMiddleSectionComponent', () => {
  let component: DesktopMiddleSectionComponent;
  let fixture: ComponentFixture<DesktopMiddleSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopMiddleSectionComponent]
    });
    fixture = TestBed.createComponent(DesktopMiddleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
