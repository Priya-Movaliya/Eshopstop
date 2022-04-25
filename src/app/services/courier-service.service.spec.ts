import { TestBed } from '@angular/core/testing';

import { CourierServiceService } from './courier-service.service';

describe('CourierServiceService', () => {
  let service: CourierServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourierServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
