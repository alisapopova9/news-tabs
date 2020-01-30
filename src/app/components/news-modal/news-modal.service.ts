import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector, Type
} from '@angular/core';
import { NewsModalModule } from './news-modal.module';
import { NewsModalComponent } from './news-modal/news-modal.component';
import { NewsModalInjector } from './news-modal-injector';
import { ModalConfig } from './modal-config';

@Injectable({
  providedIn: NewsModalModule
})
export class NewsModalService {
  private dialogComponentRef: ComponentRef<NewsModalComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) { }

  public open(componentType: Type<any>, config: ModalConfig): void {
    this.appendDialogComponentToBody(config);
    this.dialogComponentRef.instance.childComponentType = componentType;
  }

  private appendDialogComponentToBody(config: ModalConfig): void {
    const map = new WeakMap();
    map.set(ModalConfig, config);
    const componentFactory: ComponentFactory<NewsModalComponent> = this.componentFactoryResolver.resolveComponentFactory(NewsModalComponent);
    const componentRef: ComponentRef<NewsModalComponent> = componentFactory.create(new NewsModalInjector(this.injector, map));
    this.appRef.attachView(componentRef.hostView);

    const domElem: HTMLElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRef = componentRef;
  }

  private removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}
