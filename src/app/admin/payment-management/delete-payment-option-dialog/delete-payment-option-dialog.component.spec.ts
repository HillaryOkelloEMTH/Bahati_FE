import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePaymentOptionDialogComponent } from './delete-payment-option-dialog.component';

describe('DeletePaymentOptionDialogComponent', () => {
  let component: DeletePaymentOptionDialogComponent;
  let fixture: ComponentFixture<DeletePaymentOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePaymentOptionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePaymentOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
