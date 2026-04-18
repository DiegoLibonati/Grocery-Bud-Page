import { Store } from "@/core/store";

interface TestState extends Record<string, unknown> {
  count: number;
  name: string;
}

class TestStore extends Store<TestState> {}

describe("Store", () => {
  let store: TestStore;

  beforeEach(() => {
    store = new TestStore({ count: 0, name: "test" });
  });

  describe("getState", () => {
    it("should return the initial state", () => {
      expect(store.getState()).toEqual({ count: 0, name: "test" });
    });

    it("should return updated state after setState", () => {
      store.setState({ count: 5 });
      expect(store.getState()).toEqual({ count: 5, name: "test" });
    });
  });

  describe("get", () => {
    it("should return the value for a given key", () => {
      expect(store.get("count")).toBe(0);
      expect(store.get("name")).toBe("test");
    });

    it("should return updated value after setState", () => {
      store.setState({ count: 99 });
      expect(store.get("count")).toBe(99);
    });
  });

  describe("setState", () => {
    it("should update only the provided keys", () => {
      store.setState({ count: 10 });
      expect(store.getState()).toEqual({ count: 10, name: "test" });
    });

    it("should notify listener when value changes", () => {
      const mockListener = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 7 });
      expect(mockListener).toHaveBeenCalledWith(7);
    });

    it("should not notify listener when value is unchanged", () => {
      const mockListener = jest.fn();
      store.subscribe("count", mockListener);
      store.setState({ count: 0 });
      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should only notify listeners for changed keys", () => {
      const mockCountListener = jest.fn();
      const mockNameListener = jest.fn();
      store.subscribe("count", mockCountListener);
      store.subscribe("name", mockNameListener);

      store.setState({ count: 3 });

      expect(mockCountListener).toHaveBeenCalledWith(3);
      expect(mockNameListener).not.toHaveBeenCalled();
    });

    it("should notify all listeners subscribed to the same key", () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      store.subscribe("count", mockListener1);
      store.subscribe("count", mockListener2);

      store.setState({ count: 5 });

      expect(mockListener1).toHaveBeenCalledWith(5);
      expect(mockListener2).toHaveBeenCalledWith(5);
    });
  });

  describe("subscribe", () => {
    it("should call listener on each subsequent change", () => {
      const mockListener = jest.fn();
      store.subscribe("count", mockListener);

      store.setState({ count: 1 });
      store.setState({ count: 2 });

      expect(mockListener).toHaveBeenCalledTimes(2);
      expect(mockListener).toHaveBeenNthCalledWith(1, 1);
      expect(mockListener).toHaveBeenNthCalledWith(2, 2);
    });

    it("should return an unsubscribe function", () => {
      const mockListener = jest.fn();
      const unsubscribe = store.subscribe("count", mockListener);

      unsubscribe();
      store.setState({ count: 5 });

      expect(mockListener).not.toHaveBeenCalled();
    });

    it("should only remove the unsubscribed listener", () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const unsubscribe1 = store.subscribe("count", mockListener1);
      store.subscribe("count", mockListener2);

      unsubscribe1();
      store.setState({ count: 5 });

      expect(mockListener1).not.toHaveBeenCalled();
      expect(mockListener2).toHaveBeenCalledWith(5);
    });
  });
});
