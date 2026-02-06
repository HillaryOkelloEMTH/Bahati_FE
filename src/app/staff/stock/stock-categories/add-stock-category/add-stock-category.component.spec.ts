import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockCategoryComponent } from './add-stock-category.component';

describe('AddStockCategoryComponent', () => {
  let component: AddStockCategoryComponent;
  let fixture: ComponentFixture<AddStockCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStockCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
