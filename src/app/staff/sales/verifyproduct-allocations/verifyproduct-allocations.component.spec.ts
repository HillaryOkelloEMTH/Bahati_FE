import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyproductAllocationsComponent } from './verifyproduct-allocations.component';

describe('VerifyproductAllocationsComponent', () => {
  let component: VerifyproductAllocationsComponent;
  let fixture: ComponentFixture<VerifyproductAllocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyproductAllocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyproductAllocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
