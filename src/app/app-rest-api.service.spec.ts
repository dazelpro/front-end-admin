import { TestBed } from '@angular/core/testing';

import { AppRestApiService } from './app-rest-api.service';

describe('AppRestApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppRestApiService = TestBed.get(AppRestApiService);
    expect(service).toBeTruthy();
  });
});
