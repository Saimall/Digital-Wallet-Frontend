import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmlistcomponentComponent } from './atmlistcomponent.component';

describe('AtmlistcomponentComponent', () => {
  let component: AtmlistcomponentComponent;
  let fixture: ComponentFixture<AtmlistcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtmlistcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtmlistcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
