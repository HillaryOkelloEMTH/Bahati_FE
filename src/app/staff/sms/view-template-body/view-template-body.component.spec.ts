import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTemplateBodyComponent } from './view-template-body.component';

describe('ViewTemplateBodyComponent', () => {
  let component: ViewTemplateBodyComponent;
  let fixture: ComponentFixture<ViewTemplateBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTemplateBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTemplateBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
