import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../../shared/interfaces/news';
import { NewsSearchResult } from '../../shared/interfaces/news-search-result';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  public getAllTopNews(pageSize?: string, pageNum?: number): Observable<object> {
    let queryParams: string = 'country=ru';
    if (pageSize) {
      queryParams += `&pageSize=${pageSize}`;
    }
    if (pageNum) {
      queryParams += `&page=${pageNum}`;
    }
    return this.http.get<NewsSearchResult>(`https://newsapi.org/v2/top-headlines?${queryParams}`);
  }

  public getAllNews(pageSize?: string, pageNum?: number): Observable<object> {
    let queryParams: string = 'q=russia';
    if (pageSize) {
      queryParams += `&pageSize=${pageSize}`;
    }
    if (pageNum) {
      queryParams += `&page=${pageNum}`;
    }
    return this.http.get<NewsSearchResult>(`https://newsapi.org/v2/everything?${queryParams}`);
  }
}
