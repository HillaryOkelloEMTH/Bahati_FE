import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerStatusLookupComponent } from './farmer-status-lookup.component';

describe('FarmerStatusLookupComponent', () => {
  let component: FarmerStatusLookupComponent;
  let fixture: ComponentFixture<FarmerStatusLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerStatusLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerStatusLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
