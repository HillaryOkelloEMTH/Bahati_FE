import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersPerPickupLocationComponent } from './farmers-per-pickup-location.component';

describe('FarmersPerPickupLocationComponent', () => {
  let component: FarmersPerPickupLocationComponent;
  let fixture: ComponentFixture<FarmersPerPickupLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmersPerPickupLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersPerPickupLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
