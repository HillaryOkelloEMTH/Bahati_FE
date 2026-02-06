import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupPaymentOptionComponent } from './lookup-payment-option.component';

describe('LookupPaymentOptionComponent', () => {
  let component: LookupPaymentOptionComponent;
  let fixture: ComponentFixture<LookupPaymentOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookupPaymentOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupPaymentOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
