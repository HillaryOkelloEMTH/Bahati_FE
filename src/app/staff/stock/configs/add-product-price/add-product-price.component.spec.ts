import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductPriceComponent } from './add-product-price.component';

describe('AddProductPriceComponent', () => {
  let component: AddProductPriceComponent;
  let fixture: ComponentFixture<AddProductPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
