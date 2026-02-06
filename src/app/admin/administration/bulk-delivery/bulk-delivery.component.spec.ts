import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkDeliveryComponent } from './bulk-delivery.component';

describe('BulkDeliveryComponent', () => {
  let component: BulkDeliveryComponent;
  let fixture: ComponentFixture<BulkDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
