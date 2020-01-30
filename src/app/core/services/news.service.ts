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

  public getAllTopNews(): Observable<object> {
    return this.http.get<NewsSearchResult>('https://newsapi.org/v2/top-headlines?country=ru');
  }

  public getAllNews(): Observable<object> {
    return this.http.get<NewsSearchResult>('https://newsapi.org/v2/everything?q=russia');
  }
}
