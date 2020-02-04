import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from './core/services/news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'news-tabs';

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _newsService: NewsService) { }

  public ngOnInit(): void { }
}
