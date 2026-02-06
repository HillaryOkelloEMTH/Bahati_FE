import { TestBed } from '@angular/core/testing';

import { MilkCansService } from './milk-cans.service';

describe('MilkCansService', () => {
  let service: MilkCansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilkCansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
