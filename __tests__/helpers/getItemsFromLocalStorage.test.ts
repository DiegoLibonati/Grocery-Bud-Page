import type { Item } from "@/types/app";

import { getItemsFromLocalStorage } from "@/helpers/getItemsFromLocalStorage";

import { mocksLocalStorage } from "@tests/__mocks__/localStorage.mock";

describe("getItemsFromLocalStorage", () => {
  beforeEach(() => {
    mocksLocalStorage.clear();
  });

  afterEach(() => {
    mocksLocalStorage.clear();
  });

  it("should return items from localStorage", () => {
    const mockItems: Item[] = [
      { id: "1", text: "Buy milk" },
      { id: "2", text: "Buy eggs" },
    ];

    mocksLocalStorage.setItem("items", JSON.stringify(mockItems));

    const result = getItemsFromLocalStorage();

    expect(result).toEqual(mockItems);
  });

  it("should return empty array when no items in localStorage", () => {
    const result = getItemsFromLocalStorage();

    expect(result).toEqual([]);
  });

  it("should return empty array when localStorage has null", () => {
    mocksLocalStorage.setItem("items", "null");

    const result = getItemsFromLocalStorage();

    expect(result).toEqual([]);
  });
});
