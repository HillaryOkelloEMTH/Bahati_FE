import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFloatAllocationComponent } from './edit-float-allocation.component';

describe('EditFloatAllocationComponent', () => {
  let component: EditFloatAllocationComponent;
  let fixture: ComponentFixture<EditFloatAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFloatAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFloatAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
