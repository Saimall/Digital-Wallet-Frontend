import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilelistcomponentComponent } from './filelistcomponent.component';

describe('FilelistcomponentComponent', () => {
  let component: FilelistcomponentComponent;
  let fixture: ComponentFixture<FilelistcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilelistcomponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilelistcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
