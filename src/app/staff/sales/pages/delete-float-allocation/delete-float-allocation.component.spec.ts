import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFloatAllocationComponent } from './delete-float-allocation.component';

describe('DeleteFloatAllocationComponent', () => {
  let component: DeleteFloatAllocationComponent;
  let fixture: ComponentFixture<DeleteFloatAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFloatAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFloatAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
