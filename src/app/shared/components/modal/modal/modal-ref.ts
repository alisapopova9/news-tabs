import { Observable, Subject } from 'rxjs';

export class ModalRef {
  public afterClosed: Observable<any>;
  private readonly _afterClosed: Subject<any> = new Subject<any>();

  constructor() {
    this.afterClosed = this._afterClosed.asObservable();
  }

  public close(result?: any): void {
    this._afterClosed.next(result);
  }
}
