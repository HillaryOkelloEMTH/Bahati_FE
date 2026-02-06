import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesLookUpComponent } from './routes-look-up.component';

describe('RoutesLookUpComponent', () => {
  let component: RoutesLookUpComponent;
  let fixture: ComponentFixture<RoutesLookUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutesLookUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesLookUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
