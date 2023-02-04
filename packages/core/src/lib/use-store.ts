import { distinctUntilChanged, map, Observable } from 'rxjs';
import type { StoreApi } from 'zustand/vanilla';

export function useStore<T>(store: StoreApi<T>): Observable<T>;

export function useStore<T, S>(
  store: StoreApi<T>,
  selector: (state: T) => S
): Observable<S>;

export function useStore<T, S>(store: StoreApi<T>, selector?: (state: T) => S) {
  const state$ = new Observable<T>((subscriber) => {
    subscriber.next(store.getState());
    const unsubscribe = store.subscribe((state) => subscriber.next(state));
    return () => unsubscribe();
  });

  if (!selector) return state$;

  const slice$ = state$.pipe(
    map((state) => selector(state)),
    distinctUntilChanged((prev, current) => prev === current)
  );

  return slice$;
}
