import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodlistcomponentComponent } from './foodlistcomponent.component';

describe('FoodlistcomponentComponent', () => {
  let component: FoodlistcomponentComponent;
  let fixture: ComponentFixture<FoodlistcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodlistcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodlistcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
