import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicallistcomponentComponent } from './medicallistcomponent.component';

describe('MedicallistcomponentComponent', () => {
  let component: MedicallistcomponentComponent;
  let fixture: ComponentFixture<MedicallistcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicallistcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicallistcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
