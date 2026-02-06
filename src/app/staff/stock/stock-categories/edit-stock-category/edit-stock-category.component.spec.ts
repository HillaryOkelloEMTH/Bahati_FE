import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStockCategoryComponent } from './edit-stock-category.component';

describe('EditStockCategoryComponent', () => {
  let component: EditStockCategoryComponent;
  let fixture: ComponentFixture<EditStockCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStockCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStockCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
