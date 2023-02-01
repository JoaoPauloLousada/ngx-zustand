import { BehaviorSubject, Observable } from 'rxjs';
import {
  createStore,
  StateCreator as _StateCreator,
  StoreApi,
} from 'zustand/vanilla';

export type StateCreator<T> = _StateCreator<T>;

export abstract class ZustandBaseService<T> {
  private store: StoreApi<T>;
  private storeSubject: BehaviorSubject<T>;
  store$: Observable<T>;

  constructor() {
    this.store = this.createStore();
    this.storeSubject = new BehaviorSubject<T>(this.store.getState());
    this.store$ = this.storeSubject.asObservable();
    this.store.subscribe((s) => this.storeSubject.next(s));
  }

  abstract initStore(): StateCreator<T>;

  createStore() {
    return createStore(this.initStore());
  }

  getState() {
    return this.store.getState();
  }

  setState(payload: Partial<T>) {
    this.store.setState(payload);
  }
}
