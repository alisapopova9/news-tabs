import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyInterceptorService implements HttpInterceptor {
  public intercept(req: HttpRequest<any>,
                   next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.params.get('apiKey') === null) {
      req = req.clone(
        {params: req.params.append('apiKey', '7204f60dcfdf4d57afedf1cfd95e6848')});
    }
    return next.handle(req);
  }
}
