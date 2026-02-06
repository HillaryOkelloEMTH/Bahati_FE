import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMilkCanComponent } from './edit-milk-can.component';

describe('EditMilkCanComponent', () => {
  let component: EditMilkCanComponent;
  let fixture: ComponentFixture<EditMilkCanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMilkCanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMilkCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
