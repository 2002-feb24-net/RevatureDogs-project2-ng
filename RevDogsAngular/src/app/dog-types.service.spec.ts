import { TestBed } from '@angular/core/testing';

import { DogTypesService } from './dog-types.service';

describe('DogTypesService', () => {
  let service: DogTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
