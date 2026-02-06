import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubcountyComponent } from './edit-subcounty.component';

describe('EditSubcountyComponent', () => {
  let component: EditSubcountyComponent;
  let fixture: ComponentFixture<EditSubcountyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubcountyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubcountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
