import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoStore } from './todo-store.service';

@Component({
  selector: 'app-todo-page',
  template: `
    <button (click)="loadTodos()">load todos</button>
    <ul>
      <li *ngFor="let todo of todos$ | async">
        <p>title: {{ todo.title }};</p>
        <p>complete: {{ todo.completed }}</p>
        <hr />
      </li>
    </ul>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent {
  private todoStore = inject(TodoStore);

  todos$ = this.todoStore.useStore((state) => state.todos);
  loadTodos = this.todoStore.getState().load;
}
