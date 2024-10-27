import { TestBed } from '@angular/core/testing';

import { RtoserviceService } from './rtoservice.service';

describe('RtoserviceService', () => {
  let service: RtoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
