import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductConfigComponent } from './delete-product-config.component';

describe('DeleteProductConfigComponent', () => {
  let component: DeleteProductConfigComponent;
  let fixture: ComponentFixture<DeleteProductConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProductConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProductConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
