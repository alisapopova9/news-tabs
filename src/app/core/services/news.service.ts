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

  constructor(private http: HttpClient) { }

  public getAllTopNews(queryParams?: object): Observable<NewsSearchResult> {
    let queryString: string = 'country=us';
    for (const param in queryParams) {
      if (queryParams.hasOwnProperty(param)) {
        queryString += `&${param}=${queryParams[param]}`;
      }
    }
    return this.http.get<NewsSearchResult>(`https://newsapi.org/v2/top-headlines?${queryString}`);
  }

  public getAllNews(queryParams?: object): Observable<object> {
    // let queryString: string = 'q=';
    let queryString: string = 'language=en';
    for (const param in queryParams) {
      if (queryParams.hasOwnProperty(param)) {
        queryString += `&${param}=${queryParams[param]}`;
      }
    }
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
