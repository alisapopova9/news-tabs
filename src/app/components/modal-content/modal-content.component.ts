import { Component, OnInit } from '@angular/core';
import { ModalConfig } from '../news-modal/modal-config';
import { ModalRef } from '../news-modal/news-modal/modal-ref';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {

  constructor(public config: ModalConfig, public modal: ModalRef) { }

  public ngOnInit(): void {
  }

  public onClose(): void {
    this.modal.close();
  }

}
