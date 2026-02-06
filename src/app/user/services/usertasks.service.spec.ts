import { TestBed } from '@angular/core/testing';

import { UsertasksService } from './usertasks.service';

describe('UsertasksService', () => {
  let service: UsertasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsertasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
