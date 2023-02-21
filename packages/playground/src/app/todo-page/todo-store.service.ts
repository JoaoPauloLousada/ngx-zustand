import { TodoHttp } from './todo.http.service';
import { inject, Injectable } from '@angular/core';
import { devtools, createJSONStorage, persist } from 'zustand/middleware';
import { ZustandBaseService } from 'ngx-zustand';
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
interface TodoState {
  todos: Todo[];
  load: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class TodoStore extends ZustandBaseService<TodoState> {
  private http = inject(TodoHttp);

  initStore() {
    return persist(
      devtools<TodoState>((set) => ({
        todos: [],
        load: () => {
          this.http
            .get<Todo[]>()
            .subscribe((todos) => set({ todos }, false, 'todos/load'));
        },
      })),
      { name: 'TODO_STORE', storage: createJSONStorage(() => sessionStorage) }
    );
  }
}
