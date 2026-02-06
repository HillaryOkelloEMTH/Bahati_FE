import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedepartmentComponent } from './deletedepartment.component';

describe('DeletedepartmentComponent', () => {
  let component: DeletedepartmentComponent;
  let fixture: ComponentFixture<DeletedepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
