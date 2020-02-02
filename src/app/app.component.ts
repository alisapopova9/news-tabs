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

  constructor(private route: ActivatedRoute, private newsService: NewsService) {
  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (this.route.snapshot.firstChild !== null) {
        console.log(params);
        console.log(this.route.snapshot);
      }
    });
  }

}
