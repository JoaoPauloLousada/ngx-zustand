import { StateCreator, ZustandBaseService } from './zustand-base.service';

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

describe('ZustandBaseService', () => {
  let mockStore: MockStateStore;

  beforeEach(() => (mockStore = new MockStateStore()));

  it('should provide store property', () => {
    expect(mockStore).toHaveProperty('store');
  });

  it('should provide getState function', () => {
    expect(mockStore).toHaveProperty('getState');
    const state = mockStore.getState();
    expect(state).toHaveProperty('foo');
    expect(state).toHaveProperty('setFoo');
  });

  it('should provide setState function', () => {
    expect(mockStore).toHaveProperty('setState');
    const expected = 'updated value';
    mockStore.setState({ foo: expected });
    expect(mockStore.getState().foo).toEqual(expected);
  });

  it('should provide useStore function', () => {
    expect(mockStore).toHaveProperty('useStore');
  });
});
