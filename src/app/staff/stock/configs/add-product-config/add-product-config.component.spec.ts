import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductConfigComponent } from './add-product-config.component';

describe('AddProductConfigComponent', () => {
  let component: AddProductConfigComponent;
  let fixture: ComponentFixture<AddProductConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
