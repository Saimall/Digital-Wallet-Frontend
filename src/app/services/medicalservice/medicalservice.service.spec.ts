import { TestBed } from '@angular/core/testing';

import { MedicalserviceService } from './medicalservice.service';

describe('MedicalserviceService', () => {
  let service: MedicalserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
