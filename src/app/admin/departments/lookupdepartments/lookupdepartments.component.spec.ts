import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupdepartmentsComponent } from './lookupdepartments.component';

describe('LookupdepartmentsComponent', () => {
  let component: LookupdepartmentsComponent;
  let fixture: ComponentFixture<LookupdepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LookupdepartmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupdepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
