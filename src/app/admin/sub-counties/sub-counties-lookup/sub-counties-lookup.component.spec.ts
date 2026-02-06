import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCountiesLookupComponent } from './sub-counties-lookup.component';

describe('SubCountiesLookupComponent', () => {
  let component: SubCountiesLookupComponent;
  let fixture: ComponentFixture<SubCountiesLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCountiesLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCountiesLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
