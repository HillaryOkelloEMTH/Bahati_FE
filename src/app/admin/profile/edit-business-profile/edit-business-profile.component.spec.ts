import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessProfileComponent } from './edit-business-profile.component';

describe('EditBusinessProfileComponent', () => {
  let component: EditBusinessProfileComponent;
  let fixture: ComponentFixture<EditBusinessProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBusinessProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBusinessProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
