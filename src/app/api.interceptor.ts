import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './shared/services/loader.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.isLoading.next(true); // Show spinner

    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.isLoading.next(false); // Hide spinner
      })
    );
  }
}
