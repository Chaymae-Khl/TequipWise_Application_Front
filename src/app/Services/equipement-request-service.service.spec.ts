import { TestBed } from '@angular/core/testing';

import { EquipementRequestServiceService } from './equipement-request-service.service';

describe('EquipementRequestServiceService', () => {
  let service: EquipementRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipementRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
