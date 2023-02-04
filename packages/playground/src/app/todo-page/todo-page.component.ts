import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoStore } from './todo-store.service';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [CommonModule],
  template: ` <div *ngIf="foo$ | async as foo">foo: {{ foo }}</div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent {
  private todoStore = inject(TodoStore);
  foo$ = this.todoStore.useStore((state) => state.foo);
}
