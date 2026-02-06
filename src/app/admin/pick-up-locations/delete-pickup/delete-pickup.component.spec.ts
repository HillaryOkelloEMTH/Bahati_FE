import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePickupComponent } from './delete-pickup.component';

describe('DeletePickupComponent', () => {
  let component: DeletePickupComponent;
  let fixture: ComponentFixture<DeletePickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePickupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
