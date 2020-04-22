import { TestBed } from '@angular/core/testing';

import { TricksProgressService } from './tricks-progress.service';

describe('TricksProgressService', () => {
  let service: TricksProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TricksProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
