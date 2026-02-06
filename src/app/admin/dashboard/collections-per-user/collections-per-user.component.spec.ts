import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsPerUserComponent } from './collections-per-user.component';

describe('CollectionsPerUserComponent', () => {
  let component: CollectionsPerUserComponent;
  let fixture: ComponentFixture<CollectionsPerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionsPerUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionsPerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
