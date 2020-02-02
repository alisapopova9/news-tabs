import { Component, OnInit } from '@angular/core';
import { News } from '../../../shared/interfaces/news';
import { NewsService } from '../../../core/services/news.service';

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

  constructor(private newsService: NewsService) {
  }

  public ngOnInit(): void {
    this.getAllNews();
  }

  public onDisplayCntChange(displayCntValue: string): void {
    this.displayCnt = displayCntValue;
    this.news = [];
    this.getAllNews(displayCntValue, this.page);
  }

  public onShowMoreClick(): void {
    this.page++;
    this._articlesCnt -= Number.parseInt(this.displayCnt, 10);
    this.getAllNews(this.displayCnt, this.page);
  }

  public onValueInput(value: string): void {
    this.page = 1;
    this._articlesCnt = null;
    this.news = [];
    this.value = value;
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
