import { TestBed } from '@angular/core/testing';

import { Console.LoggerService } from './console.logger.service';

describe('Console.LoggerService', () => {
  let service: Console.LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Console.LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
