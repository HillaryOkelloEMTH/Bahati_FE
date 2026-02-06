import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubCountiesComponent } from './manage-sub-counties.component';

describe('ManageSubCountiesComponent', () => {
  let component: ManageSubCountiesComponent;
  let fixture: ComponentFixture<ManageSubCountiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSubCountiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubCountiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
