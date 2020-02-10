import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { InsertionDirective } from './insertion.directive';

@NgModule({
  declarations: [ModalComponent, InsertionDirective],
  imports: [CommonModule],
  entryComponents: [ModalComponent]
})
export class ModalModule { }
