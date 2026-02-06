import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsPerCollectorsComponent } from './collections-per-collectors.component';

describe('CollectionsPerCollectorsComponent', () => {
  let component: CollectionsPerCollectorsComponent;
  let fixture: ComponentFixture<CollectionsPerCollectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsPerCollectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsPerCollectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
