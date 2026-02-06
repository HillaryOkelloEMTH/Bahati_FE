import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupPickUpLocationsComponent } from './lookup-pick-up-locations.component';

describe('LookupPickUpLocationsComponent', () => {
  let component: LookupPickUpLocationsComponent;
  let fixture: ComponentFixture<LookupPickUpLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookupPickUpLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupPickUpLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
