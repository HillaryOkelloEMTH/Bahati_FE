import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsConfigsComponent } from './products-configs.component';

describe('ProductsConfigsComponent', () => {
  let component: ProductsConfigsComponent;
  let fixture: ComponentFixture<ProductsConfigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsConfigsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
