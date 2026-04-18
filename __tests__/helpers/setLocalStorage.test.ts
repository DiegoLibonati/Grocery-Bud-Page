import { setLocalStorage } from "@/helpers/setLocalStorage";

describe("setLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should call localStorage.setItem with stringified value", () => {
    const value = { foo: "bar" };
    setLocalStorage("test-key", value);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "test-key",
      JSON.stringify(value)
    );
  });

  it("should persist an array value", () => {
    const items = [{ id: "1", text: "Buy milk" }];
    setLocalStorage("items", items);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "items",
      JSON.stringify(items)
    );
  });

  it("should persist a primitive value", () => {
    setLocalStorage("count", 42);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "count",
      JSON.stringify(42)
    );
  });

  it("should persist a null value", () => {
    setLocalStorage("key", null);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "key",
      JSON.stringify(null)
    );
  });
});
