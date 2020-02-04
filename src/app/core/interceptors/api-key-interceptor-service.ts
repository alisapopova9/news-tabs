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
        {params: req.params.append('apiKey', '96849ef6f35147979d7bd8a9779be526')});
    }
    return next.handle(req);
  }
}
