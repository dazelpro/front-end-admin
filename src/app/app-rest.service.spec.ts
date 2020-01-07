import { TestBed } from '@angular/core/testing';

import { AppRestService } from './app-rest.service';

describe('AppRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppRestService = TestBed.get(AppRestService);
    expect(service).toBeTruthy();
  });
});
