import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerStatementComponent } from './farmer-statement.component';

describe('FarmerStatementComponent', () => {
  let component: FarmerStatementComponent;
  let fixture: ComponentFixture<FarmerStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
