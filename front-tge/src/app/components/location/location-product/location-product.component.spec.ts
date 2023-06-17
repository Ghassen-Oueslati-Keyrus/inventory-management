import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationProductComponent } from './location-product.component';

describe('LocationProductComponent', () => {
  let component: LocationProductComponent;
  let fixture: ComponentFixture<LocationProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
