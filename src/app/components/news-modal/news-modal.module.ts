import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsModalComponent } from './news-modal/news-modal.component';
import { InsertionDirective } from './insertion.directive';

@NgModule({
  declarations: [NewsModalComponent, InsertionDirective],
  imports: [CommonModule],
  entryComponents: [NewsModalComponent]
})
export class NewsModalModule { }
