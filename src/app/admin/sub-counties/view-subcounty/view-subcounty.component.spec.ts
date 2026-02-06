import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubcountyComponent } from './view-subcounty.component';

describe('ViewSubcountyComponent', () => {
  let component: ViewSubcountyComponent;
  let fixture: ComponentFixture<ViewSubcountyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubcountyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubcountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
