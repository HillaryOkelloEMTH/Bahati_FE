import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatAllocationComponent } from './float-allocation.component';

describe('FloatAllocationComponent', () => {
  let component: FloatAllocationComponent;
  let fixture: ComponentFixture<FloatAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
