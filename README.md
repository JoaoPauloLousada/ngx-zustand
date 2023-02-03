# NgxZustand

The Zustand adapter for angular.

## Installation

with npm:

```sh
npm install ngx-zustand
```

with yarn:

```sh
yarn add ngx-zustand
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
  store$ = this.counterService.store$;
}
```
