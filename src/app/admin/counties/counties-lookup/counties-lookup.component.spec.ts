import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountiesLookupComponent } from './counties-lookup.component';

describe('CountiesLookupComponent', () => {
  let component: CountiesLookupComponent;
  let fixture: ComponentFixture<CountiesLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountiesLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountiesLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
