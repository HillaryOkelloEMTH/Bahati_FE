import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkCollectorsDetailsComponent } from './milk-collectors-details.component';

describe('MilkCollectorsDetailsComponent', () => {
  let component: MilkCollectorsDetailsComponent;
  let fixture: ComponentFixture<MilkCollectorsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilkCollectorsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkCollectorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
