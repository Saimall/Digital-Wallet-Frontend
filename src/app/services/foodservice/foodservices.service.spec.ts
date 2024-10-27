import { TestBed } from '@angular/core/testing';

import { FoodservicesService } from './foodservices.service';

describe('FoodservicesService', () => {
  let service: FoodservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
