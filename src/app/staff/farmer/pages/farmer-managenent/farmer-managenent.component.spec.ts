import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerManagenentComponent } from './farmer-managenent.component';

describe('FarmerManagenentComponent', () => {
  let component: FarmerManagenentComponent;
  let fixture: ComponentFixture<FarmerManagenentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerManagenentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerManagenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
