import type { Item } from "@/types/app";

import { itemStore } from "@/stores/itemStore";

import { mockItems } from "@tests/__mocks__/items.mock";

describe("itemStore", () => {
  beforeEach(() => {
    localStorage.clear();
    itemStore.setState({ items: [], idItemEdit: "" });
    jest.clearAllMocks();
  });

  describe("initial state", () => {
    it("should have empty items and empty idItemEdit", () => {
      expect(itemStore.getState()).toEqual({ items: [], idItemEdit: "" });
    });
  });

  describe("getItemById", () => {
    it("should return the item with the given id", () => {
      itemStore.setState({ items: mockItems });
      const result = itemStore.getItemById("1");
      expect(result).toEqual(mockItems[0]);
    });

    it("should return undefined when item does not exist", () => {
      const result = itemStore.getItemById("nonexistent");
      expect(result).toBeUndefined();
    });
  });

  describe("setItems", () => {
    it("should update items in state", () => {
      itemStore.setItems(mockItems);
      expect(itemStore.get("items")).toEqual(mockItems);
    });

    it("should call localStorage.clear when items array is empty", () => {
      localStorage.setItem("items", JSON.stringify(mockItems));
      itemStore.setItems([]);
      expect(localStorage.getItem("items")).toBeNull();
    });

    it("should not call localStorage.clear when items array is not empty", () => {
      localStorage.setItem("items", JSON.stringify(mockItems));
      itemStore.setItems(mockItems);
      expect(localStorage.getItem("items")).toBe(JSON.stringify(mockItems));
    });
  });

  describe("addItem", () => {
    it("should append the item to the items array", () => {
      const newItem: Item = { id: "2", text: "Buy bread" };
      itemStore.addItem(newItem);
      expect(itemStore.get("items")).toContainEqual(newItem);
    });

    it("should preserve existing items when adding", () => {
      itemStore.setState({ items: mockItems });
      const newItem: Item = { id: "2", text: "Buy bread" };
      itemStore.addItem(newItem);
      expect(itemStore.get("items")).toEqual([...mockItems, newItem]);
    });

    it("should persist items to localStorage", () => {
      const newItem: Item = { id: "2", text: "Buy bread" };
      itemStore.addItem(newItem);
      expect(localStorage.getItem("items")).toBe(JSON.stringify([newItem]));
    });
  });

  describe("deleteItemById", () => {
    it("should remove the item with the given id", () => {
      itemStore.setState({ items: mockItems });
      itemStore.deleteItemById("1");
      expect(itemStore.get("items")).toEqual([]);
    });

    it("should keep remaining items when deleting one", () => {
      const items: Item[] = [
        { id: "1", text: "Buy milk" },
        { id: "2", text: "Buy bread" },
      ];
      itemStore.setState({ items });
      itemStore.deleteItemById("1");
      expect(itemStore.get("items")).toEqual([{ id: "2", text: "Buy bread" }]);
    });

    it("should persist updated items to localStorage", () => {
      itemStore.setState({ items: mockItems });
      itemStore.deleteItemById("1");
      expect(localStorage.getItem("items")).toBe(JSON.stringify([]));
    });
  });

  describe("setEditingItem", () => {
    it("should set idItemEdit to the given id", () => {
      itemStore.setEditingItem("1");
      expect(itemStore.get("idItemEdit")).toBe("1");
    });

    it("should update idItemEdit when called again", () => {
      itemStore.setEditingItem("1");
      itemStore.setEditingItem("2");
      expect(itemStore.get("idItemEdit")).toBe("2");
    });
  });

  describe("setEditItem", () => {
    it("should update the text of the item being edited", () => {
      itemStore.setState({ items: mockItems, idItemEdit: "1" });
      itemStore.setEditItem("Buy eggs");
      expect(itemStore.get("items")[0]!.text).toBe("Buy eggs");
    });

    it("should not change the id of the edited item", () => {
      itemStore.setState({ items: mockItems, idItemEdit: "1" });
      itemStore.setEditItem("Buy eggs");
      expect(itemStore.get("items")[0]!.id).toBe("1");
    });

    it("should reset idItemEdit to empty string after editing", () => {
      itemStore.setState({ items: mockItems, idItemEdit: "1" });
      itemStore.setEditItem("Buy eggs");
      expect(itemStore.get("idItemEdit")).toBe("");
    });

    it("should persist updated items to localStorage", () => {
      itemStore.setState({ items: mockItems, idItemEdit: "1" });
      itemStore.setEditItem("Buy eggs");
      expect(localStorage.getItem("items")).toBe(
        JSON.stringify([{ id: "1", text: "Buy eggs" }])
      );
    });

    it("should only modify the item matching idItemEdit", () => {
      const items: Item[] = [
        { id: "1", text: "Buy milk" },
        { id: "2", text: "Buy bread" },
      ];
      itemStore.setState({ items, idItemEdit: "1" });
      itemStore.setEditItem("Buy oat milk");
      expect(itemStore.get("items")).toEqual([
        { id: "1", text: "Buy oat milk" },
        { id: "2", text: "Buy bread" },
      ]);
    });
  });
});
