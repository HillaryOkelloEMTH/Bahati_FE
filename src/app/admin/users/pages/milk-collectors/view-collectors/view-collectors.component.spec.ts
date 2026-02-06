import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCollectorsComponent } from './view-collectors.component';

describe('ViewCollectorsComponent', () => {
  let component: ViewCollectorsComponent;
  let fixture: ComponentFixture<ViewCollectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCollectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCollectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
