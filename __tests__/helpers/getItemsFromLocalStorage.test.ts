import { getItemsFromLocalStorage } from "@/helpers/getItemsFromLocalStorage";

import { mockLocalStorage } from "@tests/__mocks__/localStorage.mock";
import { mockItems } from "@tests/__mocks__/items.mock";

describe("getItemsFromLocalStorage", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it("should return items from localStorage", () => {
    mockLocalStorage.setItem("items", JSON.stringify(mockItems));

    const result = getItemsFromLocalStorage();

    expect(result).toEqual(mockItems);
  });

  it("should return empty array when no items in localStorage", () => {
    const result = getItemsFromLocalStorage();

    expect(result).toEqual([]);
  });

  it("should return empty array when localStorage has null", () => {
    mockLocalStorage.setItem("items", "null");

    const result = getItemsFromLocalStorage();

    expect(result).toEqual([]);
  });
});
