import { StateCreator, ZustandBaseService } from 'ngx-zustand';
import { TestScheduler } from 'rxjs/testing';

interface MockState {
  foo: string;
  setFoo: (text: string) => void;
}

class MockStateStore extends ZustandBaseService<MockState> {
  initStore(): StateCreator<MockState, [], [], MockState> {
    return (set) => ({
      foo: 'foo',
      setFoo: (text: string) => set({ foo: text }),
    });
  }
}

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toStrictEqual(expected);
});

describe('useStore', () => {
  let mockStore: MockStateStore;

  beforeEach(() => (mockStore = new MockStateStore()));

  it('should return whole store as osbervable', () => {
    testScheduler.run(() => {
      const state$ = mockStore.useStore();
      state$.subscribe((state) => {
        expect('foo' in state).toBe(true);
        expect('setFoo' in state).toBe(true);
      });
    });
  });

  it('should return a slice of the store', () => {
    testScheduler.run(() => {
      const foo$ = mockStore.useStore((state) => state.foo);
      foo$.subscribe((foo) => expect(foo).toEqual('foo')).unsubscribe();
      const setFoo = mockStore.getState().setFoo;
      setFoo('updated value');
      foo$
        .subscribe((foo) => expect(foo).toEqual('updated value'))
        .unsubscribe();
    });
  });

  it('should emit values after state is updated', () => {
    const expectedValues: string[] = [];
    testScheduler.run(() => {
      const foo$ = mockStore.useStore((state) => state.foo);
      const subscription = foo$.subscribe((foo) => expectedValues.push(foo));
      mockStore.setState({ foo: 'first update' });
      mockStore.setState({ foo: 'second update' });
      expect(expectedValues.length).toEqual(3);
      expect(expectedValues).toStrictEqual([
        'foo',
        'first update',
        'second update',
      ]);
      subscription.unsubscribe();
    });
  });

  it('should emit only if value changes', () => {
    const expectedValues: string[] = [];
    testScheduler.run(() => {
      const foo$ = mockStore.useStore((state) => state.foo);
      const subscription = foo$.subscribe((foo) => expectedValues.push(foo));
      mockStore.setState({ foo: 'foo' });
      mockStore.setState({ foo: 'foo' });
      mockStore.setState({ foo: 'bar' });
      expect(expectedValues.length).toEqual(2);
      expect(expectedValues).toStrictEqual(['foo', 'bar']);
      subscription.unsubscribe();
    });
  });
});
