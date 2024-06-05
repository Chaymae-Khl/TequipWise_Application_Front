import { TestBed } from '@angular/core/testing';

import { EquipementServiceService } from './equipement-service.service';

describe('EquipementServiceService', () => {
  let service: EquipementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
