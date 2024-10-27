import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OttlistcomponentComponent } from './ottlistcomponent.component';

describe('OttlistcomponentComponent', () => {
  let component: OttlistcomponentComponent;
  let fixture: ComponentFixture<OttlistcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OttlistcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OttlistcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
