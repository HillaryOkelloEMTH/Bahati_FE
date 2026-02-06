import { TestBed } from '@angular/core/testing';

import { UsermeetingsService } from './usermeetings.service';

describe('UsermeetingsService', () => {
  let service: UsermeetingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsermeetingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
