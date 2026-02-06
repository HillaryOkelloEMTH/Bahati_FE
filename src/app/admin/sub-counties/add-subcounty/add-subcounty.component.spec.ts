import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubcountyComponent } from './add-subcounty.component';

describe('AddSubcountyComponent', () => {
  let component: AddSubcountyComponent;
  let fixture: ComponentFixture<AddSubcountyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubcountyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubcountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
