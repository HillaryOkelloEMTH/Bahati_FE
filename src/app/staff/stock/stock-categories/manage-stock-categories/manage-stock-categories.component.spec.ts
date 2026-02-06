import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStockCategoriesComponent } from './manage-stock-categories.component';

describe('ManageStockCategoriesComponent', () => {
  let component: ManageStockCategoriesComponent;
  let fixture: ComponentFixture<ManageStockCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStockCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStockCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
