import { TestBed } from '@angular/core/testing';

import { SapNumberServiceService } from './sap-number-service.service';

describe('SapNumberServiceService', () => {
  let service: SapNumberServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SapNumberServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
