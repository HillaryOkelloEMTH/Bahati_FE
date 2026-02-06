import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BahatiDailySummaryComponent } from './bahati-daily-summary.component';

describe('BahatiDailySummaryComponent', () => {
  let component: BahatiDailySummaryComponent;
  let fixture: ComponentFixture<BahatiDailySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BahatiDailySummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BahatiDailySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
