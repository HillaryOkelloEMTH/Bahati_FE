import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDeliveryComponent } from './return-delivery.component';

describe('ReturnDeliveryComponent', () => {
  let component: ReturnDeliveryComponent;
  let fixture: ComponentFixture<ReturnDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
