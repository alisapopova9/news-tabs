import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsService } from './news.service';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _newsService: NewsService) { }

  public setQueryParams(page: number, pageSize: string, q: string): void {
    this._router.navigate([],
      {
        relativeTo: this._route,
        queryParams: {
          page: page,
          pageSize: pageSize,
          q: q
        },
        queryParamsHandling: 'merge'
      });
  }

  public setPageQueryParam(page: number): void {
    this._router.navigate([],
      {
        queryParams: {
          page: page
        },
        queryParamsHandling: 'merge'
      });
  }

  public setPageSizeQueryParam(pageSize: string): void {
    this._router.navigate([],
      {
        queryParams: {
          pageSize: pageSize
        },
        queryParamsHandling: 'merge'
      });
  }

  public setQQueryParam(q: string): void {
    this._router.navigate([],
      {
        queryParams: {
          q: q
        },
        queryParamsHandling: 'merge'
      });
  }
}
