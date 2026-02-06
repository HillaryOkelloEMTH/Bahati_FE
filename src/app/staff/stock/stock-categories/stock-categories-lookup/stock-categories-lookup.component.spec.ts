import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCategoriesLookupComponent } from './stock-categories-lookup.component';

describe('StockCategoriesLookupComponent', () => {
  let component: StockCategoriesLookupComponent;
  let fixture: ComponentFixture<StockCategoriesLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockCategoriesLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCategoriesLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
