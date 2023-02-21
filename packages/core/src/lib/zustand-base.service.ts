import { Observable } from 'rxjs';
import { createStore, StateCreator, StoreApi } from 'zustand/vanilla';
export { StateCreator } from 'zustand/vanilla';
import { useStore } from './use-store';

export abstract class ZustandBaseService<T> {
  private store: StoreApi<T>;

  constructor() {
    this.store = createStore(this.initStore() as StateCreator<T>);
  }

  abstract initStore(): unknown;

  getState() {
    return this.store.getState();
  }

  setState(payload: Partial<T>) {
    this.store.setState(payload);
  }

  useStore(): Observable<T>;

  useStore<S>(selector: Parameters<typeof useStore<T, S>>[1]): Observable<S>;

  useStore<S>(selector?: Parameters<typeof useStore<T, S>>[1]) {
    return selector ? useStore(this.store, selector) : useStore(this.store);
  }
}
