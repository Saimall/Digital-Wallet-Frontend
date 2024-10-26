import { TestBed } from '@angular/core/testing';

import { AtmService } from './atmservice.service';

describe('AtmserviceService', () => {
  let service: AtmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
