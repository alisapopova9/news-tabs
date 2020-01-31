import { Component, OnInit } from '@angular/core';

import { NewsService } from '../../../core/services/news.service';
import { News } from '../../../shared/interfaces/news';
import { NewsSearchResult } from '../../../shared/interfaces/news-search-result';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.scss']
})
export class TopNewsComponent implements OnInit {
  public news: News[] = [];

  constructor(private newsService: NewsService) { }

  public ngOnInit(): void {
    this.getTopNews();
  }

  private getTopNews(): void {
    this.newsService.getAllTopNews().subscribe((data: any) => {
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
