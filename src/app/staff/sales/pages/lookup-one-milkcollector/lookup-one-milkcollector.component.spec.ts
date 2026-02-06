import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupOneMilkcollectorComponent } from './lookup-one-milkcollector.component';

describe('LookupOneMilkcollectorComponent', () => {
  let component: LookupOneMilkcollectorComponent;
  let fixture: ComponentFixture<LookupOneMilkcollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookupOneMilkcollectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupOneMilkcollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
