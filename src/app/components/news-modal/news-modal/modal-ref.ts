import { Observable, Subject } from 'rxjs';

export class ModalRef {
  private readonly _afterClosed: Subject<any> = new Subject<any>();
  public afterClosed: Observable<any> = this._afterClosed.asObservable();

  constructor() {}

  public close(result?: any): void {
    this._afterClosed.next(result);
  }
}
