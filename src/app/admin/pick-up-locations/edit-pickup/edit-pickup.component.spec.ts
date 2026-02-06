import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPickupComponent } from './edit-pickup.component';

describe('EditPickupComponent', () => {
  let component: EditPickupComponent;
  let fixture: ComponentFixture<EditPickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPickupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
