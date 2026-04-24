import { setLocalStorage } from "@/helpers/setLocalStorage";

describe("setLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("persisting values", () => {
    it("should persist an object value", () => {
      const value = { foo: "bar" };
      setLocalStorage("test-key", value);
      expect(localStorage.getItem("test-key")).toBe(JSON.stringify(value));
    });

    it("should persist an array value", () => {
      const items = [{ id: "1", text: "Buy milk" }];
      setLocalStorage("items", items);
      expect(localStorage.getItem("items")).toBe(JSON.stringify(items));
    });

    it("should persist a primitive value", () => {
      setLocalStorage("count", 42);
      expect(localStorage.getItem("count")).toBe(JSON.stringify(42));
    });

    it("should persist a null value", () => {
      setLocalStorage("key", null);
      expect(localStorage.getItem("key")).toBe(JSON.stringify(null));
    });
  });
});
