import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCountyComponent } from './delete-county.component';

describe('DeleteCountyComponent', () => {
  let component: DeleteCountyComponent;
  let fixture: ComponentFixture<DeleteCountyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCountyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
