import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentOptionDialogComponent } from './add-payment-option-dialog.component';

describe('AddPaymentOptionDialogComponent', () => {
  let component: AddPaymentOptionDialogComponent;
  let fixture: ComponentFixture<AddPaymentOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPaymentOptionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
