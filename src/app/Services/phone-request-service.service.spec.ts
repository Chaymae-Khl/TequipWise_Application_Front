import { TestBed } from '@angular/core/testing';

import { PhoneRequestServiceService } from './phone-request-service.service';

describe('PhoneRequestServiceService', () => {
  let service: PhoneRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
