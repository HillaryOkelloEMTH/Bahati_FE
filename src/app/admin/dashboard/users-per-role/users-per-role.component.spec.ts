import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPerRoleComponent } from './users-per-role.component';

describe('UsersPerRoleComponent', () => {
  let component: UsersPerRoleComponent;
  let fixture: ComponentFixture<UsersPerRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPerRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPerRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
