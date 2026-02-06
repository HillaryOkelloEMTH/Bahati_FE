import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStockCategoryComponent } from './delete-stock-category.component';

describe('DeleteStockCategoryComponent', () => {
  let component: DeleteStockCategoryComponent;
  let fixture: ComponentFixture<DeleteStockCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteStockCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStockCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
