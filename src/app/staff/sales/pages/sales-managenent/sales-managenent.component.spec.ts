import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesManagenentComponent } from './sales-managenent.component';

describe('SalesManagenentComponent', () => {
  let component: SalesManagenentComponent;
  let fixture: ComponentFixture<SalesManagenentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesManagenentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesManagenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
