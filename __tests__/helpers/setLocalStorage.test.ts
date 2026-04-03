import { setLocalStorage } from "@/helpers/setLocalStorage";

import { mockLocalStorage } from "@tests/__mocks__/localStorage.mock";

describe("setLocalStorage", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it("should store data in localStorage as JSON", () => {
    const testData = { name: "test", value: 123 };

    setLocalStorage("test-key", testData);

    const stored = mockLocalStorage.getItem("test-key");
    expect(stored).toBe(JSON.stringify(testData));
  });

  it("should store arrays in localStorage", () => {
    const testArray = [1, 2, 3, 4, 5];

    setLocalStorage("test-array", testArray);

    const stored = mockLocalStorage.getItem("test-array");
    expect(stored).toBe(JSON.stringify(testArray));
  });

  it("should store strings in localStorage", () => {
    const testString = "hello world";

    setLocalStorage("test-string", testString);

    const stored = mockLocalStorage.getItem("test-string");
    expect(stored).toBe(JSON.stringify(testString));
  });

  it("should store boolean values in localStorage", () => {
    setLocalStorage("test-bool", true);

    const stored = mockLocalStorage.getItem("test-bool");
    expect(stored).toBe(JSON.stringify(true));
  });

  it("should store number values in localStorage", () => {
    setLocalStorage("test-number", 42);

    const stored = mockLocalStorage.getItem("test-number");
    expect(stored).toBe(JSON.stringify(42));
  });

  it("should overwrite existing data", () => {
    setLocalStorage("test-key", "first");
    setLocalStorage("test-key", "second");

    const stored = mockLocalStorage.getItem("test-key");
    expect(stored).toBe(JSON.stringify("second"));
  });

  it("should store null values", () => {
    setLocalStorage("test-null", null);

    const stored = mockLocalStorage.getItem("test-null");
    expect(stored).toBe(JSON.stringify(null));
  });
});
