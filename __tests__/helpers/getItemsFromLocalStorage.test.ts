import type { Item } from "@/types/app";

import { getItemsFromLocalStorage } from "@/helpers/getItemsFromLocalStorage";

describe("getItemsFromLocalStorage", () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("when localStorage has items", () => {
    it("should return the parsed items array", () => {
      const items: Item[] = [
        { id: "1", text: "Buy milk" },
        { id: "2", text: "Buy eggs" },
      ];
      localStorage.setItem("items", JSON.stringify(items));
      const result = getItemsFromLocalStorage();
      expect(result).toEqual(items);
    });

    it("should return a single-item array", () => {
      const items: Item[] = [{ id: "1", text: "Buy milk" }];
      localStorage.setItem("items", JSON.stringify(items));
      const result = getItemsFromLocalStorage();
      expect(result).toEqual(items);
    });
  });

  describe("when localStorage is empty", () => {
    it("should return an empty array", () => {
      const result = getItemsFromLocalStorage();
      expect(result).toEqual([]);
    });
  });
});
