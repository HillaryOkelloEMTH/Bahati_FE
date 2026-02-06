import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentOptionDialogComponent } from './edit-payment-option-dialog.component';

describe('EditPaymentOptionDialogComponent', () => {
  let component: EditPaymentOptionDialogComponent;
  let fixture: ComponentFixture<EditPaymentOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaymentOptionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymentOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
