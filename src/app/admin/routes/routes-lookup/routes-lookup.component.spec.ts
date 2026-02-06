import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesLookupComponent } from './routes-lookup.component';

describe('RoutesLookupComponent', () => {
  let component: RoutesLookupComponent;
  let fixture: ComponentFixture<RoutesLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutesLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
