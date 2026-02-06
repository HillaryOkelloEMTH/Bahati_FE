import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkCollectorsLookupComponent } from './milk-collectors-lookup.component';

describe('MilkCollectorsLookupComponent', () => {
  let component: MilkCollectorsLookupComponent;
  let fixture: ComponentFixture<MilkCollectorsLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilkCollectorsLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkCollectorsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
