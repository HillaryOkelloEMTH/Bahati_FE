import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerProductsReportComponent } from './farmer-products-report.component';

describe('FarmerProductsReportComponent', () => {
  let component: FarmerProductsReportComponent;
  let fixture: ComponentFixture<FarmerProductsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerProductsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerProductsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
