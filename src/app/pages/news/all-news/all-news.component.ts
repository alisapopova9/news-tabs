import { Component, OnInit } from '@angular/core';
import { News } from '../../../shared/interfaces/news';
import { NewsService } from '../../../core/services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss']
})
export class AllNewsComponent implements OnInit {
  public news: News[] = [];
  public displayCnt: string = '20';
  public value: string = null;
  public page: number = 1;
  public isMoreItems: boolean;

  private _articlesCnt: number = null;

  constructor(private newsService: NewsService, private _router: Router) {
  }

  public ngOnInit(): void {
    this.getAllNews();
    this._router.navigate([], {
      queryParams: {
        page: this.page,
        pageSize: this.displayCnt
      },
      queryParamsHandling: 'merge'
    });
  }

  public onDisplayCntChange(displayCntValue: string): void {
    this.displayCnt = displayCntValue;
    this.news = [];
    this._router.navigate([], {
      queryParams: {
        pageSize: displayCntValue
      },
      queryParamsHandling: 'merge'
    });
    this.getAllNews(displayCntValue, this.page);
  }

  public onShowMoreClick(): void {
    this.page++;
    this._router.navigate([], {
      queryParams: {
        page: this.page
      },
      queryParamsHandling: 'merge'
    });
    this._articlesCnt -= Number.parseInt(this.displayCnt, 10);
    this.getAllNews(this.displayCnt, this.page);
  }

  public onValueInput(value: string): void {
    this.page = 1;
    this._articlesCnt = null;
    this.news = [];
    this.value = value;
    this._router.navigate([], {
      queryParams: {
        q: value
      },
      queryParamsHandling: 'merge'
    });
    this.getAllNews(this.displayCnt, this.page, this.value);
  }

  private getAllNews(pageSize?: string, pageNum?: number, searchString?: string): void {
    this.newsService.getAllNews(pageSize, pageNum, searchString).subscribe((data: any) => {
      if (this._articlesCnt === null) {
        this._articlesCnt = data.totalResults;
      }
      this.isMoreItems = (this._articlesCnt - Number.parseInt(this.displayCnt, 10)) > 0;
      data.articles.forEach((article: any) => {
        const news: News = {
          title: article.title,
          source: article.source.name,
          description: article.description,
          urlToImage: article.urlToImage
        };
        this.news.push(news);
      });
    });
  }
}
