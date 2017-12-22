import { TestBed, inject } from '@angular/core/testing';

import { GetChartService } from './get-chart.service';

describe('GetChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetChartService]
    });
  });

  it('should be created', inject([GetChartService], (service: GetChartService) => {
    expect(service).toBeTruthy();
  }));
});
