import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMilkCanComponent } from './add-milk-can.component';

describe('AddMilkCanComponent', () => {
  let component: AddMilkCanComponent;
  let fixture: ComponentFixture<AddMilkCanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMilkCanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMilkCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
