import { TestBed } from '@angular/core/testing';

import { ApifetcherService } from './apifetcher.service';

describe('ApifetcherService', () => {
  let service: ApifetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApifetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
