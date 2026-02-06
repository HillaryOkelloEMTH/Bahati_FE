import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMilkCansComponent } from './manage-milk-cans.component';

describe('ManageMilkCansComponent', () => {
  let component: ManageMilkCansComponent;
  let fixture: ComponentFixture<ManageMilkCansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMilkCansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMilkCansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
