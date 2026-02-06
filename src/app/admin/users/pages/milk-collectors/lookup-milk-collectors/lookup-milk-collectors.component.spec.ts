import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupMilkCollectorsComponent } from './lookup-milk-collectors.component';

describe('LookupMilkCollectorsComponent', () => {
  let component: LookupMilkCollectorsComponent;
  let fixture: ComponentFixture<LookupMilkCollectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookupMilkCollectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupMilkCollectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
