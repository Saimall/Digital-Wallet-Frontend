import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtocomponentComponent } from './rtocomponent.component';

describe('RtocomponentComponent', () => {
  let component: RtocomponentComponent;
  let fixture: ComponentFixture<RtocomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RtocomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RtocomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
