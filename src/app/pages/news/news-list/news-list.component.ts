import { Component, Input, OnInit } from '@angular/core';
import { News } from '../../../shared/interfaces/news';
import { NewsModalService } from '../../../components/news-modal/news-modal.service';
import { ModalContentComponent } from '../../../components/modal-content/modal-content.component';
import { ModalConfig } from '../../../components/news-modal/modal-config';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  @Input() public news: News[];

  constructor(public modal: NewsModalService, public config: ModalConfig) {}

  public ngOnInit(): void {
  }

  public onItemClick(event: Event, paper: News): void {
    const targetItem: HTMLDivElement = event.target as HTMLDivElement;
    const article: string = targetItem.getAttribute('article');
    this.modal.open(ModalContentComponent, {data: paper});
  }

}
