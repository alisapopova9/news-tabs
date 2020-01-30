import { Component, Input, OnInit } from '@angular/core';
import { News } from '../../../shared/interfaces/news';
import { NewsModalService } from '../../../components/news-modal/news-modal.service';
import { ModalContentComponent } from '../../../components/modal-content/modal-content.component';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  @Input() public news: News[];

  constructor(public modal: NewsModalService) {}

  public ngOnInit(): void {
  }

  public onItemClick(): void {
    this.modal.open(ModalContentComponent);
  }

}
