import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMilkCanComponent } from './delete-milk-can.component';

describe('DeleteMilkCanComponent', () => {
  let component: DeleteMilkCanComponent;
  let fixture: ComponentFixture<DeleteMilkCanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMilkCanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMilkCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
