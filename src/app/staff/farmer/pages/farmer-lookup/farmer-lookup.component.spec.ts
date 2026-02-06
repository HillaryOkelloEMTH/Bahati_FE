import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerLookupComponent } from './farmer-lookup.component';

describe('FarmerLookupComponent', () => {
  let component: FarmerLookupComponent;
  let fixture: ComponentFixture<FarmerLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
