import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFarmerComponent } from './delete-farmer.component';

describe('DeleteFarmerComponent', () => {
  let component: DeleteFarmerComponent;
  let fixture: ComponentFixture<DeleteFarmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFarmerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
