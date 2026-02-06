import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAllocationComponent } from './products-allocation.component';

describe('ProductsAllocationComponent', () => {
  let component: ProductsAllocationComponent;
  let fixture: ComponentFixture<ProductsAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
