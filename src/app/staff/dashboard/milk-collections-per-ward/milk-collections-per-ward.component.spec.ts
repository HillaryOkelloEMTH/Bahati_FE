import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkCollectionsPerWardComponent } from './milk-collections-per-ward.component';

describe('MilkCollectionsPerWardComponent', () => {
  let component: MilkCollectionsPerWardComponent;
  let fixture: ComponentFixture<MilkCollectionsPerWardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilkCollectionsPerWardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkCollectionsPerWardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
