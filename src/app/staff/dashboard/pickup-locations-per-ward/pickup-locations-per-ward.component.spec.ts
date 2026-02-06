import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupLocationsPerWardComponent } from './pickup-locations-per-ward.component';

describe('PickupLocationsPerWardComponent', () => {
  let component: PickupLocationsPerWardComponent;
  let fixture: ComponentFixture<PickupLocationsPerWardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupLocationsPerWardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupLocationsPerWardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
