import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadcorpemidComponent } from './downloadcorpemid.component';

describe('DownloadcorpemidComponent', () => {
  let component: DownloadcorpemidComponent;
  let fixture: ComponentFixture<DownloadcorpemidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadcorpemidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadcorpemidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
