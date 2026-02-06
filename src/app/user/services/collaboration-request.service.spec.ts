import { TestBed } from '@angular/core/testing';

import { CollaborationRequestService } from './collaboration-request.service';

describe('CollaborationRequestService', () => {
  let service: CollaborationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollaborationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
