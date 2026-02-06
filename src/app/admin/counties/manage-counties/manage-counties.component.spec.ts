import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCountiesComponent } from './manage-counties.component';

describe('ManageCountiesComponent', () => {
  let component: ManageCountiesComponent;
  let fixture: ComponentFixture<ManageCountiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCountiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCountiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
