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

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.scss']
})
export class NewsModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(InsertionDirective, {static: false}) public insertionPoint: InsertionDirective;
  private readonly _onClose: Subject<any> = new Subject<any>();

  public componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  public onClose: Observable<any> = this._onClose.asObservable();

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private cd: ChangeDetectorRef) { }

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
    // close the dialog
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
