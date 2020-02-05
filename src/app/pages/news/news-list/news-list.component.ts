import { Component, Input, OnInit } from '@angular/core';
import { News } from '../../../shared/interfaces/news';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { NewsModalComponent } from '../../../components/news-modal/news-modal.component';
import { ModalConfig } from '../../../shared/components/modal/modal-config';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  @Input() public news: News[];

  constructor(public modal: ModalService, public config: ModalConfig) {}

  public ngOnInit(): void { }

  public onItemClick(event: Event, paper: News): void {
    this.modal.open(NewsModalComponent, {data: paper});
  }

}
