import { TestBed } from '@angular/core/testing';

import { PagSeguroServiceService } from './pag-seguro-service.service';

describe('PagSeguroServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagSeguroServiceService = TestBed.get(PagSeguroServiceService);
    expect(service).toBeTruthy();
  });
});
