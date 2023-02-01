import { Injectable } from '@angular/core';
import { StateCreator, ZustandBaseService } from 'ngx-zustand';

type ExampleState = {
  foo: string;
  bar: string;
  setFoo: (value: string) => void;
};
@Injectable({
  providedIn: 'root',
})
export class ExampleService extends ZustandBaseService<ExampleState> {
  initStore(): StateCreator<ExampleState> {
    return (set) => ({
      foo: 'foo',
      bar: 'bar',
      setFoo: (value: string) => set({ foo: value }),
    });
  }
}
