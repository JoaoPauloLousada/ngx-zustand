# NgxZustand

The [Zustand](https://github.com/pmndrs/zustand) adapter for angular.

## Installation

with npm:

```sh
npm install ngx-zustand zustand
```

with yarn:

```sh
yarn add ngx-zustand zustand
```

## First create a store

Create a service that extends ZustandBaseService.

```ts
interface CounterState {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class CounterService extends ZustandBaseService<CounterState> {
  initStore(): StateCreator<CounterState> {
    return (set) => ({
      counter: 0,
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      decrement: () => set((state) => ({ counter: state.counter - 1 })),
    });
  }
}
```

## Use the service in your components

```ts
@Component({
  selector: 'app-counter-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="store$ | async as store">
      <div>
        count: {{ store.counter }}
        <div>
          <div><button (click)="store.increment()">+</button></div>
          <div><button (click)="store.decrement()">-</button></div>
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterPageComponent {
  private counterService = inject(CounterService);
  store$ = this.counterService.useStore();
}
```

## Redux devtools middleware

You can override **_createStore_** function in order to include the middlewares you need.

```ts
import { createStore } from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';

interface CounterState {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class CounterService extends ZustandBaseService<CounterState> {
  initStore(): StateCreator<CounterState> {
    return (set) => ({
      counter: 0,
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      decrement: () => set((state) => ({ counter: state.counter - 1 })),
    });
  }

  override createStore() {
    return createStore(devtools(this.initStore()));
  }
}
```

## Persist middleware

```ts
import { createJSONStorage, persist } from 'zustand/middleware';

interface CounterState {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class CounterService extends ZustandBaseService<CounterState> {
  initStore(): StateCreator<CounterState> {
    return (set) => ({
      counter: 0,
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      decrement: () => set((state) => ({ counter: state.counter - 1 })),
    });
  }

  override createStore() {
    return createStore(
      persist(this.initStore(), {
        name: 'counterStore',
        storage: createJSONStorage(() => sessionStorage),
      })
    );
  }
}
```
