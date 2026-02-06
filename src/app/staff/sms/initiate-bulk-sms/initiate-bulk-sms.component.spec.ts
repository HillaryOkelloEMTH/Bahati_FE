import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateBulkSmsComponent } from './initiate-bulk-sms.component';

describe('InitiateBulkSmsComponent', () => {
  let component: InitiateBulkSmsComponent;
  let fixture: ComponentFixture<InitiateBulkSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiateBulkSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateBulkSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
