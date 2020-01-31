import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  Type,
  ViewChild, ViewContainerRef
} from '@angular/core';
import { InsertionDirective } from '../insertion.directive';
import { Observable, Subject } from 'rxjs';
import { ModalRef } from './modal-ref';
import { BodyScrollingService } from '../../../core/services/body-scrolling.service';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.scss']
})
export class NewsModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(InsertionDirective, {static: false}) public insertionPoint: InsertionDirective;

  public componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  private readonly _onClose: Subject<any> = new Subject<any>();
  public onClose: Observable<any> = this._onClose.asObservable();

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private cd: ChangeDetectorRef,
              private modalRef: ModalRef,
              private bodyScrollingService: BodyScrollingService) { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  public ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  public onOverlayClicked(evt: MouseEvent): void {
    this.modalRef.close();
    this.bodyScrollingService.enable();
  }

  public onDialogClicked(evt: MouseEvent): void {
    evt.stopPropagation();
  }

  public loadChildComponent(componentType: Type<any>): void {
    const componentFactory: ComponentFactory<any> = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const viewContainerRef: ViewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

}
