import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardsLookupComponent } from './wards-lookup.component';

describe('WardsLookupComponent', () => {
  let component: WardsLookupComponent;
  let fixture: ComponentFixture<WardsLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WardsLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WardsLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
