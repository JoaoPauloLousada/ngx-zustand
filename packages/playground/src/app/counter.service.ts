import { Injectable } from '@angular/core';
import { ZustandBaseService } from 'ngx-zustand';

const logMiddleware = (config: any) => (set: any, get: any, api: any) =>
  config(
    (...args: any[]) => {
      console.log('  applying', args);
      set(...args);
      console.log('  new state', get());
    },
    get,
    api
  );
interface CounterState {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class CounterService extends ZustandBaseService<CounterState> {
  initStore() {
    return logMiddleware(
      (
        set: (arg0: {
          (state: any): { counter: any };
          (state: any): { counter: number };
        }) => any
      ) => ({
        counter: 0,
        increment: () => set((state) => ({ counter: state.counter + 1 })),
        decrement: () => set((state) => ({ counter: state.counter - 1 })),
      })
    );
  }
}
