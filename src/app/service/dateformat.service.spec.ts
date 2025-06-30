import { TestBed } from '@angular/core/testing';

import { DateformatService } from './dateformat.service';

describe('DateformatService', () => {
  let service: DateformatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateformatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
