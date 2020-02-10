import { Component, OnInit } from '@angular/core';
import { ModalConfig } from '../../shared/components/modal/modal-config';
import { ModalRef } from '../../shared/components/modal/modal/modal-ref';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.scss']
})
export class NewsModalComponent implements OnInit {

  constructor(public config: ModalConfig, public modal: ModalRef) { }

  public ngOnInit(): void { }

  public onClose(): void {
    this.modal.close();
  }

}
