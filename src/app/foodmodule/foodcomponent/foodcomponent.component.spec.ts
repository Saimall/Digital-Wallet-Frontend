import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodcomponentComponent } from './foodcomponent.component';

describe('FoodcomponentComponent', () => {
  let component: FoodcomponentComponent;
  let fixture: ComponentFixture<FoodcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
