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
  initStore() {
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

## Recipes

### Fetching Everything

```ts
store$ = this.store.useStore();
```

### Selecting multiple state slices

```ts
foo$ = this.store.useStore((state) => state.foo);
bar$ = this.store.useStore((state) => state.bar);
fooAndBar$ = this.store.useStore((state) => ({
  foo: state.foo,
  bar: state.bar,
}));
```

### Async actions

Just call set when you're ready, zustand doesn't care if your actions are async or not.

```ts
export class TodosStore extends ZustandBaseService<TodosState> {
  initStore() {
    return (set) => ({
      todos: [],
      loadTodos: () => {
        this.http.get<Todo[]>().subscribe((todos) => set({ todos }));
      },
    });
  }
}
```

### Read from state in actions

set allows fn-updates set(state => result), but you still have access to state outside of it through get.

```ts
export class TodosStore extends ZustandBaseService<TodosState> {
  initStore() {
    return (set, get) => ({
      todos: [],
      action: () => {
        const todos = get().todos;
      },
    });
  }
}
```

## Redux devtools middleware

You can override **_createStore_** function in order to include the middlewares you need.

```ts
import { devtools } from 'zustand/middleware';

@Injectable({
  providedIn: 'root',
})
export class CounterService extends ZustandBaseService<CounterState> {
  initStore() {
    return devtools<CounterState>((set) => ({
      counter: 0,
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      decrement: () => set((state) => ({ counter: state.counter - 1 })),
    }));
  }
}
```

## Persist middleware

```ts
import { createJSONStorage, persist } from 'zustand/middleware';

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
      persist<CounterState>(this.initStore(), {
        name: 'counterStore',
        storage: createJSONStorage(() => sessionStorage),
      })
    );
  }
}
```

## Middleware

You can functionally compose your store any way you like. Please check [typescript guide](https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md) to a better explanation of how to type middlewares.

```ts
// Log every time state is changed
const logMiddleware = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('  applying', args);
      set(...args);
      console.log('  new state', get());
    },
    get,
    api
  );

export class CounterService extends ZustandBaseService<CounterState> {
  initStore() {
    return logMiddleware((set) => ({
      counter: 0,
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      decrement: () => set((state) => ({ counter: state.counter - 1 })),
    }));
  }
}
```
