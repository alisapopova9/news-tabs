import { Component, Input, OnInit } from '@angular/core';
import { News } from '../../../shared/interfaces/news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  @Input() public news: News[];

  constructor() { }

  public ngOnInit(): void {
  }

}
