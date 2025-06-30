import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloademidComponent } from './downloademid.component';

describe('DownloademidComponent', () => {
  let component: DownloademidComponent;
  let fixture: ComponentFixture<DownloademidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloademidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloademidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
