import { TestBed } from '@angular/core/testing';

import { PreCalculService } from './pre-calcul.service';

describe('PreCalculService', () => {
  let service: PreCalculService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreCalculService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
