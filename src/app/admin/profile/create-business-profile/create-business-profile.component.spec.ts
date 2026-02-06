import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusinessProfileComponent } from './create-business-profile.component';

describe('CreateBusinessProfileComponent', () => {
  let component: CreateBusinessProfileComponent;
  let fixture: ComponentFixture<CreateBusinessProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBusinessProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBusinessProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
