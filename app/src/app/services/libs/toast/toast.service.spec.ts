import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { provideToastr } from 'ngx-toastr';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService, provideToastr()],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
