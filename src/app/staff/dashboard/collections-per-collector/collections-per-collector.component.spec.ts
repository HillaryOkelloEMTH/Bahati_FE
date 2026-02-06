import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsPerCollectorComponent } from './collections-per-collector.component';

describe('CollectionsPerCollectorComponent', () => {
  let component: CollectionsPerCollectorComponent;
  let fixture: ComponentFixture<CollectionsPerCollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsPerCollectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsPerCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
