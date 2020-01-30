import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../../shared/interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  public getAllTopNews(): Observable<object> {
    return this.http.get('https://newsapi.org/v2/top-headlines?country=us');
  }
}
