import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OttcomponentComponent } from './ottcomponent.component';

describe('OttcomponentComponent', () => {
  let component: OttcomponentComponent;
  let fixture: ComponentFixture<OttcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OttcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OttcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
