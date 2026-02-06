import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubcountyComponent } from './delete-subcounty.component';

describe('DeleteSubcountyComponent', () => {
  let component: DeleteSubcountyComponent;
  let fixture: ComponentFixture<DeleteSubcountyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSubcountyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSubcountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
