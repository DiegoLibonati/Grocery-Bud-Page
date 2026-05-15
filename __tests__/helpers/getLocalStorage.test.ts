import { getLocalStorage } from "@/helpers/getLocalStorage";

describe("getLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("when key exists", () => {
    it("should return the parsed value", () => {
      localStorage.setItem("test-key", JSON.stringify({ foo: "bar" }));
      const result = getLocalStorage("test-key");
      expect(result).toEqual({ foo: "bar" });
    });

    it("should return a parsed array", () => {
      const items = [{ id: "1", text: "Buy milk" }];
      localStorage.setItem("items", JSON.stringify(items));
      const result = getLocalStorage("items");
      expect(result).toEqual(items);
    });

    it("should return a parsed primitive", () => {
      localStorage.setItem("count", JSON.stringify(42));
      const result = getLocalStorage("count");
      expect(result).toBe(42);
    });
  });

  describe("when key does not exist", () => {
    it("should return null", () => {
      const result = getLocalStorage("nonexistent");
      expect(result).toBeNull();
    });
  });

  describe("when stored value is invalid JSON", () => {
    it("should return null", () => {
      localStorage.setItem("bad-key", "not valid json {{{");
      const result = getLocalStorage("bad-key");
      expect(result).toBeNull();
    });
  });
});
