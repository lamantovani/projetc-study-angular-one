import { TestBed } from '@angular/core/testing';

import { POSOneServiceService } from './posone-service.service';

describe('POSOneServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: POSOneServiceService = TestBed.get(POSOneServiceService);
    expect(service).toBeTruthy();
  });
});
