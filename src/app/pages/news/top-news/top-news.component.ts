import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../core/services/news.service';
import { News } from '../../../shared/interfaces/news';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UrlService } from '../../../core/services/url.service';
import { NewsSearchResult } from '../../../shared/interfaces/news-search-result';

const pageSizeDefault: string = '10';
const pageDefault: number = 1;

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.scss']
})
export class TopNewsComponent implements OnInit {
  public news: News[] = [];
  public pageSize: string = '';
  public value: string = '';
  public page: number;
  public isMoreItems: boolean;

  private _articlesCnt: number = null;
  private _wasRefreshed: boolean = true;

  constructor(private newsService: NewsService,
              private _urlService: UrlService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  public ngOnInit(): void {
    this._route.queryParams
      .subscribe((params: Params) => {
        if (params.pageSize && params.page) {
          if (params.pageSize !== this.pageSize || params.page !== this.page) {
            this.pageSize = params.pageSize;
            this.page = params.page;
            if (this._wasRefreshed) {
              let pageCnt: number = 1;
              while (pageCnt <= params.page) {
                this.getTopNews(params.pageSize, pageCnt, params.q);
                pageCnt++;
              }
              this._wasRefreshed = false;
            } else {
              this.getTopNews(params.pageSize, params.page, params.q);
            }
          }
        } else {
          this._urlService.setQueryParams(pageDefault, pageSizeDefault, this.value);
        }
      });
  }

  public onPageSizeChange(pageSize: string): void {
    this.pageSize = pageSize;
    this._articlesCnt = null;
    this.news = [];
    this.page = 1;
    this._urlService.setQueryParams(this.page, this.pageSize, this.value);
  }

  public onShowMoreClick(): void {
    this.page++;
    this._urlService.setPageQueryParam(this.page);
  }

  public onValueInput(value: string): void {
    this.page = 1;
    this._articlesCnt = null;
    this.news = [];
    this.value = value;
    this._urlService.setQueryParams(this.page, this.pageSize, this.value);
  }

  private getTopNews(pageSize: string, pageNum: number, searchString: string): void {
    const queryParams: Params = searchString === undefined ? {pageSize: pageSize, page: pageNum} : {pageSize: pageSize, page: pageNum, q: searchString};
    this.newsService.getAllTopNews(queryParams)
      .subscribe((data: NewsSearchResult) => {
        if (this._articlesCnt === null) {
          this._articlesCnt = data.totalResults;
        }
        this._articlesCnt -= Number.parseInt(this.pageSize, 10);
        this.isMoreItems = (this._articlesCnt > 0);
        data.articles.forEach((article: any) => {
          const newsData: News = {
            title: article.title,
            source: article.source.name,
            description: article.description,
            urlToImage: article.urlToImage
          };
          this.news.push(newsData);
        });
    });
  }
}
