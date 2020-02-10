import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsSearchResult } from '../../shared/interfaces/news-search-result';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  public getAllTopNews(queryParams?: HttpParams): Observable<NewsSearchResult> {
    queryParams = queryParams.set('country', 'us');
    return this.http.get<NewsSearchResult>(`https://newsapi.org/v2/top-headlines?`, { params: queryParams });
  }

  public getAllNews(queryParams?: HttpParams): Observable<object> {
    queryParams = queryParams.set('language', 'en');
    return this.http.get<NewsSearchResult>(`https://newsapi.org/v2/everything?`, { params: queryParams });
  }

}
