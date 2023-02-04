import { Injectable } from '@angular/core';
import { StateCreator, ZustandBaseService } from 'ngx-zustand';

interface TodoState {
  foo: string;
  bar: string;
  setFoo: (text: string) => void;
  setBar: (text: string) => void;
}

@Injectable({
  providedIn: 'root',
})
export class TodoStore extends ZustandBaseService<TodoState> {
  initStore(): StateCreator<TodoState, [], [], TodoState> {
    return (set) => ({
      foo: 'foo',
      bar: 'bar',
      setFoo: (text) => set({ foo: text }),
      setBar: (text) => set({ bar: text }),
    });
  }
}
