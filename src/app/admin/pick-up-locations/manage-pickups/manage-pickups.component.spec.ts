import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePickupsComponent } from './manage-pickups.component';

describe('ManagePickupsComponent', () => {
  let component: ManagePickupsComponent;
  let fixture: ComponentFixture<ManagePickupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePickupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePickupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
