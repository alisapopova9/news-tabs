import { Component, OnInit } from '@angular/core';
import { ModalConfig } from '../news-modal/modal-config';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {

  constructor(public config: ModalConfig) { }

  public ngOnInit(): void {
  }

}
