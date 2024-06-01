import { TestBed } from '@angular/core/testing';

import { Serv2Service } from './serv2.service';

describe('Serv2Service', () => {
  let service: Serv2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Serv2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
