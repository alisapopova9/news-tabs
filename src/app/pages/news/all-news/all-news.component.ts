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
  public page: number = 1;

  constructor(private newsService: NewsService) {
  }

  public ngOnInit(): void {
    this.getAllNews();
  }

  public onDisplayCntChange(displayCntValue: string): void {
    this.displayCnt = displayCntValue;
    this.news = [];
    this.getAllNews(displayCntValue);
  }

  private getAllNews(pageSize?: string): void {
    this.newsService.getAllNews(pageSize).subscribe((data: any) => {
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
