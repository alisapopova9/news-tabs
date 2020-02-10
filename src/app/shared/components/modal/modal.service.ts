import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector, Type
} from '@angular/core';
import { ModalModule } from './modal.module';
import { ModalComponent } from './modal/modal.component';
import { ModalInjector } from './modal-injector';
import { ModalConfig } from './modal-config';
import { ModalRef } from './modal/modal-ref';
import { Subscription } from 'rxjs';
import { BodyScrollingService } from '../../../core/services/body-scrolling.service';

@Injectable({
  providedIn: ModalModule
})
export class ModalService {
  private modalComponentRef: ComponentRef<ModalComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              private bodyScrollingService: BodyScrollingService) { }

  public open(componentType: Type<any>, config: ModalConfig): ModalRef {
    const modalRef: ModalRef = this.appendDialogComponentToBody(config);
    this.modalComponentRef.instance.childComponentType = componentType;
    this.bodyScrollingService.disable();

    return modalRef;
  }

  private appendDialogComponentToBody(config: ModalConfig): ModalRef {
    const map = new WeakMap();
    map.set(ModalConfig, config);

    const modalRef: ModalRef = new ModalRef();
    map.set(ModalRef, modalRef);

    const sub: Subscription = modalRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody();
      this.bodyScrollingService.enable();
      sub.unsubscribe();
    });

    const componentFactory: ComponentFactory<ModalComponent> = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef: ComponentRef<ModalComponent> = componentFactory.create(new ModalInjector(this.injector, map));
    this.appRef.attachView(componentRef.hostView);

    const domElem: HTMLElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.modalComponentRef = componentRef;

    this.modalComponentRef.instance.onClose.subscribe(() => this.removeDialogComponentFromBody());

    return modalRef;
  }

  private removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.modalComponentRef.hostView);
    this.modalComponentRef.destroy();
  }
}
