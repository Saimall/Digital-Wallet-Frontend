import { TestBed } from '@angular/core/testing';

import { OttserviceService } from './ottservice.service';

describe('OttserviceService', () => {
  let service: OttserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OttserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
