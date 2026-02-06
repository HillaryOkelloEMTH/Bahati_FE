import { TestBed } from '@angular/core/testing';

import { UserchartAnalyticsService } from './userchart-analytics.service';

describe('UserchartAnalyticsService', () => {
  let service: UserchartAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserchartAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
