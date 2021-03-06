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
import { BodyScrollingService } from '../../../../core/services/body-scrolling.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('openAnimationTrigger', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)', opacity: 0 }),
        animate(100)
      ]),
      transition('* => void', [
        animate('1s', style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(InsertionDirective, {static: false}) public insertionPoint: InsertionDirective;

  public componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  public onClose: Observable<any>;
  private readonly _onClose: Subject<any> = new Subject<any>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private cd: ChangeDetectorRef,
              private modalRef: ModalRef,
              private bodyScrollingService: BodyScrollingService) {
    this.onClose = this._onClose.asObservable();
  }

  public ngOnInit(): void { }

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
