import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllocationComponent } from './add-allocation.component';

describe('AddAllocationComponent', () => {
  let component: AddAllocationComponent;
  let fixture: ComponentFixture<AddAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
