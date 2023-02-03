import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterService } from '../counter.service';

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
