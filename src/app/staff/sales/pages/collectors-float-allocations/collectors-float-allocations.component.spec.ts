import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorsFloatAllocationsComponent } from './collectors-float-allocations.component';

describe('CollectorsFloatAllocationsComponent', () => {
  let component: CollectorsFloatAllocationsComponent;
  let fixture: ComponentFixture<CollectorsFloatAllocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectorsFloatAllocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorsFloatAllocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
