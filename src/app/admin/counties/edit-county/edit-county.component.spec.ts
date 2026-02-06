import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCountyComponent } from './edit-county.component';

describe('EditCountyComponent', () => {
  let component: EditCountyComponent;
  let fixture: ComponentFixture<EditCountyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCountyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
