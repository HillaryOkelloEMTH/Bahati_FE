import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPerDepartmentComponent } from './users-per-department.component';

describe('UsersPerDepartmentComponent', () => {
  let component: UsersPerDepartmentComponent;
  let fixture: ComponentFixture<UsersPerDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPerDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPerDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
