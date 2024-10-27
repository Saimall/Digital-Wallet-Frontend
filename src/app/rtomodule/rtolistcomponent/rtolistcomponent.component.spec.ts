import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtolistcomponentComponent } from './rtolistcomponent.component';

describe('RtolistcomponentComponent', () => {
  let component: RtolistcomponentComponent;
  let fixture: ComponentFixture<RtolistcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RtolistcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RtolistcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
