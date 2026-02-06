import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsManagementComponent } from './sms-management.component';

describe('SmsManagementComponent', () => {
  let component: SmsManagementComponent;
  let fixture: ComponentFixture<SmsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
