import { Component, OnInit } from '@angular/core';

import { NewsService } from '../../../core/services/news.service';
import { News } from '../../../shared/interfaces/news';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.scss']
})
export class TopNewsComponent implements OnInit {
  public news: News[] = [];
  public displayCnt: string = '20';
  public page: number = 1;
  public isMoreItems: boolean;

  private _articlesCnt: number = null;

  constructor(private newsService: NewsService) { }

  public ngOnInit(): void {
    this.getTopNews();
  }

  public onDisplayCntChange(displayCntValue: string): void {
    this.displayCnt = displayCntValue;
    this.news = [];
    this.getTopNews(displayCntValue);
  }

  public onShowMoreClick(): void {
    this.page++;
    this._articlesCnt -= Number.parseInt(this.displayCnt, 10);
    this.getTopNews(this.displayCnt, this.page);
  }

  private getTopNews(pageSize?: string, pageNum?: number): void {
    this.newsService.getAllTopNews(pageSize, pageNum).subscribe((data: any) => {
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
