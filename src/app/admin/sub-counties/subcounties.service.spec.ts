import { TestBed } from '@angular/core/testing';

import { SubcountiesService } from './subcounties.service';

describe('SubcountiesService', () => {
  let service: SubcountiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcountiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
