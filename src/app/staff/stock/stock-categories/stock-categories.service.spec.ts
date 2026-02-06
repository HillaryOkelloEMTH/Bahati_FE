import { TestBed } from '@angular/core/testing';

import { StockCategoriesService } from './stock-categories.service';

describe('StockCategoriesService', () => {
  let service: StockCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
