import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../../shared/interfaces/news';
import { NewsSearchResult } from '../../shared/interfaces/news-search-result';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private static getQueryString(queryParams: object): string {
    let queryString: string = '';
    for (const param in queryParams) {
      if (queryParams.hasOwnProperty(param)) {
        queryString += `&${param}=${queryParams[param]}`;
      }
    }
    return queryString;
  }

  constructor(private http: HttpClient) { }

  public getAllTopNews(queryParams?: object): Observable<NewsSearchResult> {
    const queryString: string = 'country=us' + NewsService.getQueryString(queryParams);
    return this.http.get<NewsSearchResult>(`https://newsapi.org/v2/top-headlines?${queryString}`);
  }

  public getAllNews(queryParams?: object): Observable<object> {
    const queryString: string = 'language=en' + NewsService.getQueryString(queryParams);
    return this.http.get<NewsSearchResult>(`https://newsapi.org/v2/everything?${queryString}`);
  }

  public toNews(data: Params): News[] {
    const news: News[] = [];
    data.forEach((article: any) => {
      const newsData: News = {
        title: article.title,
        source: article.source.name,
        description: article.description,
        urlToImage: article.urlToImage
      };
      news.push(newsData);
    });
    return news;
  }
}
