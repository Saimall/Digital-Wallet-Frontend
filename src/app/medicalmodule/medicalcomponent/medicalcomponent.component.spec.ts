import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalcomponentComponent } from './medicalcomponent.component';

describe('MedicalcomponentComponent', () => {
  let component: MedicalcomponentComponent;
  let fixture: ComponentFixture<MedicalcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
