import { TestBed } from '@angular/core/testing';

import { TricksService } from './tricks.service';

describe('TricksService', () => {
  let service: TricksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TricksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
