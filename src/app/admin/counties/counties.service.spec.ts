import { TestBed } from '@angular/core/testing';

import { CountiesService } from './counties.service';

describe('CountiesService', () => {
  let service: CountiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
