import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPickupComponent } from './view-pickup.component';

describe('ViewPickupComponent', () => {
  let component: ViewPickupComponent;
  let fixture: ComponentFixture<ViewPickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPickupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
