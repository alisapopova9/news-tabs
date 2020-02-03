import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsService } from './news.service';
import { Observable } from 'rxjs';
import { NewsSearchResult } from '../../shared/interfaces/news-search-result';
import { News } from '../../shared/interfaces/news';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _newsService: NewsService) { }

  public getAllNewsByClientUrl(): void {
    // this._route.queryParams.subscribe(params => {
    //   this._newsService.getAllNews(params);
    // });
    console.log(this._router.routerState.snapshot.url);
  }

  public setQueryParams(page: number, pageSize: string, q: string): void {
    this._router.navigate([],
      {
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
